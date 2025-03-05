import AuthLayout from "@/layouts/AuthLayout";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(""); // State for error message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (!res.ok) {
        setError("Invalid email or password");
      } else {
        setError("");
      }
    });
  };

  return (
    <AuthLayout title="Login">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
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

export default Login;
