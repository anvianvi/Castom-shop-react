import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ICart } from "../types/cart";
import goods from "../goods";
import "./popup.css";

interface IProductModal {
  show: boolean;
  goodId: string | null;
  onHide: () => void;
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
  cartItems: ICart["items"];
}

function ProductModal(props: IProductModal) {
  const product = goods.find((good) => good.id === props.goodId);
  const productInCart = props.cartItems.find(
    (item) => item.id === props.goodId
  );

  const countLeft =
    product && productInCart
      ? product.stockCount - productInCart.count
      : product?.stockCount || 0;

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {product?.name || "Unknown product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product?.img}
          alt={product?.name || "Unknown product"}
          className="popup-img"
        />
        <div className="popup-wrapper">
          <p>
            This perfect {product?.color || "Unknow"} fabric has been made in{" "}
            {product?.origin || "Unknow"} since {product?.year || "Unknown"}{" "}
            year.
          </p>
          <p>Available on store {countLeft}</p>
          <div className="buttons-group">
            <Button
              variant="danger"
              disabled={!product || !productInCart?.count}
              onClick={() => {
                if (product) {
                  props.onRemoveFromCart(product.id);
                }
              }}
            >
              -1
            </Button>
            <Button variant="light" disabled>
              {productInCart?.count || 0}
            </Button>
            <Button
              variant="success"
              disabled={!product || !countLeft}
              onClick={() => {
                if (product) {
                  props.onAddToCart(product.id);
                }
              }}
            >
              +1
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ProductModal;
