import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function CardWithForm() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Choose</CardTitle>
          <CardDescription>Choose option</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-evenly">
          <Link href="/auth/register">
            <Button>Register</Button>
          </Link>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-end"></CardFooter>
      </Card>
    </div>
  );
}

export default CardWithForm;
