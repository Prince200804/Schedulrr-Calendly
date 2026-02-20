"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

export default function ExportMeetings({ meetings }) {
  const [exporting, setExporting] = useState(false);

  const exportToCSV = () => {
    setExporting(true);
    
    try {
      // CSV headers
      const headers = [
        "Event Title",
        "Guest Name",
        "Guest Email",
        "Date",
        "Start Time",
        "End Time",
        "Meet Link",
        "Additional Info",
      ];

      // Convert meetings to CSV rows
      const rows = meetings.map((meeting) => [
        meeting.event.title,
        meeting.name,
        meeting.email,
        format(new Date(meeting.startTime), "yyyy-MM-dd"),
        format(new Date(meeting.startTime), "HH:mm"),
        format(new Date(meeting.endTime), "HH:mm"),
        meeting.meetLink || "",
        meeting.additionalInfo?.replace(/,/g, ";") || "",
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `meetings-${format(new Date(), "yyyy-MM-dd")}.csv`);
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  const exportToJSON = () => {
    setExporting(true);
    
    try {
      const exportData = meetings.map((meeting) => ({
        eventTitle: meeting.event.title,
        guestName: meeting.name,
        guestEmail: meeting.email,
        date: format(new Date(meeting.startTime), "yyyy-MM-dd"),
        startTime: format(new Date(meeting.startTime), "HH:mm"),
        endTime: format(new Date(meeting.endTime), "HH:mm"),
        meetLink: meeting.meetLink,
        additionalInfo: meeting.additionalInfo,
      }));

      const jsonContent = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `meetings-${format(new Date(), "yyyy-MM-dd")}.json`);
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  if (!meetings || meetings.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportToCSV}
        disabled={exporting}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToJSON}
        disabled={exporting}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export JSON
      </Button>
    </div>
  );
}
