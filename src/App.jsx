import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductPage from "./components/productPage";
import AddUpdateProduct from "./components/AddUpdateProduct";
import UpdatePrevProduct from "./components/updatePrevProduct";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/add" element={<AddUpdateProduct />} />
        <Route path="/update/:id" element={<UpdatePrevProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
