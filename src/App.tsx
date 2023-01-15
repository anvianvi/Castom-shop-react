import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import Cart from "./components/cart/cart";
import useCart from "./components/cart/useCart";

const { PUBLIC_URL } = process.env;

function App() {
  const { cart, addToCart, removeFromCart, cartTotalCount, cartTotalPrice } =
    useCart();

  console.log(cartTotalCount, cartTotalPrice);

  return (
    <>
      <Header cartTotalCount={cartTotalCount} />
      <Container>
        <Routes>
          <Route
            path={PUBLIC_URL}
            element={
              <Main
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                cartItems={cart.items}
              />
            }
          />
          <Route
            path={`${PUBLIC_URL}/cart`}
            element={
              <Cart
                cartItems={cart.items}
                cartTotalCount={cartTotalCount}
                cartTotalPrice={cartTotalPrice}
              />
            }
          />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
