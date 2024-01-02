import { Brand } from "./utils/brand";

export type Approved<T> = Brand<T, "Approved">;

interface PurchaseDetails {
  item: string;
  price: number;
}

function assertAmount(
  details: PurchaseDetails
): asserts details is Approved<PurchaseDetails> {
  if (details.price > 1000) {
    throw new Error("Amount exceeds the max limit.");
  }
}

const processPurchase = (details: Approved<PurchaseDetails>) => {
  // submiting to backend logic...
};

const submitHandler = (details: PurchaseDetails) => {
  processPurchase(details); // This should error.

  assertAmount(details);
  processPurchase(details); // This should not error.
};
