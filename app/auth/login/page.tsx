import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="p-6 border-2 rounded-md">
      <Calendar />
      <Button>Click me</Button>
    </div>
  );
}