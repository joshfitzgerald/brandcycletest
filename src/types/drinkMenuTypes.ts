export type DrinkOptionProps = {
  id: string;
  name: string;
  prices: PriceOptionProps;
};

export type PriceOptionProps = {
  small: string;
  medium: string;
  large: string;
};

export type MilkOptionProps = {
  id: string;
  name: string;
  price: string;
};

export type SizeOptionProps = {
  id: string;
  name: string;
};

export type drinkOrderProps = {
  type: string;
  size: string;
  milk: string;
}