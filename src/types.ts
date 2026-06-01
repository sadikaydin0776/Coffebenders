export type MenuItem = {
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  price?: number;
  priceSmall?: number;
  priceLarge?: number;
  calories?: number;
  protein?: number;
  sugar?: number;
  recommendations?: string[];
};

export type MenuCategory = {
  id: string;
  title: string;
  titleEn?: string;
  icon?: string;
  items: MenuItem[];
};
