"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { updateClientStats, subscribeToClientData } from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Button from "@/components/ui/Button";

const ADMIN_EMAIL = "abhi.kush047@gmail.com";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, signUp, loading } = useAuth();
  const router = useRouter();

  // Create Firestore profile if it doesn't exist
  const ensureClientProfile = async (uid: string, userEmail: string) => {
    try {
      const docRef = doc(db, "clients", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log("📝 Creating Firestore profile for:", userEmail);
        await updateClientStats(uid, {
          email: userEmail,
          name: "",
          goal: "",
          currentWeek: 0,
          totalWeeks: 12,
          progress: "New Client",
          workoutsCompleted: 0,
          startingWeight: 0,
          currentWeight: 0,
          goalWeight: 0,
        });
        console.log("✅ Profile created!");
      } else {
        console.log("✅ Profile already exists");
      }
    } catch (err) {
      console.error("❌ Failed to create profile:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      let user;

      if (isLogin) {
        user = await signIn(email, password);
      } else {
        user = await signUp(email, password);
      }

      // Always ensure Firestore profile exists (both login & signup)
      if (user.email !== ADMIN_EMAIL) {
        await ensureClientProfile(user.uid, user.email || email);
      }

      // Redirect
      if (user.email === ADMIN_EMAIL) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4 pt-24">
      <motion.div
        className="glass rounded-lg p-8 sm:p-10 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl tracking-wider">
            <span className="text-gradient">Client</span> Portal
          </h1>
          <p className="text-muted font-body text-sm mt-2">
            {isLogin ? "Sign in to access your dashboard" : "Create your account"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted/50"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted/50"
              placeholder="••••••••"
            />
          </div>
          <Button variant="primary" size="lg" type="submit" className="w-full justify-center">
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-accent text-sm font-body hover:text-accent-light transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}