interface IProduct extends IProductForm {
  id?: string;
  dateCreated: Date;
}

interface IProductForm {
  type: string;
  title: string;
  photo: string;
  info: string;
  price: number;
}

interface FbAddResponse {
  name: string;
  date: string;
}

export { IProduct, FbAddResponse, IProductForm };
