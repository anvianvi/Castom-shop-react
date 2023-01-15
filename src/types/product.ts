export interface Product {
  id: string;
  img: string;
  name: string;
  cost: number;
  color: string;
  origin: string;
  year: number;
  type: string[];
  favorite: boolean;
  stockCount: number;
}

export enum ProductFiltersSortBy {
  NameAsc = "name-acs",
  NameDesc = "name-desc",
  YearAsc = "year-asc",
  YeadDesc = "year-desc",
}

export interface ProductFilters {
  categories: string[];
  country: string | null;
  price: number[];
  query: string | null;
  year: number[];
  color: string[];
  sortBy: ProductFiltersSortBy;
}
