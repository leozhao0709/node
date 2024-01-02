export interface VehicleBrands {
  car: "Camaro";
  bicycle: "GT";
  scooter: "Askoll";
}

type TransformedVehicleBrands = {
  [V in keyof VehicleBrands]: `${V}:${VehicleBrands[V]}`;
}[keyof VehicleBrands];
