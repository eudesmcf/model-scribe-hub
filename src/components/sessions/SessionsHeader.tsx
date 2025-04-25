
import { NewSessionDialog } from "./NewSessionDialog";

export function SessionsHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">Sessions</h1>
      <NewSessionDialog />
    </div>
  );
}
