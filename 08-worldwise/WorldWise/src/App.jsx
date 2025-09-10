import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />

        <Route path={"app"} element={<AppLayout />}>
          <Route index element={<p>cities</p>} />
          <Route path={"cities"} element={<p>cities</p>} />
          <Route path={"countries"} element={<p>countries</p>} />
          <Route path={"form"} element={<p>form</p>} />
        </Route>

        <Route path={"product"} element={<Product />} />
        <Route path={"pricing"} element={<Pricing />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
