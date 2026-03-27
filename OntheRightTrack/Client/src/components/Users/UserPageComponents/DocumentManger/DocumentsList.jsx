import DocumentCard from "./DocumentCard";

export default function DocumentList({ documents, onDelete }) {
  if (!documents.length) return <p className="">No documents uploaded yet.</p>;

  return (
    <div className="flex ">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} doc={doc} onDelete={onDelete} />
      ))}
    </div>
  );
}
