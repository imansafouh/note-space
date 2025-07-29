import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import Home from "@/components/Home";
import { Login } from "@/components/Login";
import { Notes } from "@/components/Notes";
import { Signup } from "@/components/Signup";
import PrivateRoute from "@/components/PrivateRoute";
import { Toaster } from "@/components/ui/sonner";

const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<PrivateRoute />}>
        <Route path="/notes" element={<Notes />} />
      </Route>
    </Routes>
    <Toaster position="bottom-center" />
  </BrowserRouter>
);

export default AppRoutes;
