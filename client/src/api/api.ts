import { Headers, Response } from "./api.types";

export async function api<T>(
  url: string,
  method: string = "GET",
  options: any = null,
  headers: Headers = {}
): Promise<Response<T>> {
  try {
    let body = null;
    if (options) {
      body = JSON.stringify(options);
      headers["Content-Type"] = "application/json";
      headers.Accept = "application/json";
    }

    const response = await fetch(url, { method, body, headers });
    let data: Response<T> = null!;
    data = await response.json();

    if (!response.ok) throw data.message || "Error occured while fetch";

    return data;
  } catch (error: any) {
    throw error;
  }
}
