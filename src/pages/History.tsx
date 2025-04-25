
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, subDays, subHours, subMinutes } from "date-fns";
import { cn } from "@/lib/utils";

interface HistoryEvent {
  id: string;
  action: "create" | "update" | "delete";
  component: string;
  description: string;
  model: string;
  timestamp: Date;
  user: string;
}

// Mock data
const historyEvents: HistoryEvent[] = [
  {
    id: "1",
    action: "create",
    component: "Measure",
    description: "Created new measure 'Total Revenue YTD'",
    model: "Sales Analytics",
    timestamp: subMinutes(new Date(), 30),
    user: "John Doe",
  },
  {
    id: "2",
    action: "update",
    component: "Table",
    description: "Updated schema of 'DimCustomer' table, added 'CustomerLevel' column",
    model: "Sales Analytics",
    timestamp: subHours(new Date(), 2),
    user: "Jane Smith",
  },
  {
    id: "3",
    action: "delete",
    component: "Measure",
    description: "Deleted measure 'Obsolete Sales Metric'",
    model: "Financial Dashboard",
    timestamp: subHours(new Date(), 5),
    user: "Robert Johnson",
  },
  {
    id: "4",
    action: "update",
    component: "Relationship",
    description: "Modified relationship between 'DimProduct' and 'FactSales'",
    model: "Sales Analytics",
    timestamp: subHours(new Date(), 12),
    user: "John Doe",
  },
  {
    id: "5",
    action: "create",
    component: "Table",
    description: "Created new table 'DimPromotion'",
    model: "Marketing Analytics",
    timestamp: subDays(new Date(), 1),
    user: "Michael Wilson",
  },
  {
    id: "6",
    action: "update",
    component: "Measure",
    description: "Updated formula for measure 'Profit Margin'",
    model: "Financial Dashboard",
    timestamp: subDays(new Date(), 2),
    user: "Emily Davis",
  },
  {
    id: "7",
    action: "create",
    component: "Relationship",
    description: "Created relationship between 'DimPromotion' and 'FactSales'",
    model: "Marketing Analytics",
    timestamp: subDays(new Date(), 2),
    user: "Michael Wilson",
  },
  {
    id: "8",
    action: "delete",
    component: "Table",
    description: "Deleted table 'ObsoleteData'",
    model: "HR Analytics",
    timestamp: subDays(new Date(), 4),
    user: "Jane Smith",
  },
  {
    id: "9",
    action: "update",
    component: "Measure",
    description: "Refined calculation for 'Employee Turnover Rate'",
    model: "HR Analytics",
    timestamp: subDays(new Date(), 5),
    user: "Emily Davis",
  },
  {
    id: "10",
    action: "create",
    component: "Table",
    description: "Added new table 'DimRegion' with geographic data",
    model: "Sales Analytics",
    timestamp: subDays(new Date(), 7),
    user: "Robert Johnson",
  },
];

const getActionBadge = (action: HistoryEvent["action"]) => {
  switch (action) {
    case "create":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
          Create
        </Badge>
      );
    case "update":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
          Update
        </Badge>
      );
    case "delete":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
          Delete
        </Badge>
      );
  }
};

const getComponentIcon = (component: string) => {
  const baseClasses = "h-8 w-8 p-1.5 rounded-full";
  
  switch (component.toLowerCase()) {
    case "measure":
      return <div className={cn(baseClasses, "bg-purple-100 text-purple-600")}>M</div>;
    case "table":
      return <div className={cn(baseClasses, "bg-blue-100 text-blue-600")}>T</div>;
    case "relationship":
      return <div className={cn(baseClasses, "bg-amber-100 text-amber-600")}>R</div>;
    default:
      return <div className={cn(baseClasses, "bg-gray-100 text-gray-600")}>?</div>;
  }
};

const History = () => {
  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Change History</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Select Date Range
            </Button>
            <Button>
              Export History
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-medium">Change Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search"
                  placeholder="Search history..."
                  className="pl-8 w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {historyEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {getComponentIcon(event.component)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium">{event.component}</span>
                      {getActionBadge(event.action)}
                      <span className="text-muted-foreground">in</span>
                      <span className="font-medium">{event.model}</span>
                    </div>
                    <p className="text-sm mb-2">{event.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>By {event.user}</span>
                      <span>{format(event.timestamp, "MMMM d, yyyy 'at' h:mm a")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default History;
