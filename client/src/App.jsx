import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import { ProductProvider } from "./contexts/ProductContext";

function App() {
  return (
    <>
      <CookiesProvider>
        <ProductProvider>
          <Toaster toastOptions={{ position: "top-right" }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ProductProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
