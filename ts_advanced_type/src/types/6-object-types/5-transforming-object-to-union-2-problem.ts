export interface VehicleBrands {
  car: "Camaro";
  bicycle: "GT";
  scooter: "Askoll";
}

type TransformedVehicleBrands = unknown;
// "car:Camaro" | "bicycle:GT" | "scooter:Askoll"
