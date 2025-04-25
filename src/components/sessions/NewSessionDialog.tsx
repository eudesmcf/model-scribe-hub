
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function NewSessionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Session</DialogTitle>
          <DialogDescription>
            Start a new model analysis session.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Add form fields here when needed */}
          <p className="text-muted-foreground">Session configuration options will be added here.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
