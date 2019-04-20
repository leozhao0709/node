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

let products: Product[] | undefined;

export const getAllProducts = () => products;

(async () => {
  if (!products) {
    products = await fetchAllProducts();
  }
  products = await getAllProducts();
})();

export const getProductById = (id: string) => products!.find(product => product.id === id);

export const addProduct = async (product: Product) => {
  products!.push(product);
  try {
    if (!fs.existsSync(path.resolve(productFile, '..'))) {
      fs.mkdirSync(path.resolve(productFile, '..'), { recursive: true });
    }
    fs.promises.writeFile(productFile, JSON.stringify(products));
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

export const updateProduct = (product: Product) => {
  const existingProductindex = products!.findIndex(prod => prod.id === product.id);

  if (existingProductindex !== -1) {
    products![existingProductindex] = product;
  }

  try {
    fs.promises.writeFile(productFile, JSON.stringify(products));
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};
