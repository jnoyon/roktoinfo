import React, { createContext, useContext, useEffect, useState } from 'react';
import { authContext } from '../firebase/AuthProvider'; // Adjust path based on your project

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const { user } = useContext(authContext);
    const [roles, setRoles] = useState({ isMember: false, isModerator: false, isAdmin: false });

    useEffect(() => {
        if (user) {
          fetch("https://roktoinfo-server.vercel.app/users")
            .then((res) => res.json())
            .then((data) => {
              const foundUser = data.find((u) => u.email === user.email);
              if (foundUser) {
                setRoles({
                  isMember: foundUser.isMember || false,
                  isModerator: foundUser.isModerator || false,
                  isAdmin: foundUser.isAdmin || false,
                });
              }
            })
            .catch((err) => console.error("Failed to fetch user roles:", err));
        }
      }, [user]);

    return (
        <UserContext.Provider value={roles}>
            {children}
        </UserContext.Provider>
    );
}
