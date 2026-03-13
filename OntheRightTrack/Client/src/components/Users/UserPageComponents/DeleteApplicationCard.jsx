import { useState } from "react";

export default function DeleteApplicationCard({
  applications,
  onDelete,
  onCancel,
}) {
  const [selectedApplicationId, setSelectedApplicationId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedApplicationId) {
      alert("Please select a application to delete");
      return;
    }

    const applicationToDelete = applications.find(
      (a) => a.id === parseInt(selectedApplicationId),
    );
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${applicationToDelete.jobtitle}" at "${applicationToDelete.companyname}"? This action cannot be undone.`,
    );

    if (confirmDelete) {
      onDelete(selectedApplicationId);
    }
  }
  return (
    <div className="fixed inset-0 bg-lime-600 bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-stone-200 rounded-xl shadow-md p-8 w-full max-w-md ">
        <h2 className="flex justify-center text-shadow-lg text-2xl bg-lime-400 rounded-lg p-4 font-bold underline text-white mb-6">
          Delete Application
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Select the application to delete:</label>
            <select
              value={selectedApplicationId}
              onChange={(e) => setSelectedApplicationId(e.target.value)}
              className="bg-white w-full border-2 p-2"
            >
              <option value="">--Choose a application--</option>
              {applications?.map((application) => (
                <option key={application.id} value={application.id}>
                  {application.jobtitle} at {application.companyname}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-lime-400 border-2 shadow-md rounded-xl border-lime-500 text-black px-7 py-2 m-2 hover:bg-lime-600 hover:text-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!selectedApplicationId}
              className={`px-7 py-2 m-2 rounded-xl border-2 shadow-md transition${!selectedApplicationId ? "bg-gray-300 cursor-not-allowed" : "bg-lime-400 hover:bg-lime-600 hover:text-white"}`}
            >
              Delete Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
