"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()

  const onSubmit = async () => {
    authClient.signUp.email({
      email,
      name,
      password,
    }, {
      onSuccess: () => {
        console.log("Success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Sign In</Button>
      {session?.user ? (
        <div>
          <p>Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </div>
      ) : (
        <div>
          <p>No session</p>
        </div>
      )}
    </div>
  );
}
