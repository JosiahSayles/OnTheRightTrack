const API = import.meta.env.VITE_API_URL;
import { useApi } from "../../../API/APIContext";

export default function DocumentCard({ doc, onDelete }) {
  const { request } = useApi();
  async function handleDelete() {
    await request(`/documents/${doc.id}`, {
      method: "DELETE",
    });

    onDelete();
  }

  return (
    <div className="border p-4 rounded-xl flex justify-between items-center">
      <div>
        <p className="font-semibold ">{doc.filename}</p>
        <p className="text-sm text-gray-500">{doc.type}</p>
        <p className="text-xs text-gray-400">
          {new Date(doc.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-2">
        <a
          href={doc.fileurl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View
        </a>

        <button onClick={handleDelete} className="text-red-500 cursor:pointer">
          Delete
        </button>
      </div>
    </div>
  );
}
