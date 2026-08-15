import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  return (
    <div className="p-6 border-2 rounded-md flex justify-center items-center flex-col h-screen gap-6">
      <Calendar className="rounded-lg border"></Calendar>
      <Button variant={"outline"}>Save Date</Button>
      <h1 className="text-4xl font-bold italic">Hello Prodcution (Updated 🤨) (2nd time 😄 + login signup done)</h1>
    </div>
  );
}