"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/app/(og-playground)/store/auth-user"; // Update this path
import { Loader2, Lock, Mail, UserPlus, LogIn } from "lucide-react";

export default function ProjectSelect() {
  const {
    user,
    loading,
    authLoading,
    authError,
    isLoginModalOpen,
    isSignUp,
    handleAuth,
    setIsLoginModalOpen,
    setIsSignUp,
  } = useAuthStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    handleAuth(email, password);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>{isSignUp ? "Sign Up" : "Log In"} to create projects!</span>
            </DialogTitle>
            <DialogDescription>
              Enter your email and password to{" "}
              {isSignUp ? "create an account" : "log in"}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <Button type="submit" className="w-full" disabled={authLoading}>
              {authLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : isSignUp ? (
                <UserPlus className="w-4 h-4 mr-2" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              <span>
                {authLoading
                  ? "Processing..."
                  : isSignUp
                    ? "Sign Up"
                    : "Log In"}
              </span>
            </Button>
          </form>
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full mt-4"
          >
            {isSignUp
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}
