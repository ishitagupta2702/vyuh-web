import { useAuth as useAuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const auth = useAuthContext();
  
  if (auth === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return auth;
}
