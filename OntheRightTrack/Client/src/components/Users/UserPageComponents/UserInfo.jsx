export default function UserInfo({ user, applicationsAdded }) {
  if (!user) {
    return (
      <div>
        <h3>Account Information</h3>
        <p>Loading account...</p>
      </div>
    );
  }

  return (
    <div className="flex-col">
      <section className="md:flex flex-row mx-10  ">
        <div className="md:text-lg font-semibold bg-lime-300 p-5 my-2 rounded-lg md:ml-6">
          <h3 className="font-bold  md:text-2xl mb-6 text-lime-900">
            Account Infromation
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
        <div className="flex flex-col  items-center justify-center md:text-2xl bg-lime-300 p-5 my-2 rounded-lg md:ml-6">
          <h3 className="font-bold text-lime-900 md:mt-5  ">
            Current application Count:{" "}
          </h3>
          <h4 className="lg:text-9xl text-3xl pb-5 lg:mt-10">
            {" "}
            {applicationsAdded}
          </h4>
        </div>
      </section>
      <hr className="h-[1px] mt-5 mb-3 border-0 mx-10 bg-lime-400" />
      <section className="flex justify-evenly text-white ">
        <div className="bg-lime-700 flex flex-col  mt-2 w-1/3 px-6 pt-2 rounded-lg">
          {/* <form onSubmit={handleSubmit}> */}
          {/* <form>
            <div>
              <label> Resume's </label>
              <select value className="bg-white w-full border-2 p-2">
                <option value="">Choose Resume</option>
                {resumes?.map((resume) => (
                  <option key={resume.id} value={resume.id}>
                    {resume.title}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="bg-lime-700 flex-col mt-2 w-1/3 px-6 pt-2 rounded-lg">
          <form>
            <div>
              <label> Cover Letter's </label>
              <select value className="bg-white w-full border-2 p-2">
                <option value="">Choose Cover Letter</option>
                {coverLetter?.map((coverLetter) => (
                  <option key={coverLetter.id} value={coverLetter.id}>
                    {coverLetter.title}
                  </option>
                ))}
              </select>
            </div>
          </form> */}
        </div>
      </section>
    </div>
  );
}
