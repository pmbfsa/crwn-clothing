export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  items: CategoryItem[];
  title: string;
};

export type CategoryParams = {
  category: string;
};
