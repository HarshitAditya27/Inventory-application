import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../redux/store";

function UpdatePrevProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productToUpdate = useSelector((state) =>
    state.products.products.find((product) => product.id === parseInt(id))
  );

  const [productDetails, setProductDetails] = useState({
    name: "",
    unitOfMeasure: "",
    category: "",
    expiryDate: "",
    materials: [],
  });

  useEffect(() => {
    if (productToUpdate) {
      setProductDetails(productToUpdate);
    } else {
      navigate("/");
    }
  }, [productToUpdate, navigate]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMaterials = [...productDetails.materials];
    updatedMaterials[index][name] =
      name === "quantity" || name === "price" ? parseFloat(value) : value;
    setProductDetails((prev) => ({
      ...prev,
      materials: updatedMaterials,
    }));
  };

  const handleRemoveMaterial = (index) => {
    const updatedMaterials = productDetails.materials.filter(
      (_, i) => i !== index
    );
    setProductDetails((prev) => ({
      ...prev,
      materials: updatedMaterials,
    }));
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    if (
      !productDetails.name ||
      !productDetails.category ||
      !productDetails.expiryDate
    ) {
      alert("Please fill in all required product details.");
      return;
    }

    for (const material of productDetails.materials) {
      if (!material.name || material.quantity <= 0 || material.price <= 0) {
        alert("Please ensure all material details are valid.");
        return;
      }
    }

    const totalCost = productDetails.materials.reduce(
      (acc, material) =>
        acc +
        material.quantity * material.price +
        material.quantity * material.price * 0.1,
      0
    );

    const updatedProductDetails = { ...productDetails, totalCost };

    dispatch(updateProduct(updatedProductDetails));
    navigate("/");
  };

  return (
    <div>
      <h1>Update Product</h1>
      {!productToUpdate ? (
        <p>Loading product details...</p>
      ) : (
        <form onSubmit={handleSubmitProduct}>
          <div>
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={handleProductChange}
              placeholder="Product Name"
              required
            />
            <select
              name="unitOfMeasure"
              value={productDetails.unitOfMeasure}
              onChange={handleProductChange}
              required
            >
              <option value="">Select Unit of Measure</option>
              <option value="ml">ml</option>
              <option value="ltr">ltr</option>
              <option value="gm">gm</option>
              <option value="kg">kg</option>
            </select>
            <input
              type="text"
              name="category"
              value={productDetails.category}
              onChange={handleProductChange}
              placeholder="Category"
              required
            />
            <input
              type="date"
              name="expiryDate"
              value={productDetails.expiryDate}
              onChange={handleProductChange}
              required
            />
          </div>

          <div>
            <h2>Materials</h2>
            {productDetails.materials.map((material, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  value={material.name}
                  onChange={(e) => handleMaterialChange(index, e)}
                  placeholder="Material Name"
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  value={material.quantity}
                  onChange={(e) => handleMaterialChange(index, e)}
                  placeholder="Quantity"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={material.price}
                  onChange={(e) => handleMaterialChange(index, e)}
                  placeholder="Price"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMaterial(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default UpdatePrevProduct;
