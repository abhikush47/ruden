import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
  serverTimestamp,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ============ TYPES ============

export interface ClientData {
  email: string;
  name: string;
  goal: string;
  currentWeek: number;
  totalWeeks: number;
  progress: string;
  workoutsCompleted: number;
  startingWeight: number;
  currentWeight: number;
  goalWeight: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface WorkoutDay {
  id?: string;
  day: string;
  focus: string;
  exercises: string[];
  order: number;
}

export interface ProgressPhoto {
  id: string;
  url: string;
  date: string;
  note?: string;
}

export interface Message {
  id: string;
  sender: "coach" | "client";
  text: string;
  timestamp: Timestamp;
  senderName: string;
}

export interface Application {
  id?: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  goals: string;
  message: string;
  submittedAt?: Timestamp;
  status: "new" | "contacted" | "enrolled" | "rejected";
}

// ============ CLIENT FUNCTIONS ============

export async function getClientData(uid: string): Promise<ClientData | null> {
  const docRef = doc(db, "clients", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as ClientData) : null;
}

export async function setClientData(
  uid: string,
  data: Partial<ClientData>
): Promise<void> {
  const docRef = doc(db, "clients", uid);
  await setDoc(
    docRef,
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export function subscribeToClientData(
  uid: string,
  callback: (data: ClientData | null) => void
) {
  const docRef = doc(db, "clients", uid);
  return onSnapshot(docRef, (docSnap) => {
    callback(docSnap.exists() ? (docSnap.data() as ClientData) : null);
  });
}

export function subscribeToWorkoutPlan(
  uid: string,
  callback: (workouts: WorkoutDay[]) => void
) {
  const q = query(
    collection(db, "clients", uid, "workouts"),
    orderBy("order", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const workouts = snapshot.docs.map((d) => ({
      ...d.data(),
      id: d.id,
    })) as WorkoutDay[];
    callback(workouts);
  });
}

export function subscribeToMessages(
  uid: string,
  callback: (messages: Message[]) => void
) {
  const q = query(
    collection(db, "clients", uid, "messages"),
    orderBy("timestamp", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((d) => ({
      ...d.data(),
      id: d.id,
    })) as Message[];
    callback(messages);
  });
}

export async function sendMessage(
  uid: string,
  text: string,
  sender: "coach" | "client",
  senderName: string
): Promise<void> {
  await addDoc(collection(db, "clients", uid, "messages"), {
    text,
    sender,
    senderName,
    timestamp: serverTimestamp(),
  });
}

// ============ ADMIN FUNCTIONS ============

export async function updateClientStats(
  uid: string,
  stats: Partial<ClientData>
): Promise<void> {
  const docRef = doc(db, "clients", uid);
  await setDoc(
    docRef,
    { ...stats, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export function subscribeToAllClients(
  callback: (clients: (ClientData & { uid: string })[]) => void
) {
  const q = query(collection(db, "clients"));
  return onSnapshot(q, (snapshot) => {
    const clients = snapshot.docs.map((d) => ({
      ...d.data(),
      uid: d.id,
    })) as (ClientData & { uid: string })[];
    callback(clients);
  });
}

export async function saveWorkoutPlan(
  uid: string,
  workouts: Omit<WorkoutDay, "id">[]
): Promise<void> {
  const workoutsRef = collection(db, "clients", uid, "workouts");
  const snapshot = await getDocs(workoutsRef);
  for (const d of snapshot.docs) {
    await deleteDoc(d.ref);
  }
  for (const workout of workouts) {
    await addDoc(workoutsRef, workout);
  }
}

export async function setWorkoutPlan(
  uid: string,
  workouts: Omit<WorkoutDay, "id">[]
): Promise<void> {
  for (const workout of workouts) {
    await addDoc(collection(db, "clients", uid, "workouts"), workout);
  }
}

// ============ CONTACT APPLICATIONS ============

export async function submitApplication(
  data: Omit<Application, "id" | "submittedAt" | "status">
): Promise<void> {
  await addDoc(collection(db, "applications"), {
    ...data,
    status: "new",
    submittedAt: serverTimestamp(),
  });
}

export function subscribeToApplications(
  callback: (apps: Application[]) => void
) {
  const q = query(
    collection(db, "applications"),
    orderBy("submittedAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    const apps = snapshot.docs.map((d) => ({
      ...d.data(),
      id: d.id,
    })) as Application[];
    callback(apps);
  });
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<void> {
  const docRef = doc(db, "applications", id);
  await setDoc(
    docRef,
    { status, updatedAt: serverTimestamp() },
    { merge: true }
  );
}