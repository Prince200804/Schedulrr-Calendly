"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  CalendarCheck,
  BarChart3,
} from "lucide-react";

export default function AnalyticsDashboard({ data }) {
  const {
    totalEvents,
    totalBookings,
    upcomingMeetings,
    thisMonthBookings,
    bookingGrowth,
    eventsWithBookings,
    monthlyBookings,
    bookingsByDay,
    avgDuration,
  } = data;

  const maxMonthlyBookings = Math.max(...monthlyBookings.map((m) => m.bookings), 1);
  const maxDayBookings = Math.max(...bookingsByDay.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              Active event types
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              All-time bookings
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarCheck className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingMeetings}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled meetings
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            {bookingGrowth >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{thisMonthBookings}</div>
            <p className={`text-xs ${bookingGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {bookingGrowth >= 0 ? "+" : ""}{bookingGrowth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Monthly Bookings
            </CardTitle>
            <CardDescription>Booking trends over the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {monthlyBookings.map((month, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full flex flex-col items-center justify-end h-40">
                    <span className="text-xs font-medium mb-1">
                      {month.bookings}
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                      style={{
                        height: `${(month.bookings / maxMonthlyBookings) * 100}%`,
                        minHeight: month.bookings > 0 ? "8px" : "2px",
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{month.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bookings by Day */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              This Week
            </CardTitle>
            <CardDescription>Bookings by day of the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {bookingsByDay.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full flex flex-col items-center justify-end h-40">
                    <span className="text-xs font-medium mb-1">
                      {day.count}
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md transition-all duration-500 hover:from-purple-700 hover:to-purple-500"
                      style={{
                        height: `${(day.count / maxDayBookings) * 100}%`,
                        minHeight: day.count > 0 ? "8px" : "2px",
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Events */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Events</CardTitle>
            <CardDescription>Events with the most bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {eventsWithBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No events yet</p>
            ) : (
              <div className="space-y-4">
                {eventsWithBookings.map((event, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? "bg-yellow-500" :
                        index === 1 ? "bg-gray-400" :
                        index === 2 ? "bg-orange-600" :
                        "bg-blue-500"
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium truncate max-w-[180px]">
                        {event.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {event.bookings} bookings
                      </span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${(event.bookings / (eventsWithBookings[0]?.bookings || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Avg. Meeting Duration</p>
                  <p className="text-2xl font-bold">{avgDuration} min</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">
                    {totalEvents > 0 
                      ? Math.round((totalBookings / totalEvents) * 100) / 100
                      : 0}
                  </p>
                  <p className="text-xs text-gray-500">bookings per event</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold">
                    {totalBookings > 0
                      ? Math.round(((totalBookings - upcomingMeetings) / totalBookings) * 100)
                      : 0}%
                  </p>
                  <p className="text-xs text-gray-500">of meetings completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
