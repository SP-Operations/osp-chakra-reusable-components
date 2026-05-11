/**
 * Planholder and Application types
 * Defines data structures for Life Plan applications
 */

export interface IPersonalInfo {
  firstName?: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  birthDate?: string;
  idType?: string;
  idNumber?: string;
  height?: number;
  weight?: number;
  gender?: string;
  civilStatus?: string;
  nationality?: string;
  mobileNumber?: string;
  emailAddress?: string;
  mailingAddress?: string;
  landLineNumber?: string;
}

export interface IAddress {
  lot: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  district?: string;
}

export interface IEmployment {
  occupation: string;
  employerName: string;
  employmentStatus: string;
  officeAddress: string;
  TIN: string;
  SSS: string;
  sourceOfIncome: string;
}

export interface IApplicationData {
  personalInfo: IPersonalInfo;
  address: IAddress;
  employment: IEmployment;
}
