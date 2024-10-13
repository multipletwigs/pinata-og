import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface AuthState {
  user: User | null;
  loading: boolean;
  authLoading: boolean;
  authError: string;
  isLoginModalOpen: boolean;
  isSignUp: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setAuthLoading: (authLoading: boolean) => void;
  setAuthError: (error: string) => void;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  setIsSignUp: (isSignUp: boolean) => void;
  checkUser: () => Promise<void>;
  handleAuth: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  authLoading: false,
  authError: "",
  isLoginModalOpen: false,
  isSignUp: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  setAuthError: (authError) => set({ authError }),
  setIsLoginModalOpen: (isLoginModalOpen) => set({ isLoginModalOpen }),
  setIsSignUp: (isSignUp) => set({ isSignUp }),
  checkUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ user, loading: false });
  },
  handleAuth: async (email, password) => {
    set({ authLoading: true, authError: "" });
    try {
      let result;
      if (get().isSignUp) {
        result = await supabase.auth.signUp({ email, password });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) {
        throw result.error;
      }

      set({ user: result.data.user, isLoginModalOpen: false });
    } catch (error) {
      console.error(error);
      set({
        authError: error.message || "An error occurred during authentication",
      });
    } finally {
      set({ authLoading: false });
    }
  },
  handleLogout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
