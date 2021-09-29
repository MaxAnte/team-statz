import React, { createContext } from "react";
import { api } from "../api/api";
import { UserResponseSchema } from "./session.schema";
import {
  Session,
  Props,
  State,
  UserLoginData,
  UserResponse,
} from "./session.types";

export const SessionContext = createContext<Session>(undefined!);
export class SessionProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      context: {
        token: null,
        userId: null,
        isAuthenticated: false,
        logInUser: this.logInUser,
        logOutUser: this.logOutUser,
      },
    };
  }

  logInUser = async (userData: UserLoginData) => {
    try {
      const response = await api<UserResponse>("/api/auth/login", "POST", {
        ...userData,
      });

      const { token, userId } = UserResponseSchema.parse(response);

      this.setState({
        context: {
          ...this.state.context,
          token,
          userId,
          isAuthenticated: true,
        },
      });
      localStorage.setItem("userData", JSON.stringify({ userId, token }));
      return { token, userId };
    } catch (error: any) {
      throw error;
    }
  };

  logOutUser = async () => {
    this.setState({
      context: {
        ...this.state.context,
        token: null,
        userId: null,
        isAuthenticated: false,
      },
    });
    localStorage.removeItem("userData");
  };

  render() {
    return (
      <SessionContext.Provider value={this.state.context}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}
