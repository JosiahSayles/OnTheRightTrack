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
    <section>
      <div>
        <h2>Active Applications</h2>
        <h2>Status</h2>
      </div>
      {applications.map((application) => (
        <div key={application.id}>
          <button onClick={() => toggleExpand(application.id)} className="">
            <span className="">
              {expandedId === application.id ? "▼" : "▶"} {application.jobtitle}
              , {application.companyname}
            </span>
          </button>
          <button onClick={() => onStatusChange(application.id)} className="">
            {application.applicationStatus}
          </button>
        </div>
      ))}
    </section>
  );
}
