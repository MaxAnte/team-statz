export type Headers = {
  "Content-Type"?: string;
  Accept?: string;
};
export interface Response<T> {
  status: "ok" | "error";
  code: number;
  message?: string;
  data: T;
}
