import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p>This is a test</p>
      <div className="flex flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </div>
  );
}
