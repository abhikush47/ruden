"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiMessageSquare,
  FiLogOut,
  FiTrendingUp,
  FiCalendar,
  FiTarget,
  FiSend,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import GlassCard from "@/components/ui/GlassCard";
import {
  subscribeToClientData,
  subscribeToWorkoutPlan,
  subscribeToMessages,
  sendMessage,
  ClientData,
  WorkoutDay,
  Message,
} from "@/lib/firestore";

type TabId = "workout" | "progress" | "messages";

const ADMIN_EMAIL = "abhi.kush047@gmail.com";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("workout");

  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push("/");
  }, [signOut, router]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/dashboard/login");
      return;
    }
    if (user.email === ADMIN_EMAIL) {
      router.push("/admin");
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    if (user.email === ADMIN_EMAIL) return;

    const unsubClient = subscribeToClientData(user.uid, (data) => {
      setClientData(data);
      setDataLoading(false);
    });

    const unsubWorkouts = subscribeToWorkoutPlan(user.uid, (workouts) => {
      setWorkoutPlan(workouts);
    });

    const unsubMessages = subscribeToMessages(user.uid, (msgs) => {
      setMessages(msgs);
    });

    return () => {
      unsubClient();
      unsubWorkouts();
      unsubMessages();
    };
  }, [user]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    const senderName =
      clientData?.name || user.email?.split("@")[0] || "Client";
    await sendMessage(user.uid, newMessage.trim(), "client", senderName);
    setNewMessage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.email === ADMIN_EMAIL) return null;

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted font-body text-sm">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const clientName =
    clientData?.name || user.email?.split("@")[0] || "Client";

  const stats = [
    {
      icon: FiCalendar,
      label: "Week",
      value:
        clientData && clientData.currentWeek > 0
          ? `${clientData.currentWeek} of ${clientData.totalWeeks}`
          : "—",
    },
    {
      icon: FiTarget,
      label: "Goal",
      value: clientData?.goal || "Not set",
    },
    {
      icon: FiTrendingUp,
      label: "Progress",
      value: clientData?.progress || "—",
    },
    {
      icon: FiActivity,
      label: "Workouts",
      value:
        clientData && clientData.workoutsCompleted > 0
          ? `${clientData.workoutsCompleted} Done`
          : "—",
    },
  ];

  const tabs = [
    { id: "workout" as TabId, label: "Workout Plan", icon: FiActivity },
    { id: "progress" as TabId, label: "Progress", icon: FiTrendingUp },
    { id: "messages" as TabId, label: "Messages", icon: FiMessageSquare },
  ];

  return (
    <div className="min-h-screen bg-primary pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl tracking-wider">
              Welcome,{" "}
              <span className="text-gradient">{clientName}</span>
            </h1>
            <p className="text-muted font-body text-sm mt-1">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 text-muted hover:text-red-400 transition-colors font-body text-sm"
          >
            <FiLogOut size={16} />
            Sign Out
          </button>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="text-center !p-5">
                  <IconComponent
                    className="text-accent mx-auto mb-2"
                    size={24}
                  />
                  <p className="text-xs text-muted uppercase tracking-wider font-body">
                    {stat.label}
                  </p>
                  <p className="font-heading text-xl tracking-wider text-white mt-1">
                    {stat.value}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-accent text-primary"
                    : "glass text-muted hover:text-white"
                }`}
              >
                <TabIcon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ===== WORKOUT TAB ===== */}
          {activeTab === "workout" && (
            <div className="space-y-4">
              {workoutPlan.length > 0 ? (
                workoutPlan.map((day) => (
                  <GlassCard key={day.day} hover={false}>
                    <div className="flex items-start gap-4">
                      <div className="w-16 text-center flex-shrink-0">
                        <p className="font-heading text-lg text-accent tracking-wider">
                          {day.day.slice(0, 3).toUpperCase()}
                        </p>
                      </div>
                      <div className="flex-1 border-l border-accent/20 pl-4">
                        <h3 className="font-heading text-xl tracking-wider text-white">
                          {day.focus}
                        </h3>
                        <ul className="mt-2 space-y-1">
                          {day.exercises.map((ex) => (
                            <li
                              key={ex}
                              className="text-muted font-body text-sm"
                            >
                              • {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <GlassCard hover={false}>
                  <div className="text-center py-12">
                    <FiActivity
                      className="text-accent mx-auto mb-4"
                      size={48}
                    />
                    <h3 className="font-heading text-2xl tracking-wider text-white">
                      No Workout Plan Yet
                    </h3>
                    <p className="text-muted font-body text-sm mt-2">
                      Your coach will assign your workout plan soon.
                    </p>
                  </div>
                </GlassCard>
              )}
            </div>
          )}

          {/* ===== PROGRESS TAB ===== */}
          {activeTab === "progress" && (
            <GlassCard hover={false}>
              <h3 className="font-heading text-2xl tracking-wider text-white mb-6">
                Progress Tracking
              </h3>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    label: "Starting Weight",
                    value: clientData?.startingWeight
                      ? `${clientData.startingWeight} kg`
                      : "—",
                  },
                  {
                    label: "Current Weight",
                    value: clientData?.currentWeight
                      ? `${clientData.currentWeight} kg`
                      : "—",
                  },
                  {
                    label: "Goal Weight",
                    value: clientData?.goalWeight
                      ? `${clientData.goalWeight} kg`
                      : "—",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="text-center p-4 rounded-lg bg-accent/5"
                  >
                    <p className="font-heading text-2xl text-accent">
                      {item.value}
                    </p>
                    <p className="text-muted text-xs uppercase tracking-wider font-body mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              {clientData?.currentWeight && clientData?.startingWeight ? (
                <div className="p-6 rounded-lg bg-accent/5">
                  <p className="text-accent font-heading text-lg text-center">
                    Total Change:{" "}
                    {(
                      clientData.currentWeight - clientData.startingWeight
                    ).toFixed(1)}{" "}
                    kg
                  </p>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center border border-white/5 rounded-lg">
                  <p className="text-muted font-body text-sm">
                    Your coach will update your progress data.
                  </p>
                </div>
              )}
            </GlassCard>
          )}

          {/* ===== MESSAGES TAB ===== */}
          {activeTab === "messages" && (
            <GlassCard hover={false}>
              <h3 className="font-heading text-2xl tracking-wider text-white mb-6">
                Messages with Coach
              </h3>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${
                        msg.sender === "client" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-heading text-sm ${
                          msg.sender === "coach"
                            ? "bg-accent/20 text-accent"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {msg.sender === "coach"
                          ? "R"
                          : clientName.charAt(0).toUpperCase()}
                      </div>
                      <div
                        className={`rounded-lg p-3 max-w-md ${
                          msg.sender === "coach" ? "glass" : "bg-accent/10"
                        }`}
                      >
                        <p className="text-sm font-body text-gray-300">
                          {msg.text}
                        </p>
                        <p className="text-xs text-muted mt-1 font-body">
                          {msg.senderName} •{" "}
                          {msg.timestamp?.toDate
                            ? msg.timestamp.toDate().toLocaleDateString()
                            : "Just now"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FiMessageSquare
                      className="text-accent mx-auto mb-3"
                      size={32}
                    />
                    <p className="text-muted font-body text-sm">
                      No messages yet. Say hi to your coach!
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted/50"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-accent text-primary rounded-sm font-body text-sm font-semibold uppercase tracking-wider hover:bg-accent-light transition-colors flex items-center gap-2"
                >
                  <FiSend size={14} />
                  Send
                </button>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  );
}