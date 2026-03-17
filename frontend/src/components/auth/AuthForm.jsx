import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { z } from "zod";
import GoogleButton from "./GoogleButton";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export default function AuthForm({ mode, setMode }) {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = schema.safeParse({ email, password });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    setError("");

    try {

      if (mode === "login") {

        const res = await api.login({ email, password });

        localStorage.setItem("token", res.access_token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("user", JSON.stringify(res.user));

        if (res.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

      } else {

        await api.register({
          name,
          email,
          password
        });

        setMode("login");
      }

    } catch (err) {

      setError(err?.response?.data?.detail || "Authentication failed");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="w-full max-w-md space-y-6">

      <div className="text-center">
        <h1 className="text-2xl font-bold">
          {mode === "login" ? "Welcome," : "Create Account"}
        </h1>

        <p className="text-muted-foreground text-sm">
          {mode === "login"
            ? "Login to continue"
            : "Start digitizing invoices"}
        </p>
      </div>

      <GoogleButton />

      <div className="flex items-center gap-2">
        <div className="flex-1 border-t"></div>
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="flex-1 border-t"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {mode === "register" && (
          <input
            className="w-full border rounded-md p-2"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          className="w-full border rounded-md p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-md p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Processing..." : mode === "login" ? "Login" : "Register"}
        </button>

      </form>

      <p className="text-sm text-center">

        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="ml-2 text-blue-500"
        >
          {mode === "login" ? "Register" : "Login"}
        </button>

      </p>

    </div>
  );
}