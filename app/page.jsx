"use client";

import ImageEditor from "@/components/ImageEditor";
import Login from "@/components/Login";
import { toggleActiveAuthType } from "@/redux/slice/userSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const localMidleware = () => {
    if (Cookies.get("isLoggedIn")) {
      dispatch(toggleActiveAuthType(true));
    }
  };

  useEffect(() => {
    localMidleware();
  }, []);

  return <>{!user ? <Login /> : <ImageEditor />}</>;
}
