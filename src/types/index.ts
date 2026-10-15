export type Role = "admin" | "user";
export type CarStatus = "available" | "rented" | "maintenance" | "inactive";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "ongoing"
  | "completed"
  | "rejected"
  | "cancelled";
export type Transmission = "automatic" | "manual";
export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid";

export interface User {
  id: string; // Firebase Auth UID
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: Role;
  createdAt: string;
}

export interface Car {
  id: string;

  name: string;
  brand: string;
  model: string;
  year: number;

  type: string;
  transmission: Transmission;
  fuelType: FuelType;

  seats: number;

  pricePerDay: number;

  licensePlate: string;

  description: string;
  image: string[];
  status: CarStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;

  startDate: string;
  endDate: string;

  pricePerDay: number;
  totalDays: number;
  totalPrice: number;

  status: BookingStatus;

  createdAt: string;
}
