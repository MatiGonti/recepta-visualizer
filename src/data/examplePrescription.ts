export const EXAMPLE_PRESCRIPTION_XML = `<?xml version="1.0" encoding="UTF-8"?>
<ClinicalDocument xmlns="urn:hl7-org:v3" xmlns:extPL="http://www.csioz.gov.pl/xsd/extPL/r2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="extPL:ClinicalDocument">
\t<typeId extension="POCD_HD000040" root="2.16.840.1.113883.1.3"/>
\t<templateId root="2.16.840.1.113883.3.4424.13.10.1.26" extension="1.3.1"/>
\t<id extension="0000000000001234" root="2.16.840.1.113883.3.4424.7.2" displayable="true"/>
\t<code code="57833-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Prescription for medication">
\t\t<translation code="04.01" codeSystem="2.16.840.1.113883.3.4424.11.1.32" codeSystemName="KLAS_DOK_P1" displayName="Recepta"/>
\t</code>
\t<title>Recepta</title>
\t<effectiveTime value="20250315"/>
\t<confidentialityCode code="N" codeSystem="2.16.840.1.113883.5.25"/>
\t<languageCode code="pl-PL"/>
\t<setId extension="REC-2025-0001234" root="2.16.840.1.113883.3.4424.7.2.1"/>
\t<versionNumber value="1"/>
\t<recordTarget>
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.23"/>
\t\t<patientRole>
\t\t\t<id extension="00112345" root="2.16.840.1.113883.3.4424.2.7.0.17.1" displayable="false"/>
\t\t\t<id extension="90010112345" root="2.16.840.1.113883.3.4424.1.1.616" displayable="true"/>
\t\t\t<addr>
\t\t\t\t<country>Polska</country>
\t\t\t\t<city>Warszawa</city>
\t\t\t\t<postalCode>03-134</postalCode>
\t\t\t\t<streetName>Odkryta</streetName>
\t\t\t\t<houseNumber>41</houseNumber>
\t\t\t\t<unitID>12</unitID>
\t\t\t</addr>
\t\t\t<patient>
\t\t\t\t<name>
\t\t\t\t\t<given>Jan</given>
\t\t\t\t\t<given>Franciszek</given>
\t\t\t\t\t<family>Kowalski</family>
\t\t\t\t</name>
\t\t\t\t<administrativeGenderCode code="M" codeSystem="2.16.840.1.113883.5.1"/>
\t\t\t\t<birthTime value="19900101"/>
\t\t\t</patient>
\t\t</patientRole>
\t</recordTarget>
\t<author>
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.79"/>
\t\t<functionCode code="LEK" codeSystem="2.16.840.1.113883.3.4424.11.3.18" displayName="Lekarz"/>
\t\t<time value="20250315"/>
\t\t<assignedAuthor>
\t\t\t<id extension="7724513" root="2.16.840.1.113883.3.4424.1.6.2" displayable="true"/>
\t\t\t<code code="0731" codeSystem="2.16.840.1.113883.3.4424.11.3.3" displayName="Neurologia"/>
\t\t\t<assignedPerson>
\t\t\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.1"/>
\t\t\t\t<name>
\t\t\t\t\t<prefix>lek.</prefix>
\t\t\t\t\t<given>Piotr</given>
\t\t\t\t\t<family>Nowak</family>
\t\t\t\t</name>
\t\t\t</assignedPerson>
\t\t\t<representedOrganization>
\t\t\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.18"/>
\t\t\t\t<id extension="2004-09" root="2.16.840.1.113883.3.4424.2.3.3" displayable="true"/>
\t\t\t\t<name>Poradnia neurologiczna</name>
\t\t\t\t<telecom use="PUB" value="tel:22-1111123"/>
\t\t\t\t<addr>
\t\t\t\t\t<postalCode>00-950</postalCode>
\t\t\t\t\t<city>Warszawa</city>
\t\t\t\t\t<streetName>Marszałkowska</streetName>
\t\t\t\t\t<houseNumber>320</houseNumber>
\t\t\t\t</addr>
\t\t\t\t<asOrganizationPartOf>
\t\t\t\t\t<wholeOrganization>
\t\t\t\t\t\t<id extension="11223344901234" root="2.16.840.1.113883.3.4424.2.2.2" displayable="true"/>
\t\t\t\t\t\t<name>Szpital Kliniczny</name>
\t\t\t\t\t\t<asOrganizationPartOf>
\t\t\t\t\t\t\t<wholeOrganization>
\t\t\t\t\t\t\t\t<id extension="2004" root="2.16.840.1.113883.3.4424.2.3.1" displayable="true"/>
\t\t\t\t\t\t\t\t<id extension="121212445" root="2.16.840.1.113883.3.4424.2.2.1" displayable="true"/>
\t\t\t\t\t\t\t\t<name>Szpital Kliniczny im. Prof. Orłowskiego</name>
\t\t\t\t\t\t\t</wholeOrganization>
\t\t\t\t\t\t</asOrganizationPartOf>
\t\t\t\t\t</wholeOrganization>
\t\t\t\t</asOrganizationPartOf>
\t\t\t</representedOrganization>
\t\t</assignedAuthor>
\t</author>
\t<custodian>
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.5"/>
\t\t<assignedCustodian>
\t\t\t<representedCustodianOrganization>
\t\t\t\t<id extension="1099" root="2.16.840.1.113883.3.4424.2.3.1" displayable="false"/>
\t\t\t</representedCustodianOrganization>
\t\t</assignedCustodian>
\t</custodian>
\t<legalAuthenticator>
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.6"/>
\t\t<time value="20250315"/>
\t\t<signatureCode code="S"/>
\t\t<assignedEntity>
\t\t\t<id extension="7724513" root="2.16.840.1.113883.3.4424.1.6.2" displayable="true"/>
\t\t</assignedEntity>
\t</legalAuthenticator>
\t<participant typeCode="HLD">
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.19"/>
\t\t<associatedEntity classCode="POLHOLD">
\t\t\t<scopingOrganization>
\t\t\t\t<id extension="07" root="2.16.840.1.113883.3.4424.3.1" displayable="true"/>
\t\t\t\t<name>Mazowiecki Oddział NFZ</name>
\t\t\t</scopingOrganization>
\t\t</associatedEntity>
\t</participant>
\t<component typeCode="COMP" contextConductionInd="true">
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.25"/>
\t\t<structuredBody classCode="DOCBODY" moodCode="EVN">
\t\t\t<component>
\t\t\t\t<section>
\t\t\t\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.3.1"/>
\t\t\t\t\t<title>Leki</title>
\t\t\t\t\t<text>
\t\t\t\t\t\t<table>
\t\t\t\t\t\t\t<thead>
\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t<th>Lek</th>
\t\t\t\t\t\t\t\t\t<th>Dawkowanie</th>
\t\t\t\t\t\t\t\t\t<th>Ilość</th>
\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t</thead>
\t\t\t\t\t\t\t<tbody>
\t\t\t\t\t\t\t\t<tr ID="SBADM_1">
\t\t\t\t\t\t\t\t\t<td>Rilutek 50mg tabl. powl. (56 tabl.)</td>
\t\t\t\t\t\t\t\t\t<td>2 x 1 tabl.</td>
\t\t\t\t\t\t\t\t\t<td>1 op. po 56 tabl.</td>
\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t</table>
\t\t\t\t\t</text>
\t\t\t\t\t<entry typeCode="DRIV">
\t\t\t\t\t\t<substanceAdministration classCode="SBADM" moodCode="RQO">
\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.4.1"/>
\t\t\t\t\t\t\t<text>
\t\t\t\t\t\t\t\t<reference value="#SBADM_1"/>
\t\t\t\t\t\t\t</text>
\t\t\t\t\t\t\t<consumable>
\t\t\t\t\t\t\t\t<manufacturedProduct>
\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.4.2"/>
\t\t\t\t\t\t\t\t\t<manufacturedMaterial>
\t\t\t\t\t\t\t\t\t\t<code code="100110151" codeSystem="2.16.840.1.113883.3.4424.6.1" displayName="Rilutek 50mg tabl. powl.">
\t\t\t\t\t\t\t\t\t\t\t<translation code="5909990339518" codeSystem="2.16.840.1.113883.6.69"/>
\t\t\t\t\t\t\t\t\t\t</code>
\t\t\t\t\t\t\t\t\t\t<name>Rilutek 50mg tabl. powl.</name>
\t\t\t\t\t\t\t\t\t\t<asContent>
\t\t\t\t\t\t\t\t\t\t\t<containerPackagedMedicine>
\t\t\t\t\t\t\t\t\t\t\t\t<capacityQuantity value="56" unit="tabl."/>
\t\t\t\t\t\t\t\t\t\t\t</containerPackagedMedicine>
\t\t\t\t\t\t\t\t\t\t</asContent>
\t\t\t\t\t\t\t\t\t</manufacturedMaterial>
\t\t\t\t\t\t\t\t</manufacturedProduct>
\t\t\t\t\t\t\t</consumable>
\t\t\t\t\t\t\t<entryRelationship typeCode="COMP">
\t\t\t\t\t\t\t\t<supply classCode="SPLY" moodCode="RQO">
\t\t\t\t\t\t\t\t\t<quantity value="1" unit="op."/>
\t\t\t\t\t\t\t\t</supply>
\t\t\t\t\t\t\t</entryRelationship>
\t\t\t\t\t\t\t<entryRelationship typeCode="COMP">
\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">
\t\t\t\t\t\t\t\t\t<code code="ODPLATNOSC" codeSystem="2.16.840.1.113883.3.4424.13.10.4" displayName="Odpłatność"/>
\t\t\t\t\t\t\t\t\t<value xsi:type="CE" code="100%" displayName="100%" codeSystem="2.16.840.1.113883.3.4424.11.4.1"/>
\t\t\t\t\t\t\t\t</observation>
\t\t\t\t\t\t\t</entryRelationship>
\t\t\t\t\t\t\t<precondition>
\t\t\t\t\t\t\t\t<criterion>
\t\t\t\t\t\t\t\t\t<code code="CITO" codeSystem="2.16.840.1.113883.3.4424.13.10.4" displayName="Cito"/>
\t\t\t\t\t\t\t\t</criterion>
\t\t\t\t\t\t\t</precondition>
\t\t\t\t\t\t</substanceAdministration>
\t\t\t\t\t</entry>
\t\t\t\t</section>
\t\t\t</component>
\t\t</structuredBody>
\t</component>
</ClinicalDocument>`;

