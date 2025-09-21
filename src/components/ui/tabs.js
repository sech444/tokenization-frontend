import React, { useState, createContext, useContext } from "react";
import clsx from "clsx";

const TabsContext = createContext(null);

export function Tabs({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 border-b">{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    console.warn("TabsTrigger used outside of <Tabs> context");
    return null;
  }

  const { active, setActive } = ctx;

  return (
    <button
      className={clsx(
        "px-3 py-2",
        active === value
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-600"
      )}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;

  return ctx.active === value ? <div className="mt-4">{children}</div> : null;
}
