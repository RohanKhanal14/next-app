"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log(res.data);
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log("logout failed", error.message);
      toast.error(error.message);
    }
  };

  const getUser = async () => {
    const res = await axios.get("/api/users/me"); 
    console.log(res.data);
    setData(res.data.allUser._id); 
    
  };

  return (
    <div>
      <h1>profile page</h1>
      <h2>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button className="p-5 bg-blue-500 text-white" onClick={logout}>
        logout
      </button>
      <button className="p-5 bg-blue-500 text-white" onClick={getUser}>
        getuser
      </button>
    </div>
  );
}
