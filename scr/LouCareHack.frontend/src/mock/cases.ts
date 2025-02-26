import { Case } from "@/types/case";

export const mockCases: Case[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: 45,
    ssn: "XXX-XX-1234",
    caseWorker: "Tim Hanks",
    assignUnit: "Waiting",
    status: "Pending",
    dateOfBirth: "1979-05-15",
    disability: "None",
    currentLocation: "Downtown Louisville",
    phoneNumber: "502-555-0123",
    veteranStatus: "yes",
    housingNeeds: "Requires ground floor access"
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Smith",
    age: 32,
    caseWorker: "Jim Bill",
    assignUnit: "Assigned",
    status: "Enrolled",
    dateOfBirth: "1992-08-21",
    currentLocation: "South End",
    phoneNumber: "502-555-0456",
    veteranStatus: "no",
    housingNeeds: "Family unit needed"
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    age: 58,
    caseWorker: "Frank Vars",
    assignUnit: "Waiting",
    status: "Pending",
    dateOfBirth: "1966-03-10",
    disability: "Mobility issues",
    currentLocation: "West End",
    veteranStatus: "yes",
    housingNeeds: "Wheelchair accessible"
  },
  {
    id: "4",
    firstName: "Maria",
    lastName: "Garcia",
    age: 28,
    caseWorker: "Yu Lee",
    assignUnit: "Assigned",
    status: "Enrolled",
    dateOfBirth: "1996-11-30",
    currentLocation: "East End",
    phoneNumber: "502-555-0789",
    veteranStatus: "no"
  },
  {
    id: "5",
    firstName: "Robert",
    lastName: "Wilson",
    age: 52,
    caseWorker: "Tim Hanks",
    assignUnit: "Waiting",
    status: "Closed",
    dateOfBirth: "1972-01-25",
    disability: "Visual impairment",
    currentLocation: "Highlands",
    phoneNumber: "502-555-0321",
    veteranStatus: "yes",
    housingNeeds: "Close to public transportation"
  }
];
