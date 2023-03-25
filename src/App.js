import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
      <div className="App">
          <Header />
          <main className="py-3">
              <Container>
                  <Routes>
                      <Route path="/" element={<HomeScreen />} exact />

                      <Route path="/register" element={<RegisterScreen />} />
                      <Route path="/login" element={<LoginScreen />} />
                      <Route path="/profile" element={<ProfileScreen />} />

                      <Route path="/product/:id" element={<ProductScreen />} />

                      <Route path="/cart/:id" element={<CartScreen />} />
                      <Route path="/cart" element={<CartScreen />} />
                  </Routes>
              </Container>
          </main>
          <Footer />
      </div>
  );
}

export default App;
