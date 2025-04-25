
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  name: string;
  model: string;
  startedAt: Date;
  status: "active" | "completed" | "failed" | "pending";
  user: string;
}

interface RecentSessionsTableProps {
  sessions: Session[];
}

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

const RecentSessionsTable = ({ sessions }: RecentSessionsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session Name</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Started At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.name}</TableCell>
              <TableCell>{session.model}</TableCell>
              <TableCell>{format(session.startedAt, "MMM d, yyyy HH:mm")}</TableCell>
              <TableCell>{getStatusBadge(session.status)}</TableCell>
              <TableCell>{session.user}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  title="View Session Details"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentSessionsTable;
