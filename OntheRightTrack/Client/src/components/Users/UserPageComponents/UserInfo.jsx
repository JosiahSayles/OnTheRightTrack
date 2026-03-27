import { useState } from "react";
import DocumentManager from "./DocumentManger/DocumentManger";

export default function UserInfo({ user, applicationsAdded, documents = [] }) {
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedCoverLetter, setSelectedCoverLetter] = useState("");

  if (!user) {
    return (
      <div>
        <h3>Account Information</h3>
        <p>Loading account...</p>
      </div>
    );
  }

  const resumes = documents.filter((d) => d.type === "resume");
  const coverLetters = documents.filter((d) => d.type === "cover_letter");

  return (
    <div className="flex-col">
      <section className="md:flex flex-row mx-10">
        <div className="md:text-lg font-semibold bg-lime-300 p-5 my-2 rounded-lg md:ml-6">
          <h3 className="font-bold md:text-2xl mb-6 text-lime-900">
            Account Information
          </h3>
          <p>
            <strong>Firstname:</strong> {user.firstname}
          </p>
          <p>
            <strong>Lastname:</strong> {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center md:text-2xl bg-lime-300 p-5 my-2 rounded-lg md:ml-6">
          <h3 className="font-bold text-lime-900 md:mt-5">
            Current Application Count:
          </h3>
          <h4 className="lg:text-9xl text-3xl pb-5 lg:mt-10">
            {applicationsAdded}
          </h4>
        </div>
      </section>

      <hr className="h-[1px] mt-5 mb-3 border-0 mx-10 bg-lime-400" />

      <section className="mx-10">
        <h3 className="text-2xl font-bold text-lime-600 mb-4">Documents</h3>

        <DocumentManager documents={documents} />
      </section>
    </div>
  );
}
