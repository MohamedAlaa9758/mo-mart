export interface ItemResponse {
  results: number;
  data: ItemI[];
}

export interface ItemI {
  _id: string;
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface ItemSpecificI {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
