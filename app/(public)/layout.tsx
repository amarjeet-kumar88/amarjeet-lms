import { ReactNode } from "react";
import Navebar from "./_components/Navebar";

export default function LayoutPublic({children}: {children: ReactNode}) {
  return (
    <div>
        <Navebar />
        <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  )
}
