import { Headers, Response } from "./api.types";

export async function api<T>(
  url: string,
  method: string = "GET",
  body: any = null,
  headers: Headers = {}
): Promise<Response<T>> {
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

    return data;
  } catch (error: any) {
    throw error;
  }
}
