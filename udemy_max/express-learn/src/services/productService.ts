import fs from 'fs';
import path from 'path';
import { Product } from '../models/product';
import { deleteProductFromCart } from './cartService';

const productFile = path.resolve(path.dirname(process.mainModule!.filename), 'data', 'product.json');

const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const fileContent = await fs.promises.readFile(productFile);
    return JSON.parse(fileContent.toString());
  } catch (error) {
    return [];
  }
};

const saveProductsToFile = async () => {
  try {
    if (!fs.existsSync(path.resolve(productFile, '..'))) {
      fs.mkdirSync(path.resolve(productFile, '..'), { recursive: true });
    }
    await fs.promises.writeFile(productFile, JSON.stringify(products));
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
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
  await saveProductsToFile();
};

export const updateProduct = async (product: Product) => {
  const existingProductindex = products!.findIndex(prod => prod.id === product.id);

  if (existingProductindex !== -1) {
    products![existingProductindex] = product;
  }

  await saveProductsToFile();
};

export const deleteProductById = async (productId: string) => {
  const product = getProductById(productId);
  if (product) {
    deleteProductFromCart(product);
  }
  products = products!.filter(prod => prod.id !== productId);
  await saveProductsToFile();
};
