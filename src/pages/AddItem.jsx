import { useState } from "react";
import { supabase } from "../supabaseClient";

function AddItem() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    building: "",
    floor: "",
    room: "",
    storage_type: "",
    storage_name: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
    data: { user },
    } = await supabase.auth.getUser();

    let imageUrl = null;

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("item_images")
        .upload(fileName, image);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("item_images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("item").insert([
      {
        name: formData.name,
        quantity: Number(formData.quantity),
        building: formData.building || null,
        floor: formData.floor || null,
        room: formData.room || null,
        storage_type: formData.storage_type || null,
        storage_name: formData.storage_name || null,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Item Added Successfully!");

    setFormData({
      name: "",
      quantity: "",
      building: "",
      floor: "",
      room: "",
      storage_type: "",
      storage_name: "",
    });

    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Add New Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="building"
            placeholder="Building / House"
            value={formData.building}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="floor"
            placeholder="Floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="room"
            placeholder="Room"
            value={formData.room}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="storage_type"
            value={formData.storage_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Storage Type</option>
            <option value="Cabinet">Cabinet</option>
            <option value="Cupboard">Cupboard</option>
            <option value="Drawer">Drawer</option>
            <option value="Shelf">Shelf</option>
            <option value="Desk">Desk</option>
            <option value="Wardrobe">Wardrobe</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="storage_name"
            placeholder="Storage Name"
            value={formData.storage_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <label className="w-full cursor-pointer bg-gray-100 border border-gray-300 rounded-lg p-3 text-center hover:bg-gray-200 transition block">
            {image ? image.name : "📷 Upload Image"}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Item
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddItem;