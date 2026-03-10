import { useState } from "react";

export default function AllApplications({
  applications,
  onStatusChange,
  onEditApplication,
}) {
  const [expandedId, setExpandedId] = useState(null);

  function toggleExpand(applicationId) {
    setExpandedId(expandedId === applicationId ? null : applicationId);
  }

  return (
    <section className=" shadow-md bg-lime-500 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Active Applications
        </h2>
        <h2 className="text-xl font-bold text-slate-800">Status</h2>
      </div>
      {applications.map((application) => (
        <div
          key={application.id}
          className="border border-stone-300 shadow-md mb-2"
        >
          <div className="flex justify-between items-center p-3 bg-stone-300">
            <button
              onClick={() => toggleExpand(application.id)}
              className="flex-1 text-left font-semibold text-slate-900 hover:text-slate-600 transition flex items-center gap-2"
            >
              <span className="text-sm">
                {expandedId === application.id ? "▼" : "▶"}{" "}
                {application.jobtitle}, {application.companyname},{" "}
                {application.applicationdate}
              </span>
            </button>
            <button
              onClick={() => onStatusChange(application.id)}
              className="bg-blue-500 border border-blue-500 shadow-md text-white px-4 py-1 ml-4 hover:bg-slate-800 hover:text-white transition"
            >
              {application.applicationStatus}
            </button>
          </div>

          {expandedId === application.id && (
            <div className="p-4 border-t border-lime-800 shadow-md bg-lime-300">
              <p className="mb-2">
                <strong>Company:</strong>
                {application.companyname}
              </p>
              <p className="mb-2">
                <strong>Job Title:</strong>
                {application.jobtitle}
              </p>
              <p className="mb-2">
                <strong>location:</strong>
                {application.location}
              </p>
              <p className="mb-2">
                <strong>Application Date:</strong>
                {application.applicationdate}
              </p>
              <p className="mb-2">
                <strong>Status:</strong>
                {application.applicationStatus}
              </p>
              <p className="mb-2">
                <strong>Job URL :</strong>
                {application.joburl}
              </p>
              <p className="mb-2">
                <strong>Notes :</strong>
                {application.notes}
              </p>
              <button
                onClick={() => onEditApplication(application.id)}
                className="bg-lime-300 rounded-xl shadow-md border-lime-800 px-6 py-2 hover:bg-lime-600 hover:text-white transition "
              >
                Edit Application
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
