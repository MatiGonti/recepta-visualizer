import type {
  Address,
  AuthorData,
  MedicationData,
  OrganizationData,
  PatientData,
  PrescriptionData,
} from "./types";

const OID_PESEL = "2.16.840.1.113883.3.4424.1.1.616";
const OID_PWZ_LEK = "2.16.840.1.113883.3.4424.1.6.2";
const OID_PWZ_PIEL = "2.16.840.1.113883.3.4424.1.6.3";
const OID_PWZ_FARM = "2.16.840.1.113883.3.4424.1.6.1";
const OID_REGON = "2.16.840.1.113883.3.4424.2.2.1";
const OID_NIP = "2.16.840.1.113883.3.4424.2.2.3";
const OID_ACCESS_CODE = "2.16.840.1.113883.3.4424.0.12";
const OID_NFZ_BRANCH = "2.16.840.1.113883.3.4424.3.1";

function getElements(parent: Element, localName: string): Element[] {
  const results: Element[] = [];
  const children = parent.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (
      child.localName === localName ||
      child.tagName === localName ||
      child.tagName?.endsWith(":" + localName)
    ) {
      results.push(child);
    }
  }
  return results;
}

function getElement(parent: Element, localName: string): Element | null {
  return getElements(parent, localName)[0] || null;
}

function getDeepElement(parent: Element, ...path: string[]): Element | null {
  let current: Element | null = parent;
  for (const name of path) {
    if (!current) return null;
    current = getElement(current, name);
  }
  return current;
}

function getText(parent: Element, localName: string): string | undefined {
  const el = getElement(parent, localName);
  return el?.textContent?.trim() || undefined;
}

function parseAddress(addrEl: Element | null): Address | undefined {
  if (!addrEl) return undefined;
  return {
    country: getText(addrEl, "country"),
    city: getText(addrEl, "city"),
    postalCode: getText(addrEl, "postalCode"),
    streetName: getText(addrEl, "streetName"),
    houseNumber: getText(addrEl, "houseNumber"),
    unitID: getText(addrEl, "unitID"),
  };
}

function findIdByRoot(parent: Element, root: string): string | undefined {
  const ids = getElements(parent, "id");
  for (const id of ids) {
    if (id.getAttribute("root") === root) {
      return id.getAttribute("extension") || undefined;
    }
  }
  return undefined;
}

function parseHL7Date(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const v = value.replace(/\D/g, "");
  if (v.length >= 8) {
    return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
  }
  return value;
}

function parsePatient(doc: Element): PatientData {
  const recordTarget = getElement(doc, "recordTarget");
  const patientRole = recordTarget
    ? getElement(recordTarget, "patientRole")
    : null;
  const patient = patientRole ? getElement(patientRole, "patient") : null;
  const nameEl = patient ? getElement(patient, "name") : null;

  const givenNames: string[] = [];
  if (nameEl) {
    for (const g of getElements(nameEl, "given")) {
      if (g.textContent?.trim()) givenNames.push(g.textContent.trim());
    }
  }

  const familyName = nameEl ? getText(nameEl, "family") || "" : "";

  const pesel = patientRole ? findIdByRoot(patientRole, OID_PESEL) : undefined;

  const birthTimeEl = patient ? getElement(patient, "birthTime") : null;
  const birthDate = parseHL7Date(
    birthTimeEl?.getAttribute("value") || undefined
  );

  const genderEl = patient
    ? getElement(patient, "administrativeGenderCode")
    : null;
  const gender = genderEl?.getAttribute("code") || undefined;

  const addrEl = patientRole ? getElement(patientRole, "addr") : null;
  const address = parseAddress(addrEl);

  let nfzBranch: string | undefined;
  const additionalEntitlements: { code: string; number?: string }[] = [];

  const participants = getElements(doc, "participant");
  for (const part of participants) {
    const typeCode = part.getAttribute("typeCode");
    if (typeCode === "HLD") {
      const assocEntity = getElement(part, "associatedEntity");
      if (assocEntity) {
        const nfzId = findIdByRoot(assocEntity, OID_NFZ_BRANCH);
        if (nfzId) nfzBranch = nfzId;

        const scopingOrg = getElement(assocEntity, "scopingOrganization");
        if (scopingOrg) {
          const nfzIdFromOrg = findIdByRoot(scopingOrg, OID_NFZ_BRANCH);
          if (nfzIdFromOrg) nfzBranch = nfzIdFromOrg;
        }
      }
    }
  }

  return {
    givenNames,
    familyName,
    pesel,
    birthDate,
    gender,
    address,
    nfzBranch,
    additionalEntitlements:
      additionalEntitlements.length > 0 ? additionalEntitlements : undefined,
  };
}

