import { useState, useEffect } from "react";

export default function AdminStats() {
  const [visits, setVisits] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Zähler aus lokaler Datei lesen (falls kein Backend verfügbar)
    fetch('/counter.json')
      .then((res) => {
        if (!res.ok) throw new Error('Zähler-Datei nicht gefunden');
        return res.json();
      })
      .then((data) => {
        setVisits(data.visits);
        setLoading(false);
      })
      .catch((err) => {
        setError('Zähler-Datei nicht gefunden. Bitte Backend starten.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Admin-Statistiken</h1>
        {loading ? (
          <p>Lade Daten...</p>
        ) : error ? (
          <p className="text-red-500">Fehler: {error}</p>
        ) : (
          <div>
            <p className="text-lg">
              <span className="font-semibold">Seitenaufrufe:</span> {visits}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}