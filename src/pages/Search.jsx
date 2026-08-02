import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Search() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("item")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setItems(data);
    }

    setLoading(false);
  }

  const filteredItems = items.filter((item) =>
    `${item.item_name} ${item.category} ${item.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          🔍 Search Items
        </h1>

        <input
          type="text"
          placeholder="Search by name, category or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            display: "block",
            margin: "0 auto 40px",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {loading ? (
          <h2 style={{ textAlign: "center" }}>Loading...</h2>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(320px,1fr))",
              gap: "25px",
            }}
          >
                        {filteredItems.length === 0 ? (
              <h2 style={{ textAlign: "center", width: "100%" }}>
                No items found.
              </h2>
            ) : (
              filteredItems.map((item) => (
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
                      alt={item.item_name}
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
                        color: "#2563eb",
                        marginBottom: "12px",
                      }}
                    >
                      {item.item_name}
                    </h2>

                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>

                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>

                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>

                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>

                    <p>
                      <strong>Added:</strong>{" "}
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Search;