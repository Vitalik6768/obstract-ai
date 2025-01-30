import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { Button } from "~/components/ui/button";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      
      <Button>Click me</Button>
    </div>
  );
}
