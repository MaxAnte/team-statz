import { z } from "zod";

import type { SessionProvider } from "./session.provider";

import { UserResponseSchema } from "./session.schema";

export type Session = {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean | false;

  logInUser: InstanceType<typeof SessionProvider>["logInUser"];
  logOutUser: InstanceType<typeof SessionProvider>["logOutUser"];
};

export type User = { login: string; password: string };

export type UserResponse = z.infer<typeof UserResponseSchema>;

export type Props = {
  // children: React.ReactChild;
};

export type State = {
  context: Session;
};
