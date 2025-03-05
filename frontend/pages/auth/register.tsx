import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifyPassword, setVerifyPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !verifyPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== verifyPassword) {
      setError("Password does not match");
      return;
    }

    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    await router.push("/");
  };

  // alert("test");

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Email</Label>
            <Input
              type="email"
              id="name"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Password</Label>
            <Input
              type="password"
              id="name"
              placeholder="***"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Password Verify</Label>
            <Input
              type="password"
              id="name"
              placeholder="***"
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <Link href={"/"}>
            <Button className="cursor-pointer">Back</Button>
          </Link>
          <Button type="submit" className="">
            Login
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Register;
