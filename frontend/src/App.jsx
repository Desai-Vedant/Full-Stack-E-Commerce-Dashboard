import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Products from "./components/ViewProducts";
import Profile from "./components/Profile";
import UpdateProduct from "./components/UpdateProduct";
import PrivateComponent from "./components/PrivateComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      <BrowserRouter>
        <header className="shadow-md bg-white dark:bg-gray-900">
          <Nav />
        </header>
        <main className="flex-grow">
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<Products />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:productId" element={<UpdateProduct />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
