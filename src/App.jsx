import { Route, Routes } from "react-router-dom";
import AddProducts from "./routes/AddProducts";
import Home from "./routes/Home";
import NavBar from "./components/Navbar";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Checkout from "./routes/Checkout";
import NotFound from "./routes/NotFound";

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addProduct" element={<AddProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/404" element={<NotFound />} />
            </Routes>
        </>
    );
};
export default App;
