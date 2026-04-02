import { useEffect, useState, useCallback } from "react";
import UploadDocumentForm from "./UploadDocumentForm.jsx";
import { useApi } from "../../../API/APIContext.jsx";
import DocumentDropdown from "./DocumentDropdown";

export default function DocumentManager() {
  const [documents, setDocuments] = useState([]);
  const { request } = useApi();

  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.type]) acc[doc.type] = [];
    acc[doc.type].push(doc);
    return acc;
  }, {});

  async function handleDeleteDoc(id) {
    await request(`/documents/${id}`, { method: "DELETE" });

    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  }

  const fetchDocuments = useCallback(async () => {
    try {
      const data = await request("/documents", {
        method: "GET",
      });

      setDocuments(data);
    } catch (err) {
      console.error(err);
    }
  }, [request]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <div className="space-y-6 lg:flex flex-row ">
      <UploadDocumentForm onUpload={fetchDocuments} />
      <DocumentDropdown documents={documents} onDelete={handleDeleteDoc} />
    </div>
  );
}
