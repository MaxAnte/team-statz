import { useState, useCallback, useEffect } from "react";

const storageName: string = "userData";

type userData = {
  id: string;
  jwtToken: string;
};

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(storageName, JSON.stringify({ id, jwtToken }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    //@ts-ignore
    const data: userData = JSON.parse(localStorage.getItem(storageName));
    if (data && data.jwtToken) login(data.jwtToken, data.id);

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
