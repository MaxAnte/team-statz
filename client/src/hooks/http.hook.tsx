import { useState, useCallback } from "react";

type Headers = {
  "Content-Type"?: string;
  Accept?: string;
};

type HttpResponse = {
  status?: string;
  ok: boolean;
  message: string;
};

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers: Headers = {}
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
          headers["Accept"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) throw data.message || "Error occured while fetch";

        setLoading(false);

        return data;
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
