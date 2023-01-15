import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Product, ProductFilters } from "../../types/product";
import { ICart } from "../../types/cart";
import data from "../../goods";
import { getProducts } from "./helpers";
import "./good-list.css";

function GoodCard({
  item,
  onSelect,
  inCartCount,
}: {
  item: Product;
  onSelect: (id: string) => void;
  inCartCount?: number;
}) {
  const copy = inCartCount
    ? `${item.name} (${inCartCount} in cart)`
    : item.name;

  return (
    <Card>
      <Card.Img
        onClick={() => onSelect(item.id)}
        variant="top"
        src={item.img}
      />
      <Card.Body>
        <Card.Title>{copy}</Card.Title>
        <p>Produced since {item.year}</p>
        <div className="card-wrapper">
          <div>
            {item.cost} €
          </div>
          <Button onClick={() => onSelect(item.id)}>Add to cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

interface GoodListProps {
  filters: ProductFilters;
  cartItems: ICart["items"];
  onElementSelect: (id: string) => void;
}

function GoodsList(props: GoodListProps) {
  const items = getProducts(data, props.filters);

  if (!items.length) {
    return (
      <div className="products-list__empty">
        Sorry... It seems that currently we do not have anything according to
        your search parameters. Try to "reset all"
      </div>
    );
  }

  return (
    <Row xs={1} md={3}>
      {items.map((good) => {
        const productInCart = props.cartItems.find(
          (item) => item.id === good.id
        );

        return (
          <Col key={good.name}>
            <GoodCard
              item={good}
              onSelect={props.onElementSelect}
              inCartCount={productInCart?.count}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default GoodsList;
