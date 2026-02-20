"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { startOfMonth, endOfMonth, subMonths, format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

export async function getAnalytics() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  // Get total events
  const totalEvents = await db.event.count({
    where: { userId: user.id },
  });

  // Get total bookings
  const totalBookings = await db.booking.count({
    where: { userId: user.id },
  });

  // Get upcoming meetings count
  const upcomingMeetings = await db.booking.count({
    where: {
      userId: user.id,
      startTime: { gte: now },
    },
  });

  // Get this month's bookings
  const thisMonthBookings = await db.booking.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: thisMonthStart,
        lte: thisMonthEnd,
      },
    },
  });

  // Get last month's bookings
  const lastMonthBookings = await db.booking.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  // Calculate percentage change
  const bookingGrowth = lastMonthBookings === 0 
    ? thisMonthBookings > 0 ? 100 : 0
    : Math.round(((thisMonthBookings - lastMonthBookings) / lastMonthBookings) * 100);

  // Get bookings per event (top 5 events)
  const eventsWithBookings = await db.event.findMany({
    where: { userId: user.id },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
    orderBy: {
      bookings: {
        _count: "desc",
      },
    },
    take: 5,
  });

  // Get weekly booking data for chart
  const last7Months = Array.from({ length: 7 }, (_, i) => {
    const date = subMonths(now, 6 - i);
    return {
      month: format(date, "MMM"),
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  });

  const monthlyBookings = await Promise.all(
    last7Months.map(async ({ month, start, end }) => {
      const count = await db.booking.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });
      return { month, bookings: count };
    })
  );

  // Get bookings by day of week
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  
  const thisWeekBookings = await db.booking.findMany({
    where: {
      userId: user.id,
      startTime: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
    select: {
      startTime: true,
    },
  });

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const bookingsByDay = dayNames.map((day, index) => {
    const dayBookings = thisWeekBookings.filter((b) => {
      const bookingDay = new Date(b.startTime).getDay();
      // Convert Sunday=0 to index 6, Monday=1 to index 0, etc.
      const adjustedIndex = bookingDay === 0 ? 6 : bookingDay - 1;
      return adjustedIndex === index;
    });
    return { day, count: dayBookings.length };
  });

  // Calculate average meeting duration
  const eventsForDuration = await db.event.findMany({
    where: { userId: user.id },
    select: { duration: true },
  });
  
  const avgDuration = eventsForDuration.length > 0
    ? Math.round(eventsForDuration.reduce((acc, e) => acc + e.duration, 0) / eventsForDuration.length)
    : 0;

  return {
    totalEvents,
    totalBookings,
    upcomingMeetings,
    thisMonthBookings,
    lastMonthBookings,
    bookingGrowth,
    eventsWithBookings: eventsWithBookings.map((e) => ({
      title: e.title,
      bookings: e._count.bookings,
    })),
    monthlyBookings,
    bookingsByDay,
    avgDuration,
  };
}
