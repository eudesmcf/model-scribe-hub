import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  ChevronDown, 
  Filter, 
  MoreVertical, 
  Plus, 
  Search, 
  Trash2, 
  View, 
  History as HistoryIcon,
  FileText 
} from "lucide-react";
import { format, subDays, subHours, subMinutes } from "date-fns";
import { NewSessionDialog } from "@/components/sessions/NewSessionDialog";
import { ExportReportsDialog } from "@/components/reports/ExportReportsDialog";

interface Session {
  id: string;
  name: string;
  model: string;
  startedAt: Date;
  duration: string;
  status: "active" | "completed" | "failed" | "pending";
  user: string;
  changes: number;
}

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

const getStatusBadge = (status: Session["status"]) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
          Active
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
          Completed
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
          Failed
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
          Pending
        </Badge>
      );
  }
};

const Sessions = () => {
  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Sessions</h1>
          <NewSessionDialog />
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-medium">Manage Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search"
                  placeholder="Search sessions..."
                  className="pl-8 w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <ExportReportsDialog />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Status
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Failed</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session Name</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Started At</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Changes</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.name}</TableCell>
                      <TableCell>{session.model}</TableCell>
                      <TableCell>{format(session.startedAt, "MMM d, yyyy HH:mm")}</TableCell>
                      <TableCell>{session.duration}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell>{session.user}</TableCell>
                      <TableCell>{session.changes}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <View className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" /> Generate Documentation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <HistoryIcon className="h-4 w-4 mr-2" /> View History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Sessions;
