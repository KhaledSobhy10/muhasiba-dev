import React from "react";

type Props = { children: React.ReactNode };

export default function Layout({children}: Props) {
  return (
    <div className="mt-4 container xl:p-8 lg:p-4 p-2 gap-4 flex flex-col justify-start items-start  min-h-svh">
      {children}
    </div>
  );
}
