import React, { useContext, useState } from 'react';

export type Route = 'SIM_HOME' | 'SIM_NEW_USER_EXPERIENCE';

interface RouterContextState {
  currentRoute: Route;
  push: (newRoute: Route) => void;
}

interface RouterContextProviderProps {
  children: React.ReactNode;
}

export const RouterContext = React.createContext<RouterContextState>({ currentRoute: 'SIM_HOME', push: () => null });

export function RouterContextProvider({ children }: RouterContextProviderProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>('SIM_HOME');

  const push = (newRoute: Route) => setCurrentRoute(newRoute);
  return <RouterContext.Provider value={{ currentRoute, push }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}
