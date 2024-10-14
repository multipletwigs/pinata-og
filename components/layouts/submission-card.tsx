import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PinataHackathonSubmissionCard = () => {
  return (
    <Card className="p-2">
      <CardHeader className="p-2 md:p-4">
        <CardTitle>Pinata Dev Hackathon Submission</CardTitle>
        <CardDescription>
          Simplifying the creation and sharing of Open Graph images using
          Pinata's File API technology.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button asChild size="sm" className="w-full">
          <Link href="/og-image-creator">Read More Here!</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PinataHackathonSubmissionCard;
