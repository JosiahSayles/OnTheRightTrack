import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";
import { useApi } from "../API/APIContext";
import Avatar from "./UserPageComponents/Avatar";
import UserInfo from "./UserPageComponents/UserInfo";
import CreateApplication from "./UserPageComponents/CreateApplication";
import AllApplications from "./UserPageComponents/AllApplications";

export default function Users() {
  const { token, logout } = useAuth();
  const { request } = useApi();
  const navigate = useNavigate();

  const user = {
    firstname: "user1",
    lastname: "user1",
    email: "user@user.com",
    password: "12345678",
  };
  // const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [editAccount, setEditAccount] = useState(false);
  const [createApplication, setCreateApplication] = useState(false);
  const [deleteApplication, setDeleteApplication] = useState(false);
  const [editApplication, setEditApplication] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const applicationsAdded = applications.length;

  useEffect(() => {
    // if (!token) {
    //   navigate("/");
    //   return;
    // }

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
        body: JSON.stringify(updateInfo),
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
    <div className="flex bg-stone-200 min-h-screen mx-20">
      <section className="flex-col bg-lime-900 md:w-3/4 text-shadow-lg w-full px-2">
        <div>
          <h1 className=" text-xl md:text-6xl font-bold md:pt-10 md: text-lime-400 mx-5 mt-5 pb-3">
            Hello! {user.firstname || "Guest"}
          </h1>
          <div className="flex items-center justify-center mx-5 my-5 gap-6 ">
            <Avatar
              user={user}
              onEditAccount={handleEditAccount}
              onAvatarChange={handleAvatarChange}
            />
            <UserInfo user={user} applicationsAdded={applicationsAdded} />
          </div>
          <hr className="h-[1px] mt-5 mb-3 border-0 mx-10 bg-lime-400" />
          <div className="flex-col ">
            <h2 className="text-xl md:text-6xl font-bold md: text-lime-400 mx-5 mt-2 pb-3">
              {user?.firstname || "Guest"} Applications
            </h2>
            <div className="md:mx-10 mx-2 mt-5">
              <AllApplications
                applications={applications}
                onStatusChange={handleStatusChange}
                onEditApplication={handleEditAccount}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <button
              onClick={handleCreateApplication}
              className="flex-col justify-items-center w-full bg-lime-600 md:py-8 px-2 lg:py-10 xl:px-10  md:text-3xl font-semibold md:mr-2 rounded-lg mr-5 shadow-lg hover:bg-lime-200 hover:text-lime-500"
            >
              <img src="/icons/add.png" alt="add icon" className="md:w-14" />{" "}
              Add <br />
              Application
            </button>
          </div>
          <div>
            <button
              onClick={handleDeleteApplication}
              className="flex-col justify-items-center w-full bg-lime-600 md:py-8 px-2 lg:py-10 xl:px-10 md:text-3xl font-semibold md:mr-2 rounded-lg ml-5 shadow-lg hover:bg-lime-200 hover:text-lime-500"
            >
              <img
                src="/icons/delete.png"
                alt="delete icon"
                className="md:w-14 "
              />
              Delete <br /> Application
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col  bg-stone-300 md:w-1/4 w-full text-shadow-lg  px-2"></section>
    </div>
  );
}
