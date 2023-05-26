import { createContext } from "react";

export const AuthContext = createContext({
    user: "Bob",
    isLoggedIn: false,
    onLogout: () => {}
})