import { useState } from "react";

export default function Avatar({ user, onEditAccount, onAvatarChange }) {
  const [isHovering, setIsHovering] = useState(false);
  const hasUser = Boolean(user);
  const avatarSrc = user?.avatarurl || null;

  function handleImageChange(e) {
    if (!hasUser || typeof onAvatarChange !== "function") return;

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    onAvatarChange(file);

    e.target.value = null;
  }

  return (
    <div className="flex-col flex items-center gap-4">
      <div
        className={`relative w-30 h-30 md:w-40 md:h-40 lg:w-100 lg:h-100 rounded-4xl shadow-md border-2 border-slate-800 flex items-center justify-center text-lg font-semibold bg-white overflow-hidden ${hasUser ? "cursor-pointer" : "cursor-default"}`}
        onMouseEnter={() => hasUser && setIsHovering(true)}
        onMouseLeave={() => hasUser && setIsHovering(false)}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="User avatar"
            className="w-full h-full object-cover rounded-lg "
          />
        ) : (
          <span className=" text-slate-600">
            {hasUser ? "Avatar" : "Loading..."}
          </span>
        )}

        {isHovering && (
          <div className="absolute inset-0 bg-lime-600 bg-opacity-60 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              Change Photo
            </span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={!hasUser}
          className={`absolute inset-0 w-full h-full opacity-0 ${
            hasUser ? "cursor-pointer" : "pointer-events-none"
          }`}
        />
      </div>
      <div>
        <button
          onClick={() => hasUser && onEditAccount && onEditAccount()}
          disabled={!hasUser}
          className={`bg-lime-400 w-full  border-2 shadow-md rounded-xl border-lime-500 text-black px-8 py-2 m-2 md:mt-2 transition ${
            hasUser
              ? "hover:bg-lime-600 hover:text-white"
              : "opacity-60 cursor-not-allowed"
          }`}
        >
          Edit Account
        </button>
      </div>
    </div>
  );
}
