import { expect, it } from "vitest";

export interface Person {
  id: string;
}

interface Customer extends Person {
  type: "customer";
  loyaltyPoints: number;
}

interface Employee extends Person {
  type: "employee";
  jobTitle: string;
}

//💡: Keep in mind that TypeScript cannot use arrow Functions for assertions.
function assertPersonIsEmployee(
  person: Employee | Customer
): asserts person is Employee {
  if (person.type !== "employee") {
    throw new Error("Not an employee");
  }
}

const myFunc = (person: Employee | Customer) => {
  assertPersonIsEmployee(person);
  person.jobTitle; // Should see the Employee properties after assertion.
};
