import type { SessionProvider } from "./session.provider";

export type Session = {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean | false;

  logInUser: InstanceType<typeof SessionProvider>["logInUser"];
  logOutUser: InstanceType<typeof SessionProvider>["logOutUser"];
};

export type User = { login: string; password: string };

export type UserLoginData = {
  login: string;
  password: string;
};
export type UserResponse = {
  token: string;
  userId: string;
};
export type Props = {
  // children: React.ReactChild;
};

export type State = {
  context: Session;
};
