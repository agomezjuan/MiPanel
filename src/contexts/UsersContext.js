import { createContext, useState, useEffect } from "react";

// Create a context for global state
export const UsersContext = createContext();

/**
 * Component for providing global state to the app
 *
 * @component UsersContextProvider
 * @param {node} children - The children of the component
 * @returns provider for the UsersContext
 */
export const UsersProvider = ({ children }) => {
  // Get users array from local storage if they exist
  const usersFromLocalStorage = JSON.parse(localStorage.getItem("users")) || [];

  // Set state for users array
  const [users, setUsers] = useState(usersFromLocalStorage);
  const [loading, setLoading] = useState(users.length === 0);

  // Save users to local storage when they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    // Create a provider for components to consume and subscribe to changes
    <UsersContext.Provider value={{ users, loading, setLoading, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
