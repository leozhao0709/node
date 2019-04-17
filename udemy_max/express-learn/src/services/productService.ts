import fs from 'fs';
import path from 'path';
import { Product } from '../models/product';

const productFile = path.resolve(path.dirname(process.mainModule!.filename), 'data', 'product.json');

export const fetchAllProducts = async (): Promise<Product[]> => {
  // return new Promise<Product[]>((res, rej) => {
  //   let products: Product[];
  //   fs.readFile(productFile, (err, content) => {
  //     if (err) {
  //       products = [];
  //     } else {
  //       products = JSON.parse(content.toString());
  //     }
  //     res(products);
  //   });
  // });

  try {
    const fileContent = await fs.promises.readFile(productFile);
    return JSON.parse(fileContent.toString());
  } catch (error) {
    return [];
  }
};

export const saveProduct = async (product: Product) => {
  // return fetchAllProducts()
  //   .then(products => {
  //     products.push(product);
  //     return products;
  //   })
  //   .then(products => {
  //     return new Promise((res, rej) => {
  //       if (!fs.existsSync(productFile)) {
  //         fs.mkdirSync(path.resolve(productFile, '..'));
  //       }
  //       fs.writeFile(productFile, JSON.stringify(products), err => {
  //         if (err) {
  //           rej(err);
  //         } else {
  //           res();
  //         }
  //       });
  //     });
  //   });
  const products = await fetchAllProducts();
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
