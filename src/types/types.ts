export interface IProduct {
  id: number;
  name: string;
  price: number;
  rate: number;
  imageUrl: string;
  categoryId: number;
}
export interface IProductFormat {
  id: number;
  name: string;
  price: string;
  category: string;
  rate: number;

}
export interface ICartProduct {
  id: number;
  prodId: number;
  quantity: number;
  name: string;
  price: number;
  imageUrl: string;
}
export interface IUser {
  id: number;
  name: string;
  phone: string;
  username: string;
  imgUrl?: string;
  address?: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
export interface ICheckedout {
  userId: number;
  name: string;
  phone: string;
  address?: string;
  description: string;
}
// export interface ICheckedout {
//   userId: number;
//   name: string;
//   phone: string;
//   address?: string;
//   description: { descId: number; prodId: number; quantity: number }[];
// }
export interface ICategory {
  id: number;
  name: string;
  description: string;
  webUrl: string;
}
export interface IUpdatePassword {
  oldPassword : string;
  newPassword : string;
}
