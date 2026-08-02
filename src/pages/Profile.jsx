import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);

      const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id);

        console.log(profileData);
        console.log(error);

       console.log("Auth User ID:", user.id);
        console.log("Profile Data:", profileData);

        setProfile(profileData);

      const { count } = await supabase
        .from("item")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      setItemCount(count || 0);
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fb",
        }}
      >
        <div
          style={{
            width: "450px",
            background: "#fff",
            padding: "35px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#2563eb",
              marginBottom: "30px",
            }}
          >
            👤 My Profile
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {profile?.full_name || "Not Set"}
          </p>

          <p style={{ marginTop: "15px" }}>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p style={{ marginTop: "15px" }}>
            <strong>Items Listed:</strong>{" "}
            {itemCount}
          </p>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "12px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;