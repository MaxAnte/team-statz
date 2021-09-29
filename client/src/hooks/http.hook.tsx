import { useState, useCallback } from "react";

type Headers = {
  "Content-Type"?: string;
  Accept?: string;
};
interface Response<T> {
  status: "ok" | "error";
  code: number;
  message?: string;
  data: T;
}
export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function request<T>(
    url: string,
    method: string = "GET",
    body: any = null,
    headers: Headers = {}
  ): Promise<Response<T>> {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
      }

      const response = await fetch(url, { method, body, headers });
      let data: Response<T> = null!;
      data = await response.json();

      if (!response.ok) throw data.message || "Error occured while fetch";

      setLoading(false);

      return data;
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