export const EXAMPLE_PRESCRIPTION_SIMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<ClinicalDocument xmlns="urn:hl7-org:v3" xmlns:extPL="http://www.csioz.gov.pl/xsd/extPL/r2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="extPL:ClinicalDocument">
\t<typeId extension="POCD_HD000040" root="2.16.840.1.113883.1.3"/>
\t<templateId root="2.16.840.1.113883.3.4424.13.10.1.3" extension="1.3.1"/>
\t<id extension="0000000000005678" root="2.16.840.1.113883.3.4424.7.2" displayable="true"/>
\t<code code="57833-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Prescription for medication">
\t\t<translation code="04.01" codeSystem="2.16.840.1.113883.3.4424.11.1.32" codeSystemName="KLAS_DOK_P1" displayName="Recepta"/>
\t</code>
\t<title>Recepta</title>
\t<effectiveTime value="20250320"/>
\t<confidentialityCode code="N" codeSystem="2.16.840.1.113883.5.25"/>
\t<languageCode code="pl-PL"/>
\t<versionNumber value="1"/>
\t<recordTarget>
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.23"/>
\t\t<patientRole>
\t\t\t<id extension="85072012345" root="2.16.840.1.113883.3.4424.1.1.616" displayable="true"/>
\t\t\t<addr>
\t\t\t\t<country>Polska</country>
\t\t\t\t<city>Kraków</city>
\t\t\t\t<postalCode>30-001</postalCode>
\t\t\t\t<streetName>Floriańska</streetName>
\t\t\t\t<houseNumber>15</houseNumber>
\t\t\t\t<unitID>3</unitID>
\t\t\t</addr>
\t\t\t<patient>
\t\t\t\t<name>
\t\t\t\t\t<given>Anna</given>
\t\t\t\t\t<given>Maria</given>
\t\t\t\t\t<family>Wiśniewska</family>
\t\t\t\t</name>
\t\t\t\t<administrativeGenderCode code="F" codeSystem="2.16.840.1.113883.5.1"/>
\t\t\t\t<birthTime value="19850720"/>
\t\t\t</patient>
\t\t</patientRole>
\t</recordTarget>
\t<author>
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.79"/>
\t\t<functionCode code="LEK" codeSystem="2.16.840.1.113883.3.4424.11.3.18" displayName="Lekarz"/>
\t\t<time value="20250320"/>
\t\t<assignedAuthor>
\t\t\t<id extension="5567890" root="2.16.840.1.113883.3.4424.1.6.2" displayable="true"/>
\t\t\t<code code="0600" codeSystem="2.16.840.1.113883.3.4424.11.3.3" displayName="Choroby wewnętrzne"/>
\t\t\t<assignedPerson>
\t\t\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.1"/>
\t\t\t\t<name>
\t\t\t\t\t<prefix>lek. dent.</prefix>
\t\t\t\t\t<given>Damian</given>
\t\t\t\t\t<family>Kowalski</family>
\t\t\t\t</name>
\t\t\t</assignedPerson>
\t\t\t<representedOrganization>
\t\t\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.15"/>
\t\t\t\t<id extension="12345678" root="2.16.840.1.113883.3.4424.2.2.1" displayable="true"/>
\t\t\t\t<name>Prywatna Praktyka Lekarska Damian Kowalski</name>
\t\t\t\t<telecom use="PUB" value="tel:12-3456789"/>
\t\t\t\t<addr>
\t\t\t\t\t<postalCode>30-002</postalCode>
\t\t\t\t\t<city>Kraków</city>
\t\t\t\t\t<streetName>Grodzka</streetName>
\t\t\t\t\t<houseNumber>22</houseNumber>
\t\t\t\t</addr>
\t\t\t</representedOrganization>
\t\t</assignedAuthor>
\t</author>
\t<custodian>
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.5"/>
\t\t<assignedCustodian>
\t\t\t<representedCustodianOrganization>
\t\t\t\t<id extension="2099" root="2.16.840.1.113883.3.4424.2.3.1" displayable="false"/>
\t\t\t</representedCustodianOrganization>
\t\t</assignedCustodian>
\t</custodian>
\t<legalAuthenticator>
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.6"/>
\t\t<time value="20250320"/>
\t\t<signatureCode code="S"/>
\t\t<assignedEntity>
\t\t\t<id extension="5567890" root="2.16.840.1.113883.3.4424.1.6.2" displayable="true"/>
\t\t</assignedEntity>
\t</legalAuthenticator>
\t<participant typeCode="HLD">
\t\t<templateId root="2.16.840.1.113883.3.4424.13.10.2.19"/>
\t\t<associatedEntity classCode="POLHOLD">
\t\t\t<scopingOrganization>
\t\t\t\t<id extension="06" root="2.16.840.1.113883.3.4424.3.1" displayable="true"/>
\t\t\t\t<name>Małopolski Oddział NFZ</name>
\t\t\t</scopingOrganization>
\t\t</associatedEntity>
\t</participant>
\t<component typeCode="COMP" contextConductionInd="true">
\t\t<structuredBody classCode="DOCBODY" moodCode="EVN">
\t\t\t<component>
\t\t\t\t<section>
\t\t\t\t\t<title>Leki</title>
\t\t\t\t\t<text>
\t\t\t\t\t\t<table>
\t\t\t\t\t\t\t<thead>
\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t<th>Lek</th>
\t\t\t\t\t\t\t\t\t<th>Dawkowanie</th>
\t\t\t\t\t\t\t\t\t<th>Ilość</th>
\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t</thead>
\t\t\t\t\t\t\t<tbody>
\t\t\t\t\t\t\t\t<tr ID="SBADM_1">
\t\t\t\t\t\t\t\t\t<td>Enarenal 5mg tabl. (60 tabl.)</td>
\t\t\t\t\t\t\t\t\t<td>2 x 1 tabl.</td>
\t\t\t\t\t\t\t\t\t<td>1 op. po 60 tabl.</td>
\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t\t<tr ID="SBADM_2">
\t\t\t\t\t\t\t\t\t<td>Amlozek 5mg tabl. (30 tabl.)</td>
\t\t\t\t\t\t\t\t\t<td>1 x 1 tabl. rano</td>
\t\t\t\t\t\t\t\t\t<td>2 op. po 30 tabl.</td>
\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t</table>
\t\t\t\t\t</text>
\t\t\t\t\t<entry typeCode="DRIV">
\t\t\t\t\t\t<substanceAdministration classCode="SBADM" moodCode="RQO">
\t\t\t\t\t\t\t<text>
\t\t\t\t\t\t\t\t<reference value="#SBADM_1"/>
\t\t\t\t\t\t\t</text>
\t\t\t\t\t\t\t<consumable>
\t\t\t\t\t\t\t\t<manufacturedProduct>
\t\t\t\t\t\t\t\t\t<manufacturedMaterial>
\t\t\t\t\t\t\t\t\t\t<code code="100082291" codeSystem="2.16.840.1.113883.3.4424.6.1" displayName="Enarenal 5mg tabl."/>
\t\t\t\t\t\t\t\t\t\t<name>Enarenal 5mg tabl.</name>
\t\t\t\t\t\t\t\t\t</manufacturedMaterial>
\t\t\t\t\t\t\t\t</manufacturedProduct>
\t\t\t\t\t\t\t</consumable>
\t\t\t\t\t\t\t<entryRelationship typeCode="COMP">
\t\t\t\t\t\t\t\t<supply classCode="SPLY" moodCode="RQO">
\t\t\t\t\t\t\t\t\t<quantity value="1" unit="op."/>
\t\t\t\t\t\t\t\t</supply>
\t\t\t\t\t\t\t</entryRelationship>
\t\t\t\t\t\t\t<entryRelationship typeCode="COMP">
\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">
\t\t\t\t\t\t\t\t\t<code code="ODPLATNOSC" codeSystem="2.16.840.1.113883.3.4424.13.10.4" displayName="Odpłatność"/>
\t\t\t\t\t\t\t\t\t<value xsi:type="CE" code="R" displayName="R - ryczałt" codeSystem="2.16.840.1.113883.3.4424.11.4.1"/>
\t\t\t\t\t\t\t\t</observation>
\t\t\t\t\t\t\t</entryRelationship>
\t\t\t\t\t\t</substanceAdministration>
\t\t\t\t\t</entry>
\t\t\t\t\t<entry typeCode="DRIV">
\t\t\t\t\t\t<substanceAdministration classCode="SBADM" moodCode="RQO">
\t\t\t\t\t\t\t<text>
\t\t\t\t\t\t\t\t<reference value="#SBADM_2"/>
\t\t\t\t\t\t\t</text>
\t\t\t\t\t\t\t<consumable>
\t\t\t\t\t\t\t\t<manufacturedProduct>
\t\t\t\t\t\t\t\t\t<manufacturedMaterial>
\t\t\t\t\t\t\t\t\t\t<code code="100045678" codeSystem="2.16.840.1.113883.3.4424.6.1" displayName="Amlozek 5mg tabl."/>
\t\t\t\t\t\t\t\t\t\t<name>Amlozek 5mg tabl.</name>
\t\t\t\t\t\t\t\t\t</manufacturedMaterial>
\t\t\t\t\t\t\t\t</manufacturedProduct>
\t\t\t\t\t\t\t</consumable>
\t\t\t\t\t\t\t<entryRelationship typeCode="COMP">
\t\t\t\t\t\t\t\t<supply classCode="SPLY" moodCode="RQO">
\t\t\t\t\t\t\t\t\t<quantity value="2" unit="op."/>
\t\t\t\t\t\t\t\t</supply>
\t\t\t\t\t\t\t</entryRelationship>
\t\t\t\t\t\t\t<entryRelationship typeCode="COMP">
\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">
\t\t\t\t\t\t\t\t\t<code code="ODPLATNOSC" codeSystem="2.16.840.1.113883.3.4424.13.10.4" displayName="Odpłatność"/>
\t\t\t\t\t\t\t\t\t<value xsi:type="CE" code="B" displayName="B - bezpłatnie" codeSystem="2.16.840.1.113883.3.4424.11.4.1"/>
\t\t\t\t\t\t\t\t</observation>
\t\t\t\t\t\t\t</entryRelationship>
\t\t\t\t\t\t</substanceAdministration>
\t\t\t\t\t</entry>
\t\t\t\t</section>
\t\t\t</component>
\t\t</structuredBody>
\t</component>
</ClinicalDocument>`;
