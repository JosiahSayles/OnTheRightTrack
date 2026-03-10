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
    <section className="md:flex flex-row mx-10  ">
      <div className="md:text-lg font-semibold bg-lime-300 p-5 rounded-lg md:ml-6">
        <h3 className="font-bold underline md:text-2xl mb-6 text-lime-800">
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
      <div className="flex flex-col  items-center md:text-2xl bg-lime-300 p-5 my-2 rounded-lg md:ml-6">
        <h3 className="font-bold text-lime-900 md:mt-5 ">
          Current application Count:{" "}
        </h3>
        <h4 className="md:text-9xl text-4xl lg:mt-20"> {applicationsAdded}</h4>
      </div>
    </section>
  );
}
