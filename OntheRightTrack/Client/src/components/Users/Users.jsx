import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";

export default function Users() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [editAccount, setEditAccount] = useState(false);
  const [createApplication, setCreateApplication] = useState(false);
  const [deleteApplication, setDeleteApplication] = useState(false);
  const [editApplication, setEditApplication] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const applicationsAdded = applications.length;

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchData = async;
  });
  return (
    <>
      <section>
        <div>
          <h1>Welcome User</h1>
        </div>
      </section>
      <section>
        <div>
          <h2>Applications</h2>
        </div>
      </section>
      <section>
        <div>
          <h3>Manage your applications</h3>
        </div>
      </section>
    </>
  );
}