function parseAuthor(doc: Element): AuthorData {
  const author = getElement(doc, "author");
  const assignedAuthor = author ? getElement(author, "assignedAuthor") : null;
  const assignedPerson = assignedAuthor
    ? getElement(assignedAuthor, "assignedPerson")
    : null;
  const nameEl = assignedPerson
    ? getElement(assignedPerson, "name")
    : null;

  const givenNames: string[] = [];
  if (nameEl) {
    for (const g of getElements(nameEl, "given")) {
      if (g.textContent?.trim()) givenNames.push(g.textContent.trim());
    }
  }

  const familyName = nameEl ? getText(nameEl, "family") || "" : "";
  const prefix = nameEl ? getText(nameEl, "prefix") : undefined;

  const pwzNumber = assignedAuthor
    ? findIdByRoot(assignedAuthor, OID_PWZ_LEK) ||
      findIdByRoot(assignedAuthor, OID_PWZ_PIEL) ||
      findIdByRoot(assignedAuthor, OID_PWZ_FARM)
    : undefined;

  const codeEl = assignedAuthor
    ? getElement(assignedAuthor, "code")
    : null;
  const specialization =
    codeEl?.getAttribute("displayName") || undefined;

  const functionCodeEl = author ? getElement(author, "functionCode") : null;
  const functionCode =
    functionCodeEl?.getAttribute("displayName") || undefined;

  let phone: string | undefined;
  if (assignedAuthor) {
    const telecoms = getElements(assignedAuthor, "telecom");
    for (const t of telecoms) {
      const val = t.getAttribute("value");
      if (val?.startsWith("tel:")) {
        phone = val.replace("tel:", "");
        break;
      }
    }
  }

  return {
    prefix,
    givenNames,
    familyName,
    pwzNumber,
    specialization,
    functionCode,
    phone,
  };
}

function parseOrganization(doc: Element): OrganizationData {
  const author = getElement(doc, "author");
  const assignedAuthor = author ? getElement(author, "assignedAuthor") : null;
  const repOrg = assignedAuthor
    ? getElement(assignedAuthor, "representedOrganization")
    : null;

  if (!repOrg) return {};

  const name = getText(repOrg, "name");
  const addrEl = getElement(repOrg, "addr");
  const address = parseAddress(addrEl);

  const regon = findIdByRoot(repOrg, OID_REGON);
  const nip = findIdByRoot(repOrg, OID_NIP);

  let phone: string | undefined;
  const telecoms = getElements(repOrg, "telecom");
  for (const t of telecoms) {
    const val = t.getAttribute("value");
    if (val?.startsWith("tel:")) {
      phone = val.replace("tel:", "");
      break;
    }
  }

  let partOfName: string | undefined;
  let partOfAddress: Address | undefined;

  const partOf = getElement(repOrg, "asOrganizationPartOf");
  if (partOf) {
    const wholeOrg = getElement(partOf, "wholeOrganization");
    if (wholeOrg) {
      partOfName = getText(wholeOrg, "name");

      const deepPartOf = getElement(wholeOrg, "asOrganizationPartOf");
      if (deepPartOf) {
        const deepWholeOrg = getElement(deepPartOf, "wholeOrganization");
        if (deepWholeOrg) {
          partOfName = getText(deepWholeOrg, "name") || partOfName;
          const deepRegon = findIdByRoot(deepWholeOrg, OID_REGON);
          if (deepRegon && !regon) {
            return {
              name,
              address,
              regon: deepRegon,
              nip,
              phone,
              partOfName,
              partOfAddress,
            };
          }
        }
      }

      const wholeAddr = getElement(wholeOrg, "addr");
      partOfAddress = parseAddress(wholeAddr);

      if (!regon) {
        const wholeRegon = findIdByRoot(wholeOrg, OID_REGON);
        if (wholeRegon) {
          return {
            name,
            address,
            regon: wholeRegon,
            nip,
            phone,
            partOfName,
            partOfAddress,
          };
        }
      }
    }
  }

  return { name, address, regon, nip, phone, partOfName, partOfAddress };
}

