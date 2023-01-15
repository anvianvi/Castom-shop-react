import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./header.css";

const { PUBLIC_URL } = process.env;

interface IHeader {
  cartTotalCount: number;
}

export function Header({ cartTotalCount }: IHeader) {
  return (
    <Container>
      <header className="header" id="header">
        <Link to={PUBLIC_URL} className="logo">
          <img src="./logo.svg" alt="logo" className="logo-img" />
        </Link>
        <div className="header-container">
          <Link to={`${PUBLIC_URL}/cart`} className="header-cart">
            <img src="./cart-icon.svg" alt="cart-icon" className="cart-icon" />{" "}
            Cart ({cartTotalCount})
          </Link>
        </div>
      </header>
    </Container>
  );
}

export default Header;
