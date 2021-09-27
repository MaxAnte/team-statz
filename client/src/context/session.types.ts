export type Session = {
  token: string | null;
  userId: string | null;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean | false;
};
export type User = { login: string; password: string };