function parseMedications(doc: Element): MedicationData[] {
  const medications: MedicationData[] = [];

  const components = getAllDescendantsByName(doc, "component");
  for (const comp of components) {
    const section = getElement(comp, "section");
    if (!section) continue;

    const entries = getElements(section, "entry");
    for (const entry of entries) {
      const sa = getElement(entry, "substanceAdministration");
      if (!sa) continue;

      const med = parseSingleMedication(sa, section);
      if (med) medications.push(med);
    }
  }

  if (medications.length === 0) {
    const textSections = getAllDescendantsByName(doc, "section");
    for (const section of textSections) {
      const textEl = getElement(section, "text");
      if (textEl) {
        const tables = getElements(textEl, "table");
        for (const table of tables) {
          const tbody = getElement(table, "tbody");
          if (tbody) {
            const rows = getElements(tbody, "tr");
            for (const row of rows) {
              const cells = getElements(row, "td");
              if (cells.length > 0) {
                const name = cells[0]?.textContent?.trim() || "";
                if (name) {
                  medications.push({
                    name,
                    dosageInstruction: cells[1]?.textContent?.trim(),
                    quantity: cells[2]?.textContent?.trim(),
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  return medications;
}

function parseSingleMedication(
  sa: Element,
  section: Element
): MedicationData | null {
  const consumable = getElement(sa, "consumable");
  const manProduct = consumable
    ? getElement(consumable, "manufacturedProduct")
    : null;
  const manMaterial = manProduct
    ? getElement(manProduct, "manufacturedMaterial")
    : null;

  if (!manMaterial) return null;

  const codeEl = getElement(manMaterial, "code");
  const name =
    getText(manMaterial, "name") ||
    codeEl?.getAttribute("displayName") ||
    "Nieznany lek";
  const code = codeEl?.getAttribute("code") || undefined;

  const formCodeEl = getDeepElement(
    manMaterial,
    "formCode"
  );
  const form = formCodeEl?.getAttribute("displayName") || undefined;

  let dosageInstruction: string | undefined;
  const textEl = getElement(sa, "text");
  if (textEl) {
    const ref = getElement(textEl, "reference");
    if (ref) {
      const refValue = ref.getAttribute("value");
      if (refValue) {
        const sectionText = getElement(section, "text");
        if (sectionText) {
          const refId = refValue.replace("#", "");
          const target = findElementById(sectionText, refId);
          if (target) {
            dosageInstruction = target.textContent?.trim();
          }
        }
      }
    } else {
      dosageInstruction = textEl.textContent?.trim();
    }
  }

  let quantity: string | undefined;
  let quantityUnit: string | undefined;
  const quantityEl = getDeepElement(sa, "quantity");
  if (quantityEl) {
    quantity = quantityEl.getAttribute("value") || undefined;
    quantityUnit = quantityEl.getAttribute("unit") || undefined;
  }

  const supplyEl = getDeepElement(sa, "entryRelationship", "supply");
  if (supplyEl) {
    const supplyQuantity = getElement(supplyEl, "quantity");
    if (supplyQuantity) {
      quantity = supplyQuantity.getAttribute("value") || quantity;
      quantityUnit = supplyQuantity.getAttribute("unit") || quantityUnit;
    }
  }

  let reimbursementLevel: string | undefined;
  let isCito = false;
  let isNZ = false;

  const entryRels = getElements(sa, "entryRelationship");
  for (const rel of entryRels) {
    const obs = getElement(rel, "observation");
    if (obs) {
      const obsCode = getElement(obs, "code");
      const obsCodeValue = obsCode?.getAttribute("code");

      if (obsCodeValue === "ODPLATNOSC" || obsCodeValue === "REFUNDACJA") {
        const valueEl = getElement(obs, "value");
        reimbursementLevel =
          valueEl?.getAttribute("displayName") ||
          valueEl?.getAttribute("code") ||
          valueEl?.textContent?.trim();
      }

      if (obsCodeValue === "CITO") {
        isCito = true;
      }
    }

    const act = getElement(rel, "act");
    if (act) {
      const actCode = getElement(act, "code");
      if (actCode?.getAttribute("code") === "NZ") {
        isNZ = true;
      }
    }
  }

  const preconditions = getElements(sa, "precondition");
  for (const pre of preconditions) {
    const criterion = getElement(pre, "criterion");
    if (criterion) {
      const critCode = getElement(criterion, "code");
      if (critCode?.getAttribute("code") === "CITO") {
        isCito = true;
      }
    }
  }

  let packageQuantity: string | undefined;
  let packageUnit: string | undefined;
  if (manMaterial) {
    const containerPack = getElement(manMaterial, "asContent");
    if (containerPack) {
      const container = getElement(containerPack, "containerPackagedMedicine") ||
        getElement(containerPack, "containerPackagedProduct");
      if (container) {
        const capQ = getElement(container, "capacityQuantity");
        if (capQ) {
          packageQuantity = capQ.getAttribute("value") || undefined;
          packageUnit = capQ.getAttribute("unit") || undefined;
        }
      }
    }
  }

  let ean: string | undefined;
  if (codeEl) {
    const translations = getElements(codeEl, "translation");
    for (const t of translations) {
      const cs = t.getAttribute("codeSystem");
      if (cs === "2.16.840.1.113883.6.69" || cs?.includes("EAN") || cs?.includes("GTIN")) {
        ean = t.getAttribute("code") || undefined;
      }
    }
  }

  return {
    name,
    code,
    form,
    quantity,
    quantityUnit,
    dosageInstruction,
    reimbursementLevel,
    isCito,
    isNZ,
    ean,
    packageQuantity,
    packageUnit,
  };
}

function getAllDescendantsByName(parent: Element, name: string): Element[] {
  const results: Element[] = [];
  const stack: Element[] = [parent];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (
      current !== parent &&
      (current.localName === name || current.tagName?.endsWith(":" + name))
    ) {
      results.push(current);
    }
    for (let i = current.children.length - 1; i >= 0; i--) {
      stack.push(current.children[i]);
    }
  }
  return results;
}

function findElementById(parent: Element, id: string): Element | null {
  const stack: Element[] = [parent];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (
      current.getAttribute("ID") === id ||
      current.getAttribute("id") === id
    ) {
      return current;
    }
    for (let i = current.children.length - 1; i >= 0; i--) {
      stack.push(current.children[i]);
    }
  }
  return null;
}

export function parsePrescriptionXml(
  xmlString: string
): PrescriptionData | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, "text/xml");

    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      console.error("XML parse error:", errorNode.textContent);
      return null;
    }

    const root = doc.documentElement;
    if (!root) return null;

    const templateIdEl = getElement(root, "templateId");
    const templateId = templateIdEl?.getAttribute("root") || undefined;

    const docId = getElement(root, "id");
    const id = docId?.getAttribute("extension") || undefined;

    const title = getText(root, "title");

    const effectiveTimeEl = getElement(root, "effectiveTime");
    const issueDate = parseHL7Date(
      effectiveTimeEl?.getAttribute("value") || undefined
    );

    let accessCode: string | undefined;
    const ids = getElements(root, "id");
    for (const idEl of ids) {
      if (idEl.getAttribute("root") === OID_ACCESS_CODE) {
        accessCode = idEl.getAttribute("extension") || undefined;
      }
    }

    const patient = parsePatient(root);
    const authorData = parseAuthor(root);
    const organization = parseOrganization(root);
    const medications = parseMedications(root);

    let isProAuctore = false;
    let isProFamiliae = false;

    const titleLower = (title || "").toLowerCase();
    if (titleLower.includes("pro auctore")) isProAuctore = true;
    if (titleLower.includes("pro familiae")) isProFamiliae = true;

    const codeEl = getElement(root, "code");
    if (codeEl) {
      const translations = getElements(codeEl, "translation");
      for (const t of translations) {
        const dn = (t.getAttribute("displayName") || "").toLowerCase();
        if (dn.includes("pro auctore")) isProAuctore = true;
        if (dn.includes("pro familiae")) isProFamiliae = true;
      }
    }

    let nfzBranch = patient.nfzBranch;
    if (!nfzBranch) {
      const participants = getElements(root, "participant");
      for (const p of participants) {
        const ae = getElement(p, "associatedEntity");
        if (ae) {
          const so = getElement(ae, "scopingOrganization");
          if (so) {
            const nfzId = findIdByRoot(so, OID_NFZ_BRANCH);
            if (nfzId) nfzBranch = nfzId;
          }
        }
      }
    }

    let prescriptionType: string | undefined;
    if (codeEl) {
      const translations = getElements(codeEl, "translation");
      for (const t of translations) {
        prescriptionType = t.getAttribute("displayName") || undefined;
        if (prescriptionType) break;
      }
    }

    let expiryDate: string | undefined;
    const documentationOfs = getElements(root, "documentationOf");
    for (const dOf of documentationOfs) {
      const serviceEvent = getElement(dOf, "serviceEvent");
      if (serviceEvent) {
        const effTime = getElement(serviceEvent, "effectiveTime");
        if (effTime) {
          const high = getElement(effTime, "high");
          if (high) {
            expiryDate = parseHL7Date(high.getAttribute("value") || undefined);
          }
        }
      }
    }

    return {
      id,
      accessCode,
      title,
      issueDate,
      expiryDate,
      prescriptionType,
      patient,
      author: authorData,
      organization,
      medications,
      nfzBranch,
      documentCode: codeEl?.getAttribute("code") || undefined,
      isProAuctore,
      isProFamiliae,
      templateId,
    };
  } catch (err) {
    console.error("Failed to parse prescription XML:", err);
    return null;
  }
}
