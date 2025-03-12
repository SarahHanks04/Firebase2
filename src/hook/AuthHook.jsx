import { api } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// Single endpoint for all auth operations
const AUTH_ENDPOINT = "signIn";

// Hook for both login and registration
export const useAuth = (isSignUp = false) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post(AUTH_ENDPOINT, { ...credentials, isSignUp });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data.token));
      queryClient.invalidateQueries(["user"]);
      // Assume dashboard is the post-sign-in/up page
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      console.error(isSignUp ? "Registration failed:" : "Login failed:", error);
    },
  });
};

// Hook for checking authentication status (assuming token-based auth)
export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => api.fetch(AUTH_ENDPOINT, { checkAuth: true }),
    enabled: !!localStorage.getItem("token"), // Only fetch if token exists
    retry: false,
  });
};

// Logout function remains the same
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Redirect to login/home
};