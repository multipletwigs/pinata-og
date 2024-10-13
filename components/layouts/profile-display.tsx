"use client";
import React, { useMemo } from "react";
import { useAuthStore } from "@/app/(og-playground)/store/auth-user"; // Update this path
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Mail } from "lucide-react";

const UserAvatar = ({ isLoggedIn }) => {
  const [gradientId, startColor, endColor] = useMemo(() => {
    const id = `gradient-${Math.random().toString(36).substr(2, 9)}`;
    const start = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const end = `hsl(${Math.random() * 360}, 100%, 50%)`;
    return [id, start, end];
  }, []);

  if (isLoggedIn) {
    return <div className="h-6 w-6"></div>;
  }

  return <LogIn className="h-5 w-5" />;
};

export default function ProfileDisplay() {
  const { user, handleLogout, setIsLoginModalOpen } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <UserAvatar isLoggedIn={!!user} />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {user ? (
          <>
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuItem className="flex flex-col items-start">
              <div className="flex items-center w-full">
                <Mail className="mr-2 h-4 w-4" />
                <span className="font-medium">Email</span>
              </div>
              <span className="text-sm text-muted-foreground truncate w-full">
                {user.email}
              </span>
            </DropdownMenuItem>
            {user.user_metadata?.full_name && (
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="font-medium">Full Name</span>
                <span className="text-sm text-muted-foreground">
                  {user.user_metadata.full_name}
                </span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => setIsLoginModalOpen(true)}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Login</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
