import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
// import Menu from "./pages/Menu";
// import LiveOrders from "./pages/LiveOrders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            {/* <Route path="menu" element={<Menu />} /> */}
            {/* <Route path="live-orders" element={<LiveOrders />} /> */}
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
