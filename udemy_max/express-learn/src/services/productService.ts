import fs from 'fs';
import path from 'path';
import { Product } from '../models/product';

const productFile = path.resolve(path.dirname(process.mainModule!.filename), 'data', 'product.json');

const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const fileContent = await fs.promises.readFile(productFile);
    return JSON.parse(fileContent.toString());
  } catch (error) {
    return [];
  }
};

let products;

export const getAllProducts = async () => {
  if (products) {
    return products;
  }
  products = await fetchAllProducts();
  return products;
};

// export const getProductById = (id: string) => products.find(product => product.id === id);

export const addProduct = async (product: Product) => {
  if (!products) {
    products = await getAllProducts();
  }
  products.push(product);
  try {
    if (!fs.existsSync(productFile)) {
      fs.mkdirSync(path.resolve(productFile, '..'), { recursive: true });
    }
    fs.promises.writeFile(productFile, JSON.stringify(products));
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};
