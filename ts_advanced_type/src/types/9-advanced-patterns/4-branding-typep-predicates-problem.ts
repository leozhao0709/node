import { Brand } from "./utils/brand";

export type Approved<T> = Brand<T, "Approved">;

interface PurchaseDetails {
  item: string;
  price: number;
}

const isPurchaseApproved = (details: PurchaseDetails) => {
  if (details.price > 1000) {
    return false;
  }
  return true;
};

const processPurchase = (details: Approved<PurchaseDetails>) => {
  // submiting to backend logic...
};

/*
  Your Job:
  Update isPurchaseApproved function so the following cases pass. 
*/

const submitHandler = (details: PurchaseDetails) => {
  if (isPurchaseApproved(details)) {
    processPurchase(details); // This should not error.
  }
  processPurchase(details); // This should error.
};
