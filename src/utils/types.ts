export interface Address {
  country?: string;
  city?: string;
  postalCode?: string;
  streetName?: string;
  houseNumber?: string;
  unitID?: string;
}

export interface PatientData {
  givenNames: string[];
  familyName: string;
  pesel?: string;
  birthDate?: string;
  gender?: string;
  address?: Address;
  nfzBranch?: string;
  insuranceId?: string;
  additionalEntitlements?: { code: string; number?: string }[];
}

export interface AuthorData {
  prefix?: string;
  givenNames: string[];
  familyName: string;
  pwzNumber?: string;
  specialization?: string;
  functionCode?: string;
  phone?: string;
}

export interface OrganizationData {
  name?: string;
  address?: Address;
  regon?: string;
  nip?: string;
  phone?: string;
  partOfName?: string;
  partOfAddress?: Address;
}

export interface MedicationData {
  name: string;
  code?: string;
  form?: string;
  quantity?: string;
  quantityUnit?: string;
  dosageInstruction?: string;
  reimbursementLevel?: string;
  isCito?: boolean;
  isNZ?: boolean;
  ean?: string;
  packageQuantity?: string;
  packageUnit?: string;
  activeSubstanceName?: string;
  activeSubstanceStrength?: string;
}

export interface PrescriptionData {
  id?: string;
  accessCode?: string;
  title?: string;
  issueDate?: string;
  expiryDate?: string;
  prescriptionType?: string;
  patient: PatientData;
  author: AuthorData;
  organization: OrganizationData;
  medications: MedicationData[];
  nfzBranch?: string;
  documentCode?: string;
  isProAuctore?: boolean;
  isProFamiliae?: boolean;
  templateId?: string;
}
