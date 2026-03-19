import { useState } from "react";
import { parsePrescriptionXml } from "./utils/prescriptionParser";
import { PrescriptionPrintout } from "./components/PrescriptionPrintout";
import {
  EXAMPLE_PRESCRIPTION_XML,
  EXAMPLE_PRESCRIPTION_SIMPLE_XML,
} from "./data/examplePrescription";
import type { PrescriptionData } from "./utils/types";
import "./App.css";

function App() {
  const [xmlInput, setXmlInput] = useState("");
  const [prescription, setPrescription] = useState<PrescriptionData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  function handleVisualize() {
    setError(null);
    setPrescription(null);

    const trimmed = xmlInput.trim();
    if (!trimmed) {
      setError("Wklej XML recepty w pole powyżej.");
      return;
    }

    const result = parsePrescriptionXml(trimmed);
    if (!result) {
      setError(
        "Nie udało się sparsować XML. Upewnij się, że wklejony dokument jest poprawnym XML w formacie HL7 CDA."
      );
      return;
    }

    setPrescription(result);
  }

  function loadExample(type: "full" | "simple") {
    const xml =
      type === "full"
        ? EXAMPLE_PRESCRIPTION_XML
        : EXAMPLE_PRESCRIPTION_SIMPLE_XML;
    setXmlInput(xml);
    setError(null);

    const result = parsePrescriptionXml(xml);
    if (result) {
      setPrescription(result);
    }
  }

  function handleClear() {
    setXmlInput("");
    setPrescription(null);
    setError(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Wizualizator e-Recepty</h1>
        <p className="app-subtitle">
          Wklej XML e-recepty z systemu P1 (HL7 CDA) i wyświetl jako druk
          recepty
        </p>
      </header>

      <main className="app-main">
        <section className="input-section">
          <div className="input-toolbar">
            <span className="toolbar-label">XML e-Recepty</span>
            <div className="toolbar-actions">
              <button
                className="btn btn-example"
                onClick={() => loadExample("full")}
              >
                Przykład: recepta z refundacją
              </button>
              <button
                className="btn btn-example"
                onClick={() => loadExample("simple")}
              >
                Przykład: recepta z 2 lekami
              </button>
              {xmlInput && (
                <button className="btn btn-clear" onClick={handleClear}>
                  Wyczyść
                </button>
              )}
            </div>
          </div>
          <textarea
            className="xml-input"
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            placeholder={'Wklej tutaj XML e-recepty (format HL7 CDA)...\n\n<?xml version="1.0" encoding="UTF-8"?>\n<ClinicalDocument xmlns="urn:hl7-org:v3" ...>\n  ...\n</ClinicalDocument>'}
            spellCheck={false}
          />
          <button className="btn btn-primary" onClick={handleVisualize}>
            Wizualizuj receptę
          </button>
        </section>

        {error && (
          <div className="error-message">
            <span className="error-icon">!</span>
            {error}
          </div>
        )}

        {prescription && (
          <section className="output-section">
            <div className="output-header">
              <h2 className="output-title">Podgląd recepty</h2>
            </div>
            <PrescriptionPrintout data={prescription} />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Format: Polska Implementacja Krajowa HL7 CDA (PIK) — Centrum
          e-Zdrowia
        </p>
      </footer>
    </div>
  );
}

export default App;
