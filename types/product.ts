export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number; 
  image: string; 
  hoverImage: string; 
  rating: number; 
  reviews: number; 
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
}