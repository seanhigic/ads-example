import { Product } from "../../../../shared/models/Product";

export function ProductController() {
    
    async function getProducts() : Promise<Product[]> {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const products = await response.json() as Product[];
        return products;
    }
  
    return {
      getProducts
    }
  }