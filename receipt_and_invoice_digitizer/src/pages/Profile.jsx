import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setName(storedUser.name);
      setEmail(storedUser.email || "");
    }
  }, []);

  const handleSave = () => {
    const updatedUser = {
      name,
      email,
      plan: "Pro"
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Trigger navbar update
    window.dispatchEvent(new Event("storage"));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}