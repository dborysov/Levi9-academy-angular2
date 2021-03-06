export interface IProduct {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  date: number;
  image: string;
  description: string;
  details: ReadonlyArray<string>;
}
