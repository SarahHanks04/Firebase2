import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

export const Logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
