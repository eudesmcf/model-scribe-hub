
import Layout from "@/components/layout/Layout";
import StatusCard from "@/components/dashboard/StatusCard";
import SessionStatusChart from "@/components/dashboard/SessionStatusChart";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import RecentSessionsTable from "@/components/dashboard/RecentSessionsTable";
import ModelCard from "@/components/dashboard/ModelCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Database, Server, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subDays, subHours, subMinutes } from "date-fns";

// Mock data
const activityEvents = [
  {
    id: "1",
    title: "Model 'Sales Analysis' updated",
    description: "Added 3 new measures to the Sales Analysis model",
    timestamp: subMinutes(new Date(), 30),
    type: "updated" as const,
    user: "John Doe",
  },
  {
    id: "2",
    title: "Session ended",
    description: "Session for Financial Reports completed successfully",
    timestamp: subHours(new Date(), 2),
    type: "created" as const,
    user: "Jane Smith",
  },
  {
    id: "3",
    title: "Model documentation generated",
    description: "Documentation for Customer Analytics model generated",
    timestamp: subHours(new Date(), 5),
    type: "created" as const,
    user: "Robert Johnson",
  },
  {
    id: "4",
    title: "Error in session",
    description: "Failed to process measures in HR Dashboard",
    timestamp: subDays(new Date(), 1),
    type: "error" as const,
    user: "Emily Davis",
  },
];

const recentSessions = [
  {
    id: "1",
    name: "Sales Analysis Session",
    model: "Sales Analytics",
    startedAt: subHours(new Date(), 1),
    status: "active" as const,
    user: "John Doe",
  },
  {
    id: "2",
    name: "Financial Reports Generation",
    model: "Financial Dashboard",
    startedAt: subHours(new Date(), 5),
    status: "completed" as const,
    user: "Jane Smith",
  },
  {
    id: "3",
    name: "Customer Segmentation Analysis",
    model: "Customer Analytics",
    startedAt: subDays(new Date(), 1),
    status: "completed" as const,
    user: "Robert Johnson",
  },
  {
    id: "4",
    name: "HR Dashboard Update",
    model: "HR Analytics",
    startedAt: subDays(new Date(), 2),
    status: "failed" as const,
    user: "Emily Davis",
  },
  {
    id: "5",
    name: "Marketing Campaign Metrics",
    model: "Marketing Analytics",
    startedAt: subMinutes(new Date(), 45),
    status: "pending" as const,
    user: "Michael Wilson",
  },
];

const models = [
  {
    id: "1",
    name: "Sales Analytics",
    description: "Comprehensive sales analysis model with regional breakdowns",
    status: "active" as const,
    tablesCount: 12,
    measuresCount: 34,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Financial Dashboard",
    description: "Financial reporting and analysis model",
    status: "active" as const,
    tablesCount: 8,
    measuresCount: 26,
    lastUpdated: "3 days ago",
  },
  {
    id: "3",
    name: "Customer Analytics",
    description: "Customer behavior and segmentation analysis",
    status: "warning" as const,
    tablesCount: 7,
    measuresCount: 18,
    lastUpdated: "5 days ago",
  },
  {
    id: "4",
    name: "HR Dashboard",
    description: "Human resources metrics and analytics",
    status: "inactive" as const,
    tablesCount: 5,
    measuresCount: 15,
    lastUpdated: "2 weeks ago",
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export Reports
            </Button>
            <Button size="sm">
              New Session
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatusCard
            title="Total Models"
            value="24"
            icon={Database}
            description="4 models added this month"
          />
          <StatusCard
            title="Active Sessions"
            value="12"
            icon={Activity}
            trend={{ value: 16, isPositive: true }}
          />
          <StatusCard
            title="Total Users"
            value="156"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatusCard
            title="Avg. Session Duration"
            value="1h 24m"
            icon={Clock}
            description="Last 30 days"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-6">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSessionsTable sessions={recentSessions} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-medium">Session Status</CardTitle>
            </CardHeader>
            <CardContent>
              <SessionStatusChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-6">
          <div className="xl:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Models</h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {models.map((model) => (
                <ModelCard key={model.id} {...model} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ActivityTimeline events={activityEvents} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
