import React from "react";

export default function UpcomingInterviewsCard({ applications }) {
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
      <div className="text-white">
        {interviewingJobs.length > 0 ? (
          interviewingJobs.map((application) => (
            <div
              key={application.id}
              className="bg-lime-900 rounded-xl p-10 mt-8 mx-5  shadow-lg "
            >
              <h3 className="font-semibold text-2xl underline ">
                {application.companyname}
              </h3>
              <p className="font-semibold text-lg">{application.jobtitle}</p>
              <p className="font-semibold">
                Date applied: {formatDate(application.applicationdate)}
              </p>
              <p className="font-semibold"> Notes: </p>
              <p> {application.notes || "TBD"}</p>
            </div>
          ))
        ) : (
          <p className="mt-10 text-xl">No upcoming interviews...</p>
        )}
      </div>
    </section>
  );
}
