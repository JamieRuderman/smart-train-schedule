import { Card, CardContent } from "@/components/ui/card";
import { TrainFront } from "lucide-react";

export function EmptyState() {
  return (
    <Card
      className="flex flex-col justify-center container mx-auto flex-grow text-center max-w-4xl border-0 shadow-none"
      role="status"
      aria-live="polite"
    >
      <CardContent className="flex flex-col items-center gap-4 pb-0 pt-4">
        <TrainFront
          className="h-8 w-8 text-primary"
          aria-hidden="true"
          style={{ strokeWidth: 1.5 }}
        />
        <h2 className="text-xl font-semibold">Select Your Route</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Choose your departure and destination stations above to see available
          train schedules.
        </p>
      </CardContent>
    </Card>
  );
}
