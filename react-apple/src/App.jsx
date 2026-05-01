import { Routes, Route } from "react-router-dom";
import "./assets/css/bootstrap.css";
import "./assets/css/styles.css";
import SharedLayout from "./pages/SharedLayout";
import HomePage from "./pages/HomePage";
import Iphone from "./pages/Iphone";
import SingleProduct from "./pages/SingleProduct";
import Four04 from "./Pages/Four04";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="iphone" element={<Iphone />} />

        <Route path="iphone/:id" element={<SingleProduct />} />

        <Route path="mac" element={<HomePage />} />
        <Route path="ipad" element={<HomePage />} />
        <Route path="watch" element={<HomePage />} />
        <Route path="tv" element={<HomePage />} />
        <Route path="music" element={<HomePage />} />
        <Route path="support" element={<HomePage />} />
        <Route path="search" element={<HomePage />} />
        <Route path="cart" element={<HomePage />} />
        
        <Route path="*" element={<Four04 />} />
      </Route>
    </Routes>
  );
}

export default App;
