import { createContext, useContext, useState, useCallback } from "react";
import { useAuth } from "../Auth/AuthContext";

export const API = import.meta.env.VITE_API_URL;

const APIContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const request = useCallback(
    async (resource, options = {}) => {
      const isFormData = options.body instanceof FormData;

      const headers = {};

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(API + resource, {
        ...options,
        headers,
      });

      const isJson = response.headers.get("Content-Type")?.includes("json");

      const result = isJson ? await response.json() : undefined;

      if (!response.ok) {
        throw Error(result?.message ?? "Something went wrong :(");
      }

      return result;
    },
    [token],
  );

  const [tags, setTags] = useState();

  const provideTag = (tag, query) => {
    setTags({ ...tags, [tag]: query });
  };

  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => {
      const query = tags[tag];
      if (query) query();
    });
  };

  const value = { request, provideTag, invalidateTags };
  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

export function useApi() {
  const context = useContext(APIContext);
  if (!context) throw Error("useApi must be used within ApiProvider");
  return context;
}
