import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const getUser = async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            setUser(user);

            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();

            setProfile(data);
          }
        };

        getUser();
      }, []);

    return(
        <>
            <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 60px",
            background: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,.08)",
          }}
        >
          <h2>📦 LifeBox</h2>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/dashboard">Dashboard</Link>

            {user ? (
                  <button
                    onClick={() => navigate("/profile")}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#2563eb",
                    }}
                  >
                    👤 {profile?.full_name || "Profile"}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#2563eb",
                    }}
                  >
                    Login
                  </button>
                )}
          </div>
        </nav>
        </>
    );
}

export default Navbar;  