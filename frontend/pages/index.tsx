import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/router";

export function index() {
  const router = useRouter();
  const [user, setUser] = React.useState<{
    name: string;
    email: string;
  } | null>(null);
  useEffect(() => {
    const run = async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };
    run();
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      await router.push("/auth/login");
    } catch (e) {
      console.error(e);
    }
  };
  // console.log(user);
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
        {user ? (
          <Alert>
            <AlertTitle>
              Heads up! <b>{user.name}</b>
            </AlertTitle>
            <AlertDescription>{user.email}</AlertDescription>

            <div>
              <Button variant={"secondary"} onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </Alert>
        ) : (
          ""
        )}
      </Card>
    </div>
  );
}

export default index;
