
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, AlertCircle } from "lucide-react";

interface ModelCardProps {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "warning";
  tablesCount: number;
  measuresCount: number;
  lastUpdated: string;
}

const ModelCard = ({
  id,
  name,
  description,
  status,
  tablesCount,
  measuresCount,
  lastUpdated,
}: ModelCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          {status === "warning" && (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
        </div>
        <Badge 
          variant="outline" 
          className={`mt-1.5 ${
            status === "active" 
              ? "status-active" 
              : status === "warning" 
              ? "status-warning" 
              : "status-inactive"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Tables</span>
            <span className="text-xl font-semibold">{tablesCount}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Measures</span>
            <span className="text-xl font-semibold">{measuresCount}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t px-6 py-4 bg-muted/30 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Updated {lastUpdated}</span>
        <Button size="sm" variant="outline" className="h-8">
          <Layers className="h-4 w-4 mr-1" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelCard;
