"use client";

import ImageEditor from "@/components/ImageEditor";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.isLoggedIn);

  // return <>{user ? <Login /> : <ImageEditor />}</>;
  return <ImageEditor />;
}
