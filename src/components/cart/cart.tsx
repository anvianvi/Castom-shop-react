import Table from "react-bootstrap/Table";
import data from "../../goods";
import Button from "react-bootstrap/esm/Button";
import { Product } from "../../types/product";
import "./cart.css";
import { ICart } from "../../types/cart";

function LineOfAddedElement({
  item,
  quantity,
}: {
  item: Product;
  quantity: number;
}) {
  return (
    <tr>
      <td>
        <img src={item.img} alt="" className="img-preview" />
      </td>
      <td>{item.name}</td>
      <td>{item.cost} €</td>
      <td>{quantity}</td>
      <td>{quantity * item.cost} €</td>
    </tr>
  );
}

interface IAddedGoodsTable {
  cartItems: ICart["items"];
}

function AddedGoodsTable(props: IAddedGoodsTable) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Cost</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.cartItems.map((productInCart) => {
          const good = data.find((item) => item.id === productInCart.id);
          if (!good) {
            return null;
          }
          return (
            <LineOfAddedElement
              key={good.name}
              item={good}
              quantity={productInCart.count}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

interface ICartPage {
  cartItems: ICart["items"];
  cartTotalCount: number;
  cartTotalPrice: number;
}

function Cart(props: ICartPage) {
  return (
    <div className="cart-wrapper">
      <h1> Cart ({props.cartTotalCount}) items </h1>
      <AddedGoodsTable cartItems={props.cartItems} />

      <div className="total-cost">
        <Button className="total-cost-button" variant="light">
          Continue shopping
        </Button>
        <Button className="total-cost-button" variant="dark">
          Clear cart
        </Button>
        <Button className="total-cost-button" variant="primary">
          <span>Checkout</span>
          {"\u00A0"}
          <span>{props.cartTotalPrice} €</span>
        </Button>
      </div>
    </div>
  );
}

export default Cart;
