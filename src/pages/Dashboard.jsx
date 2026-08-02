import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch items belonging to the user
    const { data, error } = await supabase
      .from("item")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error.message);
    } else {
      setItems(data);
    }

    setLoading(false);
  }

  async function deleteItem(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    await supabase.from("item").delete().eq("id", id);

    loadItems();
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "80vh",
          background: "#f5f7fb",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1>📦 My Items</h1>

          <button
            onClick={() => navigate("/add")}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            + Add Item
          </button>
        </div>

        {loading ? (
          <h2>Loading...</h2>
        ) : items.length === 0 ? (
          <h2>No Items Added Yet.</h2>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(320px,1fr))",
              gap: "25px",
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                }}
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div style={{ padding: "20px" }}>
                  <h2
                    style={{
                      marginBottom: "12px",
                      color: "#2563eb",
                    }}
                  >
                    {item.name}
                  </h2>

                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>

                  <p>
                    <strong>Storage:</strong>{" "}
                    {[item.storage_type, item.storage_name]
                      .filter(Boolean)
                      .join(" - ") || "N/A"}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {[item.building, item.floor, item.room]
                      .filter(Boolean)
                      .join(", ") || "N/A"}
                  </p>

                  <p>
                    <strong>Added:</strong>{" "}
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(`/edit/${item.id}`)
                      }
                      style={{
                        background: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;