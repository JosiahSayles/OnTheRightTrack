import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";
import { useApi } from "../API/APIContext";

export default function Users() {
  const { token, logout } = useAuth();
  const { request } = useApi();
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

    const fetchData = async () => {
      try {
        const userData = await request("/users/me", { method: "GET" });
        setUser(userData);

        const applicationData = await request("/users/applications", {
          method: "GET",
        });
        const applicationWithStatus = applicationData.map((application) => ({
          ...application,
          appliactionStatus: application.applicationStatus || "Applied",
        }));
        setApplications(applicationWithStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);

        if (
          error.message.includes("401") ||
          error.message.includes("unathorized")
        ) {
          logout();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate, logout, request]);

  function handleEditAccount() {
    setEditAccount(true);
  }

  async function handleSaveAccount(updateInfo) {
    try {
      const udpdatedUser = await request(`/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedInfo),
      });

      setUser(udpdatedUser);
      setEditAccount(false);
    } catch (error) {
      console.error("Error updating account:", error);
      alert(`Failed to update account: ${error.message}`);
    }
  }

  function handleCanelEdit() {
    setEditAccount(false);
  }

  async function handleAvatarChange(imageUrl) {
    try {
      const updateUser = await request(`/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({ avatar: imageUrl }),
      });
      setUser(updateUser);
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert(`Failed to update avatar:${error.message}`);
    }
  }

  function handleCreateApplication() {
    setCreateApplication(true);
  }

  async function handleSaveApplication(applicationInfo) {
    try {
      const newApplication = await request("/users/applications", {
        method: "POST",
        body: JSON.stringify({ applicationInfo }),
      });
      setApplications((prev) => [...prev, newApplication]);
      setCreateApplication(false);
    } catch (error) {
      console.error("Error creating application", error);
      alert(`Failed to create application: ${error.message}`);
    }
  }

  function handleCancelCreate() {
    setCreateApplication(false);
  }

  function handleDeleteApplication() {
    setDeleteApplication(true);
  }

  async function handleConfirmDelete(applicationId) {
    try {
      await request(`/users/applications/${applicationId}`, {
        method: "DELETE",
      });

      setApplications((prev) =>
        prev.filter(
          (application) => application.id !== parseInt(applicationId),
        ),
      );
      setDeleteApplication(false);
    } catch (error) {
      console.error(`Error deleting application:${error.message}`);
    }
  }

  function handleCancelDelete() {
    setDeleteApplication(false);
  }

  function handleEditApplication(applicationId) {
    setEditApplication(applicationId);
  }

  async function handleSaveEditApplication(updatedData) {
    try {
      const updatedApplication = await request(
        `/users/applications/${editApplication}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
        },
      );

      setApplications((prev) =>
        prev.map((application) =>
          application.id === editApplication ? updatedApplication : application,
        ),
      );
      setApplications(null);
    } catch (error) {
      console.error("Error updating application:", error);
      alert(`Failed to update application: ${error.message}`);
    }
  }

  function handleCancelEditApplication() {
    setEditApplication(null);
  }

  function handleStatusChange(applicationId) {
    const application = application.find((a) => a.id === applicationId);

    let newStatus;
    if (application.applicationStatus === "Applied") {
      newStatus = "Interviewing";
    } else if (application.appliactionStatus === "Interviewing") {
      newStatus = "Offer";
    } else if (application.appliactionStatus === "Offer") {
      newStatus = "Rejected";
    } else {
      newStatus = "Applied";
    }

    setApplications((prev) =>
      prev.map((application) =>
        application.id === applicationId
          ? { ...application, applicationStatus: newStatus }
          : application,
      ),
    );
  }
  // request to update status with DB
  // async function handleStatusChange(applicationId) {
  //   try{
  //     const application = applications.find((application) => application.id === applicationId);

  //     let newStatus;
  //     if (application.applicationStatus === "Applied") {
  //       newStatus = "Interviewing";
  //     } else if (application.appliactionStatus === "Interviewing") {
  //       newStatus = "Offer";
  //     } else if (application.appliactionStatus === "Offer") {
  //       newStatus = "Rejected";
  //     } else {
  //       newStatus = "Applied";
  //     }

  //     await request(`/users/applications/${applicationId}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({ appliactionStatus: newStatus }),
  //     });

  //     setApplications((prev) =>
  //       prev.map((application) =>
  //         application.id === applicationId
  //           ? { ...application, applicationStatus: newStatus }
  //           : application,
  //       ),
  //     );
  //   } catch (error) {
  //     console.error("Error updating application status:", error);
  //     alert(`Failed to update status: ${error.message}`);
  //   }
  // }

  const applicationToEdit = editApplication
    ? applications.find((application) => application.id === editApplication)
    : null;
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
