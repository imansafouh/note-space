import { useRef } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signup } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";

interface CustomError {
  response?: {
    data?: {
      response?: {
        message?: string;
      };
    };
  };
}

export function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login: saveToken } = useAuth();

  const handleSignup = async () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const username = usernameRef.current?.value || "";
    try {
      const { token } = await signup(email, username, password);
      saveToken(token);
      toast.success(`Welcome, ${username}! Signup successful!`);
      setTimeout(() => navigate(-1), 1500);
    } catch (err: unknown) {
      console.log("Signup error:", err);
      const error = err as CustomError;
      const errorMessage =
        typeof error?.response?.data?.response?.message === "string"
          ? error.response.data.response.message
          : "Please try again.";

      toast.error(`Signup failed. ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.2rem)] flex items-center justify-center">
      <Card className="w-full max-w-md flex justify-center box">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>FIll in the form below to join us.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              ref={emailRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="JohnDoe"
              required
              ref={usernameRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required ref={passwordRef} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full hover:cursor-pointer"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
