import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EventCardSkeleton() {
  return (
    <Card className="flex flex-col justify-between animate-pulse">
      <CardHeader>
        <div className="h-7 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </CardContent>
      <div className="p-6 pt-0 flex gap-2">
        <div className="h-10 w-28 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-200 rounded" />
      </div>
    </Card>
  );
}

export function MeetingCardSkeleton() {
  return (
    <Card className="flex flex-col justify-between animate-pulse">
      <CardHeader>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-1" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <div className="h-4 w-4 bg-gray-200 rounded mr-2" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center mb-2">
          <div className="h-4 w-4 bg-gray-200 rounded mr-2" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-gray-200 rounded mr-2" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-gray-200 rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-36 bg-gray-200 rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-48 bg-gray-200 rounded" />
            <div className="h-10 w-40 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded" />
        </CardContent>
      </Card>
    </div>
  );
}

export function AvailabilitySkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-5 w-5 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-10 w-32 bg-gray-200 rounded" />
        </div>
      ))}
      <div className="flex items-center gap-4 pt-4">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-200 rounded" />
      </div>
      <div className="h-10 w-40 bg-gray-200 rounded" />
    </div>
  );
}
