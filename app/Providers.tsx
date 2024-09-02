"use client";

import { Loader } from "#/components/ui";
import { AppStore, makeStore } from "#/lib/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={<Loader />}
        persistor={persistStore(storeRef.current)}
      >
        <Toaster position="top-right" />
        {children}
      </PersistGate>
    </Provider>
  );
};
