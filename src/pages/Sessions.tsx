import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionsHeader } from "@/components/sessions/SessionsHeader";
import { SessionsToolbar } from "@/components/sessions/SessionsToolbar";
import { SessionsTable } from "@/components/sessions/SessionsTable";
import { subDays, subHours, subMinutes } from "date-fns";
import type { Session } from "@/components/sessions/types";

const sessions: Session[] = [
  {
    id: "1",
    name: "Sales Analysis Session",
    model: "Sales Analytics",
    startedAt: subHours(new Date(), 1),
    duration: "1h 23m",
    status: "active",
    user: "John Doe",
    changes: 16,
  },
  {
    id: "2",
    name: "Financial Reports Generation",
    model: "Financial Dashboard",
    startedAt: subHours(new Date(), 5),
    duration: "45m",
    status: "completed",
    user: "Jane Smith",
    changes: 24,
  },
  {
    id: "3",
    name: "Customer Segmentation Analysis",
    model: "Customer Analytics",
    startedAt: subDays(new Date(), 1),
    duration: "2h 15m",
    status: "completed",
    user: "Robert Johnson",
    changes: 32,
  },
  {
    id: "4",
    name: "HR Dashboard Update",
    model: "HR Analytics",
    startedAt: subDays(new Date(), 2),
    duration: "18m",
    status: "failed",
    user: "Emily Davis",
    changes: 5,
  },
  {
    id: "5",
    name: "Marketing Campaign Metrics",
    model: "Marketing Analytics",
    startedAt: subMinutes(new Date(), 45),
    duration: "45m",
    status: "pending",
    user: "Michael Wilson",
    changes: 0,
  },
  {
    id: "6",
    name: "Product Inventory Analysis",
    model: "Inventory Management",
    startedAt: subDays(new Date(), 3),
    duration: "1h 10m",
    status: "completed",
    user: "Sarah Johnson",
    changes: 19,
  },
  {
    id: "7",
    name: "Regional Sales Comparison",
    model: "Sales Analytics",
    startedAt: subDays(new Date(), 5),
    duration: "52m",
    status: "completed",
    user: "John Doe",
    changes: 11,
  },
  {
    id: "8",
    name: "Customer Retention Analysis",
    model: "Customer Analytics",
    startedAt: subHours(new Date(), 12),
    duration: "1h 35m",
    status: "completed",
    user: "Lisa Brown",
    changes: 27,
  },
];

const Sessions = () => {
  return (
    <Layout>
      <div className="container py-6">
        <SessionsHeader />
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-medium">Manage Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionsToolbar />
            <SessionsTable sessions={sessions} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Sessions;
