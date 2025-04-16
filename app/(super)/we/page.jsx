"use client"
import { requestFcmToken } from "@/firebase/requestFcmToken";
import  { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    requestFcmToken();
  }, []);
  return <div>This is dashboard</div>;
};

export default Dashboard;
