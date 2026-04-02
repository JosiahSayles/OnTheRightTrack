import { useState, useEffect } from "react";

export default function DocumentDropdown({ documents, onDelete }) {
  const [selectedDoc, setSelectedDoc] = useState("");

  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.type]) acc[doc.type] = [];
    acc[doc.type].push(doc);
    return acc;
  }, {});

  const docMap = Object.values(groupedDocs).flat();

  const selected = docMap.find((d) => d.id === Number(selectedDoc));

  async function handleDelete() {
    if (!selected) return;

    onDelete(selected.id);
    setSelectedDoc("");
  }

  useEffect(() => {
    if (selectedDoc && !documents.find((d) => d.id === Number(selectedDoc))) {
      setSelectedDoc("");
    }
  }, [documents]);

  return (
    <div className="p-4 bg-gray-300 rounded-xl space-y-4 w-1/2">
      <select
        className="p-2 rounded border w-full bg-white"
        value={selectedDoc}
        onChange={(e) => setSelectedDoc(e.target.value)}
      >
        <option value="">Select a document</option>

        {Object.entries(groupedDocs).map(([type, docs]) => (
          <optgroup key={type} label={type}>
            {docs.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.filename}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {selected && (
        <div className="border p-3 rounded bg-white">
          <p className="font-semibold">{selected.filename}</p>
          <p className="text-sm">{selected.type}</p>
          <p className="text-xs">
            {new Date(selected.created_at).toLocaleDateString()}
          </p>

          <div className="flex gap-3 mt-2">
            <a
              href={selected.fileurl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View
            </a>

            <button onClick={handleDelete} className="text-lime-600 ">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
