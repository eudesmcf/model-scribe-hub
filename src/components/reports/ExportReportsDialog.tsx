
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { ExportReportsCheckbox } from "./ExportReportsCheckbox";

export function ExportReportsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Reports</DialogTitle>
          <DialogDescription>
            Select the reports you want to export.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ExportReportsCheckbox />
        </div>
      </DialogContent>
    </Dialog>
  );
}
