import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";
import React from "react";

function WelcomePage() {
  return (
    <div>
      <Button className="cursor:pointer">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  );
}

export default WelcomePage;
