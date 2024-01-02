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

function assertPersonIsEmployee(person: Employee | Customer) {
  if (person.type !== "employee") {
    throw new Error("Not an employee");
  }
}

const myFunc = (person: Employee | Customer) => {
  assertPersonIsEmployee(person);
  person.jobTitle; // Should see the Employee properties after assertion.
};
