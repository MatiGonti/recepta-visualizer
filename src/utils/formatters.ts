import type { Address } from "./types";

export function formatAddress(addr?: Address): string {
  if (!addr) return "";
  const parts: string[] = [];

  if (addr.country && addr.country !== "Polska" && addr.country !== "PL") {
    parts.push(addr.country);
  }

  if (addr.postalCode || addr.city) {
    parts.push(
      [addr.postalCode, addr.city].filter(Boolean).join(" ")
    );
  }

  const street: string[] = [];
  if (addr.streetName) street.push(addr.streetName);
  if (addr.houseNumber) street.push(addr.houseNumber);
  if (addr.unitID) street.push("m. " + addr.unitID);
  if (street.length > 0) parts.push(street.join(" "));

  return parts.join(", ");
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  if (dateStr.includes("-")) {
    const [y, m, d] = dateStr.split("-");
    return `${d}.${m}.${y}`;
  }
  return dateStr;
}

export function formatPesel(pesel?: string): string {
  if (!pesel) return "";
  return pesel;
}

export function getBirthDateFromPesel(pesel?: string): string {
  if (!pesel || pesel.length !== 11) return "";

  const yearPart = parseInt(pesel.substring(0, 2));
  let monthPart = parseInt(pesel.substring(2, 4));
  const day = pesel.substring(4, 6);

  let year: number;
  let month: number;

  if (monthPart > 80) {
    year = 1800 + yearPart;
    month = monthPart - 80;
  } else if (monthPart > 60) {
    year = 2200 + yearPart;
    month = monthPart - 60;
  } else if (monthPart > 40) {
    year = 2100 + yearPart;
    month = monthPart - 40;
  } else if (monthPart > 20) {
    year = 2000 + yearPart;
    month = monthPart - 20;
  } else {
    year = 1900 + yearPart;
    month = monthPart;
  }

  return `${day}.${String(month).padStart(2, "0")}.${year}`;
}
