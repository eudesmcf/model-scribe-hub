
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: "created" | "updated" | "deleted" | "error";
  user: string;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

const getEventColor = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "created":
      return "bg-green-500";
    case "updated":
      return "bg-blue-500";
    case "deleted":
      return "bg-red-500";
    case "error":
      return "bg-amber-500";
    default:
      return "bg-gray-500";
  }
};

const ActivityTimeline = ({ events }: ActivityTimelineProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "flex h-3 w-3 rounded-full mt-1",
                  getEventColor(event.type)
                )}/>
                {events.indexOf(event) < events.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-1" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <span className="text-xs text-gray-500">
                    {format(event.timestamp, "MMM d, h:mm a")}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{event.description}</p>
                <div className="flex items-center mt-1.5">
                  <span className="text-xs font-medium text-gray-500">
                    By {event.user}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
