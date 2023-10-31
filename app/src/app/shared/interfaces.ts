interface IProduct extends IProductForm {
  id?: string;
  dateCreated: Date;
}

interface IProductForm {
  type: string;
  title: string;
  photo: string[];
  info: string;
  price: number;
}

interface FbAddResponse {
  name: string;
  date: string;
}

enum ProductsTypes {
  phones = 'phones',
  tablets = 'tablets',
  laptops = 'laptops',
}

interface ImageInputEvent extends Event {
  target: any;
}

interface CartProduct {
  id: string;
  title: string;
  price: number;
  photo: string;
  amount: number;
  summ: number;
}

export {
  IProduct,
  FbAddResponse,
  IProductForm,
  ProductsTypes,
  ImageInputEvent,
  CartProduct,
};
