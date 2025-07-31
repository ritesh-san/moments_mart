import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // ✅ Icons for actions

interface Product {
  _id: string;
  productName: string;
  description: string;
  productSKU: string;
  price: number;
  category: string[];
  image: string;
  vendorId: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState<any>({
    productName: "",
    productSKU: "",
    description: "",
    price: 0,
    category: "",
    image: null,
  });

  const navigate = useNavigate();
  const customer = JSON.parse(sessionStorage.getItem("customer") || "{}");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/mart/proinfo`);
      const allProducts: Product[] = res.data.data || [];

      if (!customer._id) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const vendorProducts = allProducts.filter(
        (p: Product) => String(p.vendorId) === String(customer._id)
      );

      setProducts(vendorProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:4000/mart/delete/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setFormValues({
      productName: product.productName,
      productSKU: product.productSKU,
      description: product.description,
      price: product.price,
      category: product.category[0] || "",
      image: null,
    });
    setShowModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }
      setFormValues({ ...formValues, image: file });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;

    const formData = new FormData();
    formData.append("productName", formValues.productName);
    formData.append("productSKU", formValues.productSKU);
    formData.append("description", formValues.description);
    formData.append("price", formValues.price);
    formData.append("category", formValues.category);
    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    try {
      await axios.put(
        `http://localhost:4000/mart/update/${editProduct._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product updated successfully!");
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-list-container">
      {/* Header */}
      <div className="list-header">
        <h2>My Products</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/product/upload")}
        >
          Upload Product
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle product-table">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Price</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id}>
                  <td>
                    <img
                      src={prod.image || "/no-image.png"}
                      alt={prod.productName}
                      width="70"
                      height="70"
                      style={{ borderRadius: "5px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{prod.productName}</td>
                  <td>{prod.productSKU}</td>
                  <td>{prod.description}</td>
                  <td>₹{prod.price}</td>
                  <td className="actions">
                    <button
                      className="btn btn-sm btn-primary me-2 edit-btn"
                      onClick={() => openEditModal(prod)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger delete-btn"
                      onClick={() => deleteProduct(prod._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No products found</p>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "500px",
            }}
          >
            <h4>Edit Product</h4>
            <form onSubmit={handleUpdate}>
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={formValues.productName}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />

              <label>SKU</label>
              <input
                type="text"
                name="productSKU"
                value={formValues.productSKU}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={formValues.description}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />

              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />

              <label>Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control mb-3"
              />

              <div style={{ textAlign: "right" }}>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
