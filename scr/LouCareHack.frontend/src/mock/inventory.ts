import { Unit } from "@/types/inventory";

export const mockUnits: Unit[] = [
  {
    id: "1",
    address: "123 Main Street",
    city: "Louisville",
    state: "KY",
    zip: "40202",
    type: "Apartment",
    capacity: 2,
    unitStatusId: "1",
    unitStatusName: "Available",
    isActive: true,
    createAt: new Date().toISOString()
  },
  {
    id: "2",
    address: "456 Oak Avenue",
    city: "Louisville",
    state: "KY",
    zip: "40203",
    type: "House",
    capacity: 4,
    unitStatusId: "2",
    unitStatusName: "Occupied",
    isActive: true,
    createAt: new Date().toISOString()
  },
  {
    id: "3",
    address: "789 Pine Road",
    city: "Louisville",
    state: "KY",
    zip: "40204",
    type: "Studio",
    capacity: 1,
    unitStatusId: "3",
    unitStatusName: "Maintenance",
    isActive: true,
    createAt: new Date().toISOString()
  },
  {
    id: "4",
    address: "321 Elm Street",
    city: "Louisville",
    state: "KY",
    zip: "40205",
    type: "Apartment",
    capacity: 3,
    unitStatusId: "1",
    unitStatusName: "Available",
    isActive: true,
    createAt: new Date().toISOString()
  },
  {
    id: "5",
    address: "654 Maple Lane",
    city: "Louisville",
    state: "KY",
    zip: "40206",
    type: "House",
    capacity: 5,
    unitStatusId: "2",
    unitStatusName: "Occupied",
    isActive: true,
    createAt: new Date().toISOString()
  }
];
