import type { PrescriptionData } from "../utils/types";
import {
  formatAddress,
  formatDate,
  formatPesel,
  getBirthDateFromPesel,
} from "../utils/formatters";
import "./PrescriptionPrintout.css";

interface Props {
  data: PrescriptionData;
}

export function PrescriptionPrintout({ data }: Props) {
  const { patient, author, organization, medications } = data;

  const patientFullName = [
    ...patient.givenNames,
    patient.familyName,
  ].join(" ");

  const authorFullName = [
    author.prefix,
    ...author.givenNames,
    author.familyName,
  ]
    .filter(Boolean)
    .join(" ");

  const patientAddress = formatAddress(patient.address);
  const orgAddress = formatAddress(organization.address);
  const birthDate =
    formatDate(patient.birthDate) ||
    getBirthDateFromPesel(patient.pesel);

  const isPro = data.isProAuctore || data.isProFamiliae;

  return (
    <div className="prescription">
      <div className="prescription-inner">
        {/* Header */}
        <div className="prescription-header">
          <div className="header-left">
            <div className="prescription-title">
              {data.title || "Recepta"}
              {data.isProAuctore && (
                <span className="prescription-badge">pro auctore</span>
              )}
              {data.isProFamiliae && (
                <span className="prescription-badge">pro familiae</span>
              )}
            </div>
            {data.prescriptionType && (
              <div className="prescription-type">{data.prescriptionType}</div>
            )}
          </div>
          <div className="header-right">
            {data.issueDate && (
              <div className="issue-date">
                <span className="label">Data wystawienia:</span>{" "}
                {formatDate(data.issueDate)}
              </div>
            )}
            {data.expiryDate && (
              <div className="expiry-date">
                <span className="label">Data realizacji do:</span>{" "}
                {formatDate(data.expiryDate)}
              </div>
            )}
          </div>
        </div>

        <div className="prescription-divider" />

        {/* Patient + Doctor row */}
        <div className="prescription-parties">
          <div className="party patient-party">
            <div className="party-header">Pacjent</div>
            <div className="party-name">{patientFullName}</div>
            {patient.pesel && (
              <div className="party-detail">
                <span className="label">PESEL:</span>{" "}
                {formatPesel(patient.pesel)}
              </div>
            )}
            {birthDate && (
              <div className="party-detail">
                <span className="label">Data ur.:</span> {birthDate}
              </div>
            )}
            {patientAddress && (
              <div className="party-detail">
                <span className="label">Adres:</span> {patientAddress}
              </div>
            )}
            {(data.nfzBranch || patient.nfzBranch) && (
              <div className="party-detail">
                <span className="label">Oddział NFZ:</span>{" "}
                {data.nfzBranch || patient.nfzBranch}
              </div>
            )}
            {patient.additionalEntitlements &&
              patient.additionalEntitlements.length > 0 && (
                <div className="party-detail">
                  <span className="label">Uprawnienia dodatkowe:</span>{" "}
                  {patient.additionalEntitlements
                    .map((e) => e.code + (e.number ? ` (${e.number})` : ""))
                    .join(", ")}
                </div>
              )}
            {isPro && (
              <div className="party-detail pro-note">
                {data.isProAuctore
                  ? "Recepta wystawiona dla osoby wystawiającej"
                  : "Recepta wystawiona dla rodziny osoby wystawiającej"}
              </div>
            )}
          </div>

          <div className="party-separator" />

          <div className="party doctor-party">
            <div className="party-header">
              {author.functionCode || "Osoba wystawiająca"}
            </div>
            <div className="party-name">{authorFullName}</div>
            {author.pwzNumber && (
              <div className="party-detail">
                <span className="label">Nr PWZ:</span> {author.pwzNumber}
              </div>
            )}
            {author.specialization && (
              <div className="party-detail">
                <span className="label">Specjalizacja:</span>{" "}
                {author.specialization}
              </div>
            )}
            {author.phone && (
              <div className="party-detail">
                <span className="label">Tel.:</span> {author.phone}
              </div>
            )}

            {organization.name && (
              <>
                <div className="org-separator" />
                <div className="org-name">{organization.name}</div>
                {organization.partOfName && (
                  <div className="party-detail org-parent">
                    {organization.partOfName}
                  </div>
                )}
                {orgAddress && (
                  <div className="party-detail">
                    <span className="label">Adres:</span> {orgAddress}
                  </div>
                )}
                {organization.regon && (
                  <div className="party-detail">
                    <span className="label">REGON:</span>{" "}
                    {organization.regon}
                  </div>
                )}
                {organization.phone && (
                  <div className="party-detail">
                    <span className="label">Tel.:</span>{" "}
                    {organization.phone}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="prescription-divider" />

        {/* Medications */}
        <div className="medications-section">
          {medications.map((med, i) => (
            <div key={i} className="medication-item">
              <div className="medication-header">
                <span className="rp-marker">
                  Rp.
                  {med.isCito && <span className="cito-badge">(Cito)</span>}
                </span>
              </div>
              <div className="medication-body">
                <div className="medication-name">
                  {med.name}
                  {med.isNZ && (
                    <span className="nz-badge" title="Nie zamieniać">
                      {" "}
                      ( NZ )
                    </span>
                  )}
                </div>
                {med.form && (
                  <div className="medication-detail">
                    <span className="label">Postać:</span> {med.form}
                  </div>
                )}
                {med.code && (
                  <div className="medication-detail">
                    <span className="label">Kod:</span> {med.code}
                  </div>
                )}
                {(med.quantity || med.packageQuantity) && (
                  <div className="medication-detail">
                    <span className="label">Ilość:</span>{" "}
                    {med.quantity
                      ? `${med.quantity}${med.quantityUnit ? " " + med.quantityUnit : ""}`
                      : ""}
                    {med.packageQuantity
                      ? ` (${med.packageQuantity}${med.packageUnit ? " " + med.packageUnit : ""})`
                      : ""}
                  </div>
                )}
                {med.dosageInstruction && (
                  <div className="medication-dosage">
                    <span className="ds-marker">D.S.</span>{" "}
                    {med.dosageInstruction}
                  </div>
                )}
                {med.reimbursementLevel && (
                  <div className="medication-reimbursement">
                    <span className="label">Odpłatność:</span>{" "}
                    {med.reimbursementLevel}
                  </div>
                )}
                {med.ean && (
                  <div className="medication-detail">
                    <span className="label">EAN:</span> {med.ean}
                  </div>
                )}
              </div>
            </div>
          ))}
          {medications.length === 0 && (
            <div className="no-medications">
              Brak danych o lekach w dokumencie
            </div>
          )}
        </div>

        <div className="prescription-divider" />

        {/* Footer */}
        <div className="prescription-footer">
          {data.id && (
            <div className="footer-item">
              <span className="label">Nr recepty:</span> {data.id}
            </div>
          )}
          {data.accessCode && (
            <div className="footer-item">
              <span className="label">Kod dostępu:</span> {data.accessCode}
            </div>
          )}
          {data.templateId && (
            <div className="footer-item template-id">
              <span className="label">Szablon:</span> {data.templateId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
