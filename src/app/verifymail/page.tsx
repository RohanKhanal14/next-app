"use client";

import axios from "axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function VerifyMailPage() {
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/verifymail", { token });
      if (res.status === 200) {
        setVerify(true);
      }
    } catch (error: any) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

return (
    <div>
        <h1>verify Email</h1>
        <h2>{token ? `${token}` : "no token"}</h2>
        {verify && (
            <div>
                <h1>Verified</h1>
                <Link href="/login">Login</Link>
            </div>
        )}
    </div>
);
}
