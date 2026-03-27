import { useEffect, useState, useCallback } from "react";
import UploadDocumentForm from "./UploadDocumentForm.jsx";
import DocumentList from "./DocumentsList.jsx";
import { useApi } from "../../../API/APIContext.jsx";

export default function DocumentManager() {
  const [documents, setDocuments] = useState([]);
  const { request } = useApi();

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
    <div className="space-y-6">
      <UploadDocumentForm onUpload={fetchDocuments} />
      <DocumentList documents={documents} onDelete={fetchDocuments} />
    </div>
  );
}
