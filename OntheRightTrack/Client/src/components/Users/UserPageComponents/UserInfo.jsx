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
      <p>
        <strong>Current application count: </strong> {applicationsAdded}
      </p>
    </div>
  );
}
