import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function ProductAdd() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.name === "price" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.title ||
      !product.price ||
      !product.category ||
      !product.image
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      await addDoc(collection(db, "products"), product);
      navigate("/shop");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "our-first-project");
    data.append("cloud_name", "dl3d8y9fw");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dl3d8y9fw/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      setProduct({ ...product, image: result.secure_url });
      setError(""); // Clear error if image uploads successfully
    } catch (error) {
      console.error("Image upload failed:", error);
      setError("Image upload failed. Try again!");
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={product.title || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
        /> */}

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <div className="product-add">
        <h2>Product Details</h2>
        <p>Title: {product.title}</p>
        <p>Price: {product.price ? `$${product.price}` : ""}</p>
        <p>Category: {product.category}</p>

        <br />
        {product.image ? (
          <img src={product.image} alt={product.title} />
        ) : (
          <p className="font-bold text-yellow-300">
            Uploading Preview Please Wait...
            <br />
            This may take a few seconds depending on the size of the image.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductAdd;
