import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../redux/store";

function ProductPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h3>Product List</h3>
      <Link to="/add">
        <button>Add New Product</button>
      </Link>
      {products.length === 0 ? (
        <p>No products listed</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div>
                <p>
                  {" "}
                  {product.name}, {product.catefory}, ₹{product.totalCost}
                </p>
                <Link to={`/update/${product.id}`}>
                  <button>Update</button>
                </Link>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductPage;
