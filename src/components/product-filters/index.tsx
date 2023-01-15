import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReactSlider from "react-slider";
import { ProductFilters } from "../../types/product";
import "./product-filters.css";

const categories = [
  "Clothing",
  "Decorative",
  "Curtain",
  "Children",
  "Furniture",
];

// const colors = [
//   "Yellow",
//   "Pink",
//   "Green",
//   "Blue",
//   "Red",
// ];

interface IProductsFilters {
  formState: ProductFilters;
  setFormState: (state: ProductFilters) => void;
  resetFilters: () => void;
}

function ProductsFilters({
  formState,
  setFormState,
  resetFilters,
}: IProductsFilters) {
  console.log(formState);

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          {categories.map((category) => (
            <Form.Check
              key={`default-${category}`}
              type="checkbox"
              value='on'
              id={`default-${category}`}
              label={`${category} fabrics`}
              onChange={(evt) => {
                const newCategories = [...formState.categories];

                if (evt.target.checked) {
                  newCategories.push(category);
                } else {
                  newCategories.splice(newCategories.indexOf(category), 1);
                }

                setFormState({ ...formState, categories: newCategories });
              }}
            />
          ))}
        </Form.Group>
        {/* 
        <Form.Group className="mb-3 color-filter">
          <Form.Label>Color</Form.Label>
          {colors.map((Color) => (
            <Form.Check
              key={`default-${Color}`}
              type="checkbox"
              id={`default-${Color}`}
              Style={{ background: ${Color} }}
              onChange={(evt) => {
                const newColors = [...formState.colors];

                if (evt.target.checked) {
                  newColors.push(Color);
                } else {
                  newColors.splice(newColors.indexOf(Color), 1);
                }

                setFormState({ ...formState, color: newColors });
              }}
            />
          ))}
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Select
            value={formState.country || "any"}
            aria-label="Country"
            onChange={(evt) => {
              setFormState({ ...formState, country: evt.target.value });
            }}
          >
            <option value="any">any</option>
            <option value="China">China</option>
            <option value="Italy">Italy</option>
            <option value="Germany">Germany</option>
            <option value="India">India</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Year</Form.Label>
          <ReactSlider
            className="range-slider"
            thumbClassName="range-slider-thumb-year"
            trackClassName="range-slider-track"
            max={2023}
            min={2011}
            minDistance={1}
            defaultValue={[2015, 2022]}
            value={formState.year}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state}`}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            pearling
            onChange={(v) => {
              setFormState({ ...formState, year: v });
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <ReactSlider
            className="range-slider"
            thumbClassName="range-slider-thumb"
            trackClassName="range-slider-track"
            defaultValue={[0, 100]}
            value={formState.price}
            min={0}
            max={100}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state}`}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            pearling
            minDistance={5}
            onChange={(v) => {
              setFormState({ ...formState, price: v });
            }}
          />
        </Form.Group>
      </Form>

      <Button
        variant="light"
        onClick={resetFilters}
      >
        Remove all filtres
      </Button>
    </>
  );
}

export default ProductsFilters;
