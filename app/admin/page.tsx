"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiEdit,
  FiSend,
  FiPlus,
  FiTrash2,
  FiSave,
  FiLogOut,
  FiInbox,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import GlassCard from "@/components/ui/GlassCard";
import {
  subscribeToAllClients,
  updateClientStats,
  sendMessage,
  subscribeToWorkoutPlan,
  subscribeToMessages,
  subscribeToApplications,
  updateApplicationStatus,
  ClientData,
  WorkoutDay,
  Message,
  Application,
} from "@/lib/firestore";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const ADMIN_EMAIL = "abhi.kush047@gmail.com";

type Section = "stats" | "workout" | "messages" | "applications";

interface ClientWithUid extends ClientData {
  uid: string;
}

export default function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const [clients, setClients] = useState<ClientWithUid[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientWithUid | null>(
    null
  );
  const [activeSection, setActiveSection] = useState<Section>("applications");
  const [applications, setApplications] = useState<Application[]>([]);

  // Editable fields
  const [editStats, setEditStats] = useState({
    name: "",
    goal: "",
    currentWeek: 0,
    totalWeeks: 12,
    progress: "",
    workoutsCompleted: 0,
    startingWeight: 0,
    currentWeight: 0,
    goalWeight: 0,
  });

  const [workouts, setWorkouts] = useState<Omit<WorkoutDay, "id">[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push("/");
  }, [signOut, router]);

  // Auth guard
  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Load all clients + applications
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;

    const unsubClients = subscribeToAllClients((clientList) => {
      setClients(clientList);
    });

    const unsubApps = subscribeToApplications((apps) => {
      setApplications(apps);
    });

    return () => {
      unsubClients();
      unsubApps();
    };
  }, [user]);

  // When a client is selected, load their data
  useEffect(() => {
    if (!selectedClient) return;

    setEditStats({
      name: selectedClient.name || "",
      goal: selectedClient.goal || "",
      currentWeek: selectedClient.currentWeek || 0,
      totalWeeks: selectedClient.totalWeeks || 12,
      progress: selectedClient.progress || "",
      workoutsCompleted: selectedClient.workoutsCompleted || 0,
      startingWeight: selectedClient.startingWeight || 0,
      currentWeight: selectedClient.currentWeight || 0,
      goalWeight: selectedClient.goalWeight || 0,
    });

    const unsubWorkouts = subscribeToWorkoutPlan(selectedClient.uid, (w) => {
      setWorkouts(
        w.map(({ day, focus, exercises, order }) => ({
          day,
          focus,
          exercises,
          order,
        }))
      );
    });

    const unsubMessages = subscribeToMessages(selectedClient.uid, (msgs) => {
      setMessages(msgs);
    });

    return () => {
      unsubWorkouts();
      unsubMessages();
    };
  }, [selectedClient]);

  // Save client stats
  const handleSaveStats = async () => {
    if (!selectedClient) return;
    setSaving(true);
    await updateClientStats(selectedClient.uid, editStats);
    setSaving(false);
    alert("✅ Stats updated! Client will see changes instantly.");
  };

  // Save workout plan
  const handleSaveWorkouts = async () => {
    if (!selectedClient) return;
    setSaving(true);

    const workoutsRef = collection(
      db,
      "clients",
      selectedClient.uid,
      "workouts"
    );
    const snapshot = await getDocs(workoutsRef);
    for (const docSnap of snapshot.docs) {
      await deleteDoc(docSnap.ref);
    }

    for (const workout of workouts) {
      await setDoc(
        doc(collection(db, "clients", selectedClient.uid, "workouts")),
        workout
      );
    }

    setSaving(false);
    alert("✅ Workout plan updated! Client will see changes instantly.");
  };

  // Send message as coach
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedClient) return;
    await sendMessage(
      selectedClient.uid,
      newMessage.trim(),
      "coach",
      "Rudrendra"
    );
    setNewMessage("");
  };

  // Workout helpers
  const addWorkoutDay = () => {
    setWorkouts([
      ...workouts,
      {
        day: "New Day",
        focus: "Focus Area",
        exercises: ["Exercise — 3×10"],
        order: workouts.length,
      },
    ]);
  };

  const removeWorkoutDay = (index: number) => {
    setWorkouts(workouts.filter((_, i) => i !== index));
  };

  const updateWorkoutDay = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const updated = [...workouts];
    updated[index] = { ...updated[index], [field]: value };
    setWorkouts(updated);
  };

  // Count new applications
  const newAppsCount = applications.filter((a) => a.status === "new").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) return null;

  // Section tabs configuration
  const sectionTabs: {
    id: Section;
    label: string;
    icon: typeof FiEdit;
    badge?: number;
    alwaysShow: boolean;
  }[] = [
    {
      id: "applications",
      label: "Applications",
      icon: FiInbox,
      badge: newAppsCount,
      alwaysShow: true,
    },
    { id: "stats", label: "Edit Stats", icon: FiEdit, alwaysShow: false },
    { id: "workout", label: "Workout Plan", icon: FiPlus, alwaysShow: false },
    { id: "messages", label: "Messages", icon: FiSend, alwaysShow: false },
  ];

  return (
    <div className="min-h-screen bg-primary pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl tracking-wider">
              <span className="text-gradient">Admin</span> Panel
            </h1>
            <p className="text-muted font-body text-sm mt-1">
              Manage clients & applications in real-time
            </p>
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

        <div className="grid lg:grid-cols-4 gap-6">
          {/* ===== SIDEBAR — Client List ===== */}
          <div className="lg:col-span-1">
            <GlassCard hover={false}>
              <h3 className="font-heading text-lg tracking-wider text-white mb-4 flex items-center gap-2">
                <FiUsers className="text-accent" size={18} />
                Clients ({clients.length})
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <button
                      key={client.uid}
                      type="button"
                      onClick={() => {
                        setSelectedClient(client);
                        setActiveSection("stats");
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        selectedClient?.uid === client.uid
                          ? "bg-accent/20 border border-accent/50"
                          : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <p className="text-white font-body text-sm font-semibold">
                        {client.name || "Unnamed"}
                      </p>
                      <p className="text-muted font-body text-xs">
                        {client.email}
                      </p>
                    </button>
                  ))
                ) : (
                  <p className="text-muted font-body text-xs text-center py-4">
                    No clients yet. They appear when they sign up.
                  </p>
                )}
              </div>
            </GlassCard>
          </div>

          {/* ===== MAIN CONTENT ===== */}
          <div className="lg:col-span-3">
            {/* Section Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {sectionTabs
                .filter(
                  (tab) => tab.alwaysShow || selectedClient
                )
                .map((section) => {
                  const SectionIcon = section.icon;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-300 relative ${
                        activeSection === section.id
                          ? "bg-accent text-primary"
                          : "glass text-muted hover:text-white"
                      }`}
                    >
                      <SectionIcon size={16} />
                      {section.label}
                      {section.badge && section.badge > 0 && (
                        <span className="ml-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
                          {section.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>

            {/* ===== APPLICATIONS TAB ===== */}
            {activeSection === "applications" && (
              <GlassCard hover={false}>
                <h3 className="font-heading text-xl tracking-wider text-white mb-6 flex items-center gap-3">
                  <FiInbox className="text-accent" size={22} />
                  Applications ({applications.length})
                  {newAppsCount > 0 && (
                    <span className="text-xs font-body bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full">
                      {newAppsCount} new
                    </span>
                  )}
                </h3>
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className={`p-5 rounded-lg bg-surface border transition-all ${
                          app.status === "new"
                            ? "border-yellow-500/30"
                            : "border-white/5"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                          <div>
                            <h4 className="text-white font-body text-sm font-semibold">
                              {app.name}
                            </h4>
                            <p className="text-muted font-body text-xs">
                              {app.email}
                              {app.phone && ` • ${app.phone}`}
                            </p>
                          </div>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              updateApplicationStatus(
                                app.id!,
                                e.target.value as Application["status"]
                              )
                            }
                            className={`text-xs font-body font-semibold px-3 py-1.5 rounded-sm border bg-primary cursor-pointer focus:outline-none ${
                              app.status === "new"
                                ? "border-yellow-500/50 text-yellow-400"
                                : app.status === "contacted"
                                ? "border-blue-500/50 text-blue-400"
                                : app.status === "enrolled"
                                ? "border-green-500/50 text-green-400"
                                : "border-red-500/50 text-red-400"
                            }`}
                          >
                            <option value="new">🟡 New</option>
                            <option value="contacted">🔵 Contacted</option>
                            <option value="enrolled">🟢 Enrolled</option>
                            <option value="rejected">🔴 Rejected</option>
                          </select>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-2 text-xs font-body">
                          <p className="text-muted">
                            <span className="text-white font-semibold">
                              Program:
                            </span>{" "}
                            {app.program || "Not specified"}
                          </p>
                          <p className="text-muted">
                            <span className="text-white font-semibold">
                              Submitted:
                            </span>{" "}
                            {app.submittedAt?.toDate
                              ? app.submittedAt.toDate().toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : "Just now"}
                          </p>
                        </div>

                        {app.goals && (
                          <p className="text-muted font-body text-xs mt-2">
                            <span className="text-white font-semibold">
                              Goals:
                            </span>{" "}
                            {app.goals}
                          </p>
                        )}

                        {app.message && (
                          <p className="text-muted font-body text-xs mt-1">
                            <span className="text-white font-semibold">
                              Message:
                            </span>{" "}
                            {app.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <FiInbox className="text-accent mx-auto mb-4" size={48} />
                    <h3 className="font-heading text-2xl tracking-wider text-white">
                      No Applications Yet
                    </h3>
                    <p className="text-muted font-body text-sm mt-2">
                      Applications from the contact form will appear here.
                    </p>
                  </div>
                )}
              </GlassCard>
            )}

            {/* ===== EDIT STATS TAB ===== */}
            {activeSection === "stats" && selectedClient && (
              <GlassCard hover={false}>
                <h3 className="font-heading text-xl tracking-wider text-white mb-6">
                  Edit Client: {selectedClient.email}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Client Name", key: "name", type: "text" },
                    { label: "Goal", key: "goal", type: "text" },
                    {
                      label: "Current Week",
                      key: "currentWeek",
                      type: "number",
                    },
                    {
                      label: "Total Weeks",
                      key: "totalWeeks",
                      type: "number",
                    },
                    {
                      label: "Progress Status",
                      key: "progress",
                      type: "text",
                    },
                    {
                      label: "Workouts Completed",
                      key: "workoutsCompleted",
                      type: "number",
                    },
                    {
                      label: "Starting Weight (kg)",
                      key: "startingWeight",
                      type: "number",
                    },
                    {
                      label: "Current Weight (kg)",
                      key: "currentWeight",
                      type: "number",
                    },
                    {
                      label: "Goal Weight (kg)",
                      key: "goalWeight",
                      type: "number",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={
                          editStats[field.key as keyof typeof editStats]
                        }
                        onChange={(e) =>
                          setEditStats((prev) => ({
                            ...prev,
                            [field.key]:
                              field.type === "number"
                                ? Number(e.target.value)
                                : e.target.value,
                          }))
                        }
                        className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleSaveStats}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-gold-gradient text-primary rounded-sm font-body text-sm font-semibold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(200,169,90,0.4)] transition-all disabled:opacity-50"
                  >
                    <FiSave size={16} />
                    {saving ? "Saving..." : "Save Stats (Updates Instantly)"}
                  </button>
                </div>
              </GlassCard>
            )}

            {/* ===== WORKOUT PLAN TAB ===== */}
            {activeSection === "workout" && selectedClient && (
              <GlassCard hover={false}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl tracking-wider text-white">
                    Workout Plan Editor
                  </h3>
                  <button
                    type="button"
                    onClick={addWorkoutDay}
                    className="flex items-center gap-2 px-4 py-2 border border-accent/50 text-accent rounded-sm font-body text-xs uppercase tracking-wider hover:bg-accent hover:text-primary transition-all"
                  >
                    <FiPlus size={14} />
                    Add Day
                  </button>
                </div>
                <div className="space-y-6">
                  {workouts.map((workout, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-surface border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-3 flex-1">
                          <input
                            type="text"
                            value={workout.day}
                            onChange={(e) =>
                              updateWorkoutDay(index, "day", e.target.value)
                            }
                            placeholder="Day (e.g., Monday)"
                            className="bg-primary border border-white/10 rounded-sm px-3 py-2 text-white font-body text-sm focus:border-accent focus:outline-none w-32"
                          />
                          <input
                            type="text"
                            value={workout.focus}
                            onChange={(e) =>
                              updateWorkoutDay(index, "focus", e.target.value)
                            }
                            placeholder="Focus (e.g., Chest & Triceps)"
                            className="bg-primary border border-white/10 rounded-sm px-3 py-2 text-white font-body text-sm focus:border-accent focus:outline-none flex-1"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWorkoutDay(index)}
                          className="ml-3 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      <label className="block text-xs text-muted uppercase tracking-wider font-body mb-1">
                        Exercises (one per line)
                      </label>
                      <textarea
                        value={workout.exercises.join("\n")}
                        onChange={(e) =>
                          updateWorkoutDay(
                            index,
                            "exercises",
                            e.target.value.split("\n")
                          )
                        }
                        rows={4}
                        placeholder={
                          "Bench Press — 4×8\nIncline DB Press — 3×10"
                        }
                        className="w-full bg-primary border border-white/10 rounded-sm px-3 py-2 text-white font-body text-sm focus:border-accent focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleSaveWorkouts}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-gold-gradient text-primary rounded-sm font-body text-sm font-semibold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(200,169,90,0.4)] transition-all disabled:opacity-50"
                  >
                    <FiSave size={16} />
                    {saving
                      ? "Saving..."
                      : "Save Workout Plan (Updates Instantly)"}
                  </button>
                </div>
              </GlassCard>
            )}

            {/* ===== MESSAGES TAB ===== */}
            {activeSection === "messages" && selectedClient && (
              <GlassCard hover={false}>
                <h3 className="font-heading text-xl tracking-wider text-white mb-6">
                  Chat with{" "}
                  {selectedClient.name || selectedClient.email}
                </h3>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {messages.length > 0 ? (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${
                          msg.sender === "coach" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-heading text-sm ${
                            msg.sender === "coach"
                              ? "bg-accent/20 text-accent"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          {msg.sender === "coach" ? "R" : "C"}
                        </div>
                        <div
                          className={`rounded-lg p-3 max-w-md ${
                            msg.sender === "coach"
                              ? "bg-accent/10"
                              : "glass"
                          }`}
                        >
                          <p className="text-sm font-body text-gray-300">
                            {msg.text}
                          </p>
                          <p className="text-xs text-muted mt-1 font-body">
                            {msg.senderName} •{" "}
                            {msg.timestamp?.toDate
                              ? msg.timestamp
                                  .toDate()
                                  .toLocaleDateString()
                              : "Just now"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted font-body text-sm text-center py-8">
                      No messages yet.
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    placeholder="Message as Coach..."
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

            {/* No client selected + not on applications */}
            {activeSection !== "applications" && !selectedClient && (
              <GlassCard hover={false}>
                <div className="text-center py-16">
                  <FiUsers className="text-accent mx-auto mb-4" size={48} />
                  <h3 className="font-heading text-2xl tracking-wider text-white">
                    Select a Client
                  </h3>
                  <p className="text-muted font-body text-sm mt-2">
                    Choose a client from the left to manage their data.
                  </p>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}