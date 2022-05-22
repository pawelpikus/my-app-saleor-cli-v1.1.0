import { App, createApp } from "@saleor/app-bridge";
import React, { createContext, useMemo } from "react";

interface IAppContext {
  app?: App;
}

export const AppContext = createContext<IAppContext>({ app: undefined });

const AppBridgeProvider = (props: React.ReactNode) => {
  const app = useMemo(() => {
    if (typeof window !== "undefined") {
      return createApp();
    }
  }, []);

  return <AppContext.Provider value={{ app }} {...props} />;
};

export default AppBridgeProvider;
