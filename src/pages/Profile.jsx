import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const access = localStorage.getItem("access");
      if (!access) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://lms-6-gz0f.onrender.com/api/user/profile/",
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load profile. Please login again.");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-4">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          User Profile
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {user.first_name && (
            <p>
              <strong>First Name:</strong> {user.first_name}
            </p>
          )}
          {user.last_name && (
            <p>
              <strong>Last Name:</strong> {user.last_name}
            </p>
          )}
          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
