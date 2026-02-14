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
    <div>
      <h3>Account Infromation</h3>
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
        <strong>Application Count:</strong> {applicationsAdded}
      </p>
    </div>
  );
}
