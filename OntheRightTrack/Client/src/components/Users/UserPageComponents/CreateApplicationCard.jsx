import { useState } from "react";

export default function CreateApplicationCard({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    company: "",
    jobtitle: "",
    location: "",
    applicationdate: "",
    status: "Applied",
    joburl: "",
    notes: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.company.trim()) {
      alert("Please enter a Company name");
      return;
    }

    if (!formData.jobtitle.trim()) {
      alert("Please enter a job title");
      return;
    }

    if (!formData.applicationdate.trim()) {
      alert("Please enter a application date");
      return;
    }
    onSave(formData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div className="fixed inset-0 bg-lime-900 bg-opacity-30 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-300 rounded-xl border-2 border-black p-8 w-full max-w-2xl my-8">
        <h2 className="flex justify-center text-shadow-lg text-2xl bg-lime-400 rounded-lg p-4 font-bold underline text-white mb-6 ">
          Add New Application
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>
              Company name:{" "}
              <input
                type="text"
                name="company"
                className="bg-white border-2 rounded-lg w-full px-2"
                value={formData.company}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Job Title:{" "}
              <input
                type="text"
                name="jobtitle"
                className="bg-white border-2 rounded-lg w-full px-2"
                value={formData.jobtitle}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Location (Remote, Hybrid, Onsite):{" "}
              <input
                type="text"
                name="location"
                className="bg-white border-2 rounded-lg w-full px-2"
                value={formData.location}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Application Date:{" "}
              <input
                type="date"
                name="applicationdate"
                className="bg-white border-2 rounded-lg px-2 w-full"
                value={formData.applicationdate}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Status:{" "}
              <select
                name="status"
                className="bg-white border-2 rounded-lg px-2 w-full"
                value={formData.status}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>
          </div>
          <div>
            <div className="mb-4">
              <label>
                Job URL:{" "}
                <input
                  type="url"
                  name="joburl"
                  className="bg-white border-2 rounded-lg w-full px-2"
                  value={formData.joburl}
                  onChange={handleChange}
                  style={{ maxWidth: "100%" }}
                />
              </label>
            </div>
            <div className="mb-4 ">
              <label>
                Notes :{" "}
                <textarea
                  name="notes"
                  className="bg-white border-2 rounded-lg w-full px-2 h-1/8 resize-none"
                  placeholder="Add notes here...."
                  value={formData.notes}
                  onChange={handleChange}
                  style={{ maxWidth: "100%" }}
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-lime-400 border-2 shadow-md rounded-xl border-lime-500 text-black px-7 py-2 m-2 hover:bg-lime-600 hover:text-white transition"
            >
              Add application
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-lime-400 border-2 shadow-md rounded-xl border-lime-500 text-black px-7 py-2 m-2 hover:bg-lime-600 hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
