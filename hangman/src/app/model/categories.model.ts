export interface Data {
  categories: Categories;
}

export interface Categories {
  [key: string]: Animal[];
}

export interface Animal {
  name: string;
  selected: boolean;
}
