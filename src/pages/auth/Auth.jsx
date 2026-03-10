import { useState } from "react";
import AuthHero from "../../components/auth/AuthHero";
import AuthForm from "../../components/auth/AuthForm";

export default function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      <AuthHero />

      <div className="flex items-center justify-center bg-background p-6">
        <AuthForm mode={mode} setMode={setMode} />
      </div>

    </div>
  );
}