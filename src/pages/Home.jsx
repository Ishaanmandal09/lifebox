import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the popup has already been shown in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    if (!hasSeenPopup) {
      setShowPopup(true);
      // Store the flag so it won't show again on returning to Home
      sessionStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  return (
    <>
      <div style={{ minHeight: "100vh", background: "#f5f7fb" }}>
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginTop: "120px",
            padding: "20px",
          }}
        >
          <h1 style={{ fontSize: "55px" }}>
            Never Lose Your Things Again
          </h1>

          <p
            style={{
              fontSize: "20px",
              marginTop: "20px",
              color: "#666",
            }}
          >
            Save where you keep your important belongings with photos,
            categories, exact locations and smart search.
          </p>

          <div style={{ marginTop: "40px" }}>
            <Link to="/add">
              <button
                style={{
                  padding: "15px 30px",
                  marginRight: "20px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Add Item
              </button>
            </Link>

            <Link to="/search">
              <button
                style={{
                  padding: "15px 30px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Search Item
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Clean Redirect Welcome Pop-up */}
        {showPopup && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{
                background: "#ffffff",
                padding: "36px 32px",
                borderRadius: "16px",
                width: "380px",
                textAlign: "center",
                position: "relative",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "16px",
                  border: "none",
                  background: "none",
                  fontSize: "24px",
                  color: "#9ca3af",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </button>

              {/* Icon / Brand Header */}
              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "12px",
                }}
              >
                📦
              </div>

              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "24px",
                  color: "#1e293b",
                  fontWeight: "700",
                }}
              >
                Welcome to LifeBox
              </h2>

              <p
                style={{
                  margin: "0 0 28px 0",
                  color: "#64748b",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                Sign in or create an account to start tracking your belongings
                effortlessly.
              </p>

              {/* Redirect Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
                  }}
                >
                  Go to Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#f8fafc",
                    color: "#2563eb",
                    border: "1.5px solid #2563eb",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Create New Account
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}

export default Home;