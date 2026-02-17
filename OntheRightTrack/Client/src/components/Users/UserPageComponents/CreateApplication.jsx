import { useState } from "react";

export default function CreateApplication({ onSave, onCancel }) {
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
    e.prevenDefault();

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
    <div>
      <div>
        <h2>Add New Application</h2>
        <form action={handleSubmit}>
          <div>
            <label>
              Company name:{" "}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
          </div>
          <div>
            <label>
              Job Title:{" "}
              <input
                type="text"
                name="jobtitle"
                value={formData.jobtitle}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
          </div>
          <div>
            <label>
              Location (Remote, Hybrid, Onsite):{" "}
              <input
                type="text"
                name="company"
                value={formData.location}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
          </div>
          <div>
            <label>
              Application Date:{" "}
              <input
                type="date"
                name="applicationDate"
                value={formData.applicationdate}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
          </div>
          <div>
            <label>
              Status:{" "}
              <select
                name="status"
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
            <button type="submit">Add application</button>
            <button type="button" onClick={onCancel} className="">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
