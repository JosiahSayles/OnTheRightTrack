import { useState } from "react";

export default function EditAccountCard({ user, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(formData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div className="fixed inset-0 bg-lime-600/80  flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-300 rounded-xl border-2 border-black p-8 w-full max-w-2xl my-8">
        <h2 className="flex justify-center text-shadow-lg text-2xl bg-lime-400 rounded-lg p-4 font-bold underline text-white mb-6 ">
          Edit Account information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>
              First name{" "}
              <input
                type="text"
                name="firstname"
                className="bg-white border-2 rounded-lg w-full px-2"
                value={formData.firstname}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Last name:{" "}
              <input
                type="text"
                name="lastname"
                className="bg-white border-2 rounded-lg w-full px-2"
                value={formData.lastname}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Email:{" "}
              <input
                type="text"
                name="email"
                className="bg-white border-2 rounded-lg w-full px-2"
                value={formData.email}
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
              />
            </label>
            <button
              type="submit"
              className="bg-lime-400 border-2 shadow-md rounded-xl border-lime-500 text-black px-7 py-2 m-2 hover:bg-lime-600 hover:text-white transition"
            >
              Update information
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-lime-400 border-2 shadow-md rounded-xl border-lime-500 text-black px-7 py-2 m-2 hover:bg-lime-600 hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
