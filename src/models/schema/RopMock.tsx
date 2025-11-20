"use client";

import type { IRopSchema } from "../types/rop.types";

export const mock: IRopSchema[] = [
  {
    requestNo: "CNT-2025-0001",
    lpaNo: "R14031516G",
    firstName: "Juan",
    middleName: "D.",
    lastName: "Delacruz",
    birthDate: "10-22-2014",
    planType: "ST. DOROTHY",
    emailAddress: "juandela.cruz@gmail.com",
    mobileNo: "09981234567",
    lotNumber: "1234",
    street: "Mabini Street",
    province: "Cavite",
    city: "Dasmariñas",
    district: "District 1",
    zipCode: "4114",
    brangay: "San Agustin",
    ropSched: "1st",
    ropDate: "10-08-2025",
    totalAmt: "6000.00",
    payoutChannel: "GCash",
    payoutAccount: "09981234567",
    status: "Pending",
  },
  {
    requestNo: "CNT-2025-0001",
    lpaNo: "R14037513R",
    firstName: "Juan",
    middleName: "D.",
    lastName: "Delacruz",
    birthDate: "08-29-2014",
    planType: "ST. DOROTHY",
    emailAddress: "juandela.cruz@gmail.com",
    mobileNo: "09981234567",
    lotNumber: "56-B",
    street: "Rizal Avenue",
    province: "Laguna",
    city: "San Pablo",
    district: "District 2",
    zipCode: "4000",
    brangay: "Del Remedio",
    ropSched: "1st",
    ropDate: "10-08-2025",
    totalAmt: "6000.00",
    payoutChannel: "GCash",
    payoutAccount: "09981234567",
    status: "Pending",
  },
];
export const stepper = [
  {
    title: "Select Plan",
    description: "Select Plan",
  },
  {
    title: "Register Payout Channel",
    description: "Register Payout Channel ",
  },
  {
    title: "Review Details",
    description: "Review Details",
  },
];
