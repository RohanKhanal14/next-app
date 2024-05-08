"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // it pushes the user to the login page as soon they signup
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
   
  // this function calls when we press the submit button

  const signUp = async () => {
    try {
      setLoading(true);       //setting loading true            
      const res = await axios.post("/api/users/signup", user);  // sending userdata to api we created in route.ts of signup page 
      router.push("/login"); //showing login page after sign up is done
    } catch (error: any) {
      console.log("signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex h-screen justify-center">
      <div className="flex border flex-col w-3/12 h-4/6 rounded-xl mt-auto mb-auto ">
        <div className="font-medium text-4xl mt-5 mb-5 text-center">
          <h1>{loading ? "processing" : "signup"}</h1>
        </div>
        <div>
            <div className="ml-3 mt-5">
              <label htmlFor="username">USERNAME</label>
              <div className="mt-3">
                <input
                  type="text"
                  id="username"
                  className="block w-3/4 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  value={user.username}
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="ml-3 mt-5">
              <label htmlFor="email">EMAIL</label>
              <div className="mt-3">
                <input
                  type="email"
                  id="email"
                  className="block w-3/4 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="ml-3 mt-5">
              <label htmlFor="password">PASSWORD</label>
              <div className="mt-3">
                <input
                  type="password"
                  id="password"
                  className="block w-3/4 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </div>
            </div>
            <button
              onClick={signUp}
              className="rounded-xl bg-white text-black  hover:bg-slate-950 w-1/2 mt-5 ml-3"
            >
              SIGNUP
            </button>
          <Link className="ml-3" href="/login">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
