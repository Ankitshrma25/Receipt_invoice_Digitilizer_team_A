import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function GoogleButton() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    // For debugging: log the entire response
    console.log("Google credential received:", credentialResponse);


    setError("");

    if (!credentialResponse?.credential) {
      setError("Google did not return a credential. Please try again.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.googleLogin({
        token: credentialResponse.credential,
      });

      // for debugging: log the API response
      console.log("Backend response:", res);

      // store auth info
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("role", res.role);

      // optional user info
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Google User",
          role: res.role,
        })
      );

      // redirect to dashboard based on role
      console.log("Login successful, navigating to dashboard...");
      if (res.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log("Google login error:", err);
      const detail =
        err?.response?.data?.detail ||
        "Google login failed. Please try again.";
      setError(detail);
    } finally {
      setLoading(false);
    }
  };



  const handleError = () => {
    setError("Google sign-in was cancelled or failed.");
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="outline"
        size="large"
        shape="rectangular"
        width={350}
      />

      {loading && (
        <p className="text-sm text-gray-500">Signing in...</p>
      )}

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}