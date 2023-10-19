interface IProduct {
  id?: string;
  type: string;
  title: string;
  photo: string;
  info: string;
  price: number;
  dateCreated: Date;
}

interface FbAddResponse {
  name: string;
  date: string;
}

export { IProduct, FbAddResponse };
