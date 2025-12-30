import { useAuthStore } from "../store/authStore";

export const apiFetch = async (url, options = {}) => {
  const { accessToken, refreshToken, setAuth, logout, user } =
    useAuthStore.getState();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401 && refreshToken) {
    
    const refreshRes = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!refreshRes.ok) {
      logout(); 
      throw new Error("Session expired");
    }

    const refreshData = await refreshRes.json();

    setAuth(user, refreshData.accessToken, refreshToken);

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${refreshData.accessToken}`,
      },
    });
  }

  return res;
};
