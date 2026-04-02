import { useState } from "react";
import { useApi } from "../../../API/APIContext";
const API = import.meta.env.VITE_API_URL;

export default function UploadDocumentForm({ onUpload }) {
  const { request } = useApi();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    type: "resume",
    filename: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", form.type);
    formData.append("filename", form.filename);

    await request("/documents", {
      method: "POST",
      body: formData,
    });

    onUpload();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 ">
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="bg-lime-600 p-1 rounded-lg font-semibold"
      >
        <option value="resume" className="">
          Resume
        </option>
        <option value="cover_letter">Cover Letter</option>
      </select>

      <input
        placeholder="File name"
        value={form.filename}
        onChange={(e) => setForm({ ...form, filename: e.target.value })}
        className="bg-white p-1 mx-2"
      />

      <input
        type="file"
        name="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="bg-lime-300 text-lg text-lime-950 shadow-lg rounded-lg hover:bg-lime-800 hover:text-lime-300  border hover:border-lime-300 px-2"
      />

      <button
        type="submit"
        className="flex bg-lime-300 text-lg text-lime-950 shadow-lg rounded-lg hover:bg-lime-800 hover:text-lime-300 p-2 border hover:border-lime-300  "
      >
        Upload
      </button>
    </form>
  );
}
