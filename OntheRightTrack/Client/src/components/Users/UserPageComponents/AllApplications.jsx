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
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Active Applications
        </h2>
      </div>
      <div className="md:flex flex-wrap justify-center ">
        {applications?.map((application) => (
          <div
            key={application.id}
            className=" rounded-xl shadow-md mb-5 w-1/3 mx-2 "
          >
            <div className="flex justify-between items-center p-3 bg-stone-300 rounded-xl  ">
              <button
                onClick={() => toggleExpand(application.id)}
                className="flex-1 text-left font-semibold text-slate-900 hover:text-slate-600  transition flex items-center gap-2"
              >
                <span className="md:text-lg font-bold">
                  {expandedId === application.id ? "-" : "+"}{" "}
                  {application.jobtitle} for {application.companyname} on{" "}
                  {application.applicationdate.split("T")[0]}
                </span>
              </button>
              <button
                onClick={() => onStatusChange(application.id)}
                className="bg-lime-500  shadow-md text-white px-4 py-1 ml-4 hover:bg-lime-800 hover:text-white transition"
              >
                {application.status}
              </button>
            </div>

            {expandedId === application.id && (
              <div className="p-4 border-t border-lime-800 shadow-md bg-lime-300">
                <p className="mb-2">
                  <strong> 🏢 Company: </strong>
                  {application.companyname}
                </p>
                <p className="mb-2">
                  <strong> 💼 Job Title: </strong>
                  {application.jobtitle}
                </p>
                <p className="mb-2">
                  <strong> 📍 Location: </strong>
                  {application.location}
                </p>
                <p className="mb-2">
                  <strong> 📅 Application Date: </strong>
                  {application.applicationdate.split("T")[0]}
                </p>
                <p className="mb-2">
                  <strong> 🟢 Status: </strong>
                  {application.status}
                </p>
                <p className="mb-2">
                  <strong> 🔗 Job URL: </strong>
                  {application.joburl}
                </p>
                <p className="mb-2">
                  <strong> ✏ Notes: </strong>
                  {application.notes}
                </p>
                <button
                  onClick={() => onEditApplication(application.id)}
                  className="bg-lime-300 rounded-xl shadow-md border-lime-800 bg-lime-700 px-6 py-2 hover:bg-lime-600 text-white transition "
                >
                  Edit Application
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
