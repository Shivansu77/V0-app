import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Button className="">Click Me</Button>
      <a href="/users" className="text-blue-500 hover:underline">
        View users
      </a>
    </div>
  );
}
