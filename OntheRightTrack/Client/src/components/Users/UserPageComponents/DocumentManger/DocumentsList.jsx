import DocumentCard from "./DocumentCard";
import DocumentDropdown from "./DocumentDropdown";

export default function DocumentList({ documents, onDelete }) {
  if (!documents.length) return <p className="">No documents uploaded yet.</p>;

  return (
    <div className="flex flex-wrap">
      {documents.map((doc) => (
        <DocumentDropdown
          key={doc.id}
          documents={documents}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
