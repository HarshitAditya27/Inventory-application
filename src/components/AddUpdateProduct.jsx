import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProducts } from "../redux/store";

function AddUpdateProduct() {
  const [productDetails, setProductDetails] = useState({
    name: "",
    unitOfMeasure: "",
    category: "",
    expiryDate: "",
    materials: [],
  });

  const [materialInput, setMaterialInput] = useState({
    name: "",
    materialId: "",
    unitOfMeasure: "",
    quantity: 0,
    price: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMaterial = () => {
    if (
      !materialInput.name ||
      materialInput.quantity <= 0 ||
      materialInput.price <= 0
    ) {
      alert("Please provide valid material details.");
      return;
    }

    const newMaterial = {
      ...materialInput,
      totalPrice: materialInput.quantity * materialInput.price,
      taxAmount: materialInput.quantity * materialInput.price * 0.1,
    };

    setProductDetails((prev) => ({
      ...prev,
      materials: [...prev.materials, newMaterial],
    }));

    setMaterialInput({
      name: "",
      materialId: "",
      unitOfMeasure: "",
      quantity: 0,
      price: 0,
    });
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    if (
      !productDetails.name ||
      !productDetails.unitOfMeasure ||
      !productDetails.category ||
      !productDetails.expiryDate
    ) {
      alert("Please fill in all required product details.");
      return;
    }

    const totalCost = productDetails.materials.reduce(
      (acc, material) => acc + material.totalPrice + material.taxAmount,
      0
    );

    const updatedProductDetails = { ...productDetails, totalCost };

    dispatch(addProducts(updatedProductDetails));
    navigate("/");
  };

  return (
    <div>
      <h1>Add New Product</h1>

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
            placeholder="Product Category"
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
          <h2>Add Materials</h2>
          <div>
            <input
              type="text"
              name="name"
              value={materialInput.name}
              onChange={(e) =>
                setMaterialInput({ ...materialInput, name: e.target.value })
              }
              placeholder="Material Name"
            />
            <input
              type="number"
              name="quantity"
              value={materialInput.quantity}
              onChange={(e) =>
                setMaterialInput({ ...materialInput, quantity: e.target.value })
              }
              placeholder="Quantity"
            />
            <input
              type="number"
              name="price"
              value={materialInput.price}
              onChange={(e) =>
                setMaterialInput({ ...materialInput, price: e.target.value })
              }
              placeholder="Price"
            />
            <select
              name="unitOfMeasure"
              value={materialInput.unitOfMeasure}
              onChange={(e) =>
                setMaterialInput({
                  ...materialInput,
                  unitOfMeasure: e.target.value,
                })
              }
            >
              <option value="">Select Unit of Measure</option>
              <option value="ml">ml</option>
              <option value="ltr">ltr</option>
              <option value="gm">gm</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <button type="button" onClick={handleAddMaterial}>
            Add Material
          </button>
        </div>

        <div>
          <h3>Materials List</h3>
          <ul>
            {productDetails.materials.map((material, idx) => (
              <li key={idx}>
                {material.name} - {material.quantity} {material.unitOfMeasure} -
                ₹{material.totalPrice} (Tax: ₹{material.taxAmount})
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}

export default AddUpdateProduct;
