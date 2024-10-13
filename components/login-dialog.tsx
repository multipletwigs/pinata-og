"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/app/(og-playground)/store/auth-user";
import { Lock, Mail, User } from "lucide-react"; // Import icons

export const LoginDialog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    isLoginModalOpen,
    isSignUp,
    authLoading,
    authError,
    setIsLoginModalOpen,
    setIsSignUp,
    setAuthError,
    handleAuth,
  } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAuth(email, password);
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSignUp
              ? "Sign up to save and generate metadata"
              : "Login to access your account"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full"
                required
              />
            </div>
          </div>
          {authError && (
            <p className="text-red-500 text-sm text-center">{authError}</p>
          )}
          <Button type="submit" className="w-full" disabled={authLoading}>
            {authLoading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setAuthError("");
            }}
            className="text-sm"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
