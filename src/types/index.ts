import { Timestamp, FieldValue } from "firebase/firestore";

export type Role = "admin" | "user";
export type CarStatus = "active" | "maintenance" | "inactive";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "ongoing"
  | "completed"
  | "rejected"
  | "cancelled";
export type Transmission = "automatic" | "manual";
export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid";
export type CarType =
  | "sedan"
  | "suv"
  | "hatchback"
  | "coupe"
  | "convertible"
  | "wagon"
  | "van"
  | "pickup";
export interface UserDoc {
  id: string; // Firebase Auth UID
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: Role;
  createdAt: Timestamp;
}

export interface CarSlotDoc {
  carId: string;
  date: string;
  bookingId: string;
  userId: string;
  createdAt: Timestamp;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;

  type: CarType;
  transmission: Transmission;
  fuelType: FuelType;

  seats: number;

  pricePerDay: number;

  licensePlate: string;

  description: string;
  image: string[];
  status: CarStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  carSnapshot: {
    name: string;
    brand: string;
    thumbnail: string[];
    licensePlate: string;
    cancelReason?: string;
    cancelledBy?: Role;
  };

  startDate: string;
  endDate: string;
  slotDates: string[];

  pricePerDay: number;
  totalDays: number;
  totalPrice: number;

  status: BookingStatus;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
