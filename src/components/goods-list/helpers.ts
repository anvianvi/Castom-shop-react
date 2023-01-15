import {
  Product,
  ProductFilters,
  ProductFiltersSortBy,
} from "../../types/product";

export function sortProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  const output = products;

  switch (filters.sortBy) {
    case ProductFiltersSortBy.NameAsc:
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case ProductFiltersSortBy.NameDesc:
      return products.sort((a, b) => b.name.localeCompare(a.name));
    case ProductFiltersSortBy.YearAsc:
      return products.sort((a, b) => a.year - b.year);
    case ProductFiltersSortBy.YeadDesc:
      return products.sort((a, b) => b.year - a.year);
    default:
      return output;
  }
}

export function filterProduct(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((good) => {
    if (
      filters.categories &&
      filters.categories.length &&
      !filters.categories.some((category) =>
        good.type.includes(category.toLowerCase())
      )
    ) {
      return false;
    }

    if (
      filters.country &&
      filters.country !== "any" &&
      !good.origin.includes(filters.country)
    ) {
      return false;
    }

    if (
      filters.query &&
      !good.name.toLowerCase().includes(filters.query.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.price &&
      filters.price.length &&
      (good.cost < filters.price[0] || good.cost > filters.price[1])
    ) {
      return false;
    }

    if (
      filters.year &&
      filters.year.length &&
      (good.year < filters.year[0] || good.year > filters.year[1])
    ) {
      return false;
    }

    return true;
  });
}

export function getProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  const output = filterProduct(products, filters);
  return sortProducts(output, filters);
}
