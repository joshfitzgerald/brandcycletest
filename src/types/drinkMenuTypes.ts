export type DrinkOptionProps = {
  id: string;
  name: string;
  prices: PriceOptionProps;
};

export type PriceOptionProps = {
  small: number;
  medium: number;
  large: number;
};

export type MilkOptionProps = {
  id: string;
  name: string;
  price: number;
};

export type SizeOptionProps = {
  id: string;
  name: string;
};

export type DrinkOrderProps = {
  type: string;
  size: string;
  milk: string;
}