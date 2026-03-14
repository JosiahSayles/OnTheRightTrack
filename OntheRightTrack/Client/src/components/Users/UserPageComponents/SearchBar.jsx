import React from "react";

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div>
      <input
        type="text"
        name="Search bar"
        placeholder=" 🔎 Search Applications "
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white mx-10  "
      />
    </div>
  );
}
