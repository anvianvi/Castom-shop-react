import { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ICart } from "../../types/cart";
import { ProductFilters, ProductFiltersSortBy } from "../../types/product";
import GoodsList from "../goods-list/good-list";
import ProductModal from "../popup";
import ProductsFilters from "../product-filters";
import "./main.css";

interface IMainProps {
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
  cartItems: ICart["items"];
}

// фильтры по цвету +
// можно отобразить только популярные товары +5
// Сброс фильтров +20
// есть кнопка reset для сброса фильтров +10
// Кнопка reset сбрасывает только фильтры, не влияя на порядок сортировки или товары, добавленные в избранное.
// После использования кнопки reset фильтры остаются работоспособными
// при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом +10


const DEFAULT_FILTERS = {
  categories: [],
  country: "any",
  price: [0, 100],
  year: [2015, 2022],
  query: "",
  color: [],
};

function Main(props: IMainProps) {
  const [selectedGood, setSelectedGood] = useState<string | null>(null);
  const [formState, setFormState] = useState<ProductFilters>({
    ...DEFAULT_FILTERS,
    sortBy: ProductFiltersSortBy.NameAsc,
  });

  const resetFilters = useCallback(() => {
    setFormState({
      ...formState,
      ...DEFAULT_FILTERS
    });
  }, []);

  return (
    <main className="main">
      <div className="main-container">
        <div className="block-filtres">
          <ProductsFilters formState={formState} setFormState={setFormState} resetFilters={resetFilters} />
        </div>
        <div>
          <Row className="justify-content-md-between">
            <Col md={4}>
              <Form.Control
                type="text"
                name="search"
                onChange={(evt) => {
                  setFormState({ ...formState, query: evt.target.value });
                }}
              />
            </Col>
            <Col md={4}>
              <Form.Select
                aria-label="Sort By"
                defaultValue={formState.sortBy}
                onChange={(evt) => {
                  setFormState({
                    ...formState,
                    sortBy: evt.target.value as ProductFiltersSortBy,
                  });
                }}
              >
                <option value={ProductFiltersSortBy.NameAsc}>Name (A-Z)</option>
                <option value={ProductFiltersSortBy.NameDesc}>
                  Name (Z-A)
                </option>
                <option value={ProductFiltersSortBy.YearAsc}>
                  Release year &#8593;
                </option>
                <option value={ProductFiltersSortBy.YeadDesc}>
                  Release year &#8595;
                </option>
              </Form.Select>
            </Col>
          </Row>
          <GoodsList
            filters={formState}
            cartItems={props.cartItems}
            onElementSelect={(id: string) => {
              setSelectedGood(id);
            }}
          />
        </div>
      </div>
      <ProductModal
        show={!!selectedGood}
        goodId={selectedGood}
        onHide={() => setSelectedGood(null)}
        onAddToCart={props.onAddToCart}
        onRemoveFromCart={props.onRemoveFromCart}
        cartItems={props.cartItems}
      />
    </main>
  );
}

export default Main;
