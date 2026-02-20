import { Suspense } from "react";
import { getAnalytics } from "@/actions/analytics";
import AnalyticsDashboard from "./_components/analytics-dashboard";
import AnalyticsSkeleton from "./_components/analytics-skeleton";

export const metadata = {
  title: "Analytics | Schedulrr",
  description: "View your scheduling analytics and insights",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-title">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Track your scheduling performance and gain insights
        </p>
      </div>
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsContent />
      </Suspense>
    </div>
  );
}

async function AnalyticsContent() {
  const analytics = await getAnalytics();
  return <AnalyticsDashboard data={analytics} />;
}
