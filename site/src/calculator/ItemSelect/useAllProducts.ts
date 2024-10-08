import { recipes } from "utils/helperFunctions";
import { RecipeProduct } from "utils/types";

export function useAllProducts() {
  return recipes.reduce<RecipeProduct[]>((accumulator, object) => {
    const { products } = object;
    products.forEach((product) => {
      const existingProduct = accumulator.find((p) => p.name === product.name);
      if (!existingProduct) {
        accumulator.push(product);
      }
    });
    return accumulator;
  }, []);
}
