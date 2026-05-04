import React from "react";

export default function UpcomingInterviewsCard({ applications, onUpdateDate }) {
  const interviewingJobs = applications.filter(
    (application) => application.status === "Interviewing",
  );
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <section className="flex-col flex items-center mt-10">
      <h2 className="md:text-4xl underline font-bold">Upcoming Interviews</h2>
      <div className="">
        {interviewingJobs.length > 0 ? (
          interviewingJobs.map((application) => (
            <div
              key={application.id}
              className="bg-lime-900 border-4 p-10 mt-8 mx-5  shadow-xl flex-row  "
            >
              <h3 className="font-semibold text-4xl underline mb-2 ">
                {application.companyname}
              </h3>
              <p className="font-semibold text-lg text-white">
                {application.jobtitle}
              </p>
              <p className="font-semibold text-white">
                Date applied: {formatDate(application.applicationdate)}
              </p>
              <p className="font-semibold text-white"> Notes: </p>
              <p className="font-semibold text-white">
                {" "}
                {application.notes || "TBD"}
              </p>
              <div className="flex-col flex justify-center items-center">
                <input
                  type="date"
                  className="mt-3 bg-white px-2  rounded-lg text-black font-semibold "
                  value={application.interviewdate || ""}
                  onChange={(e) => onUpdateDate(application.id, e.target.value)}
                />

                {application.interviewdate && (
                  <p className="text-white mt-2 md:text-2xl bg-lime-500 p-2 ">
                    {" "}
                    Interview Date: {formatDate(application.interviewdate)}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="mt-10 text-xl">No upcoming interviews...</p>
        )}
      </div>
    </section>
  );
}
