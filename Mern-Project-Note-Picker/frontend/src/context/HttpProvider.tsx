import React, { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import { ApiResponseData } from "../types/api";

const api = axios.create({
  baseURL: "https://magure-project.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const createApiErrorResponse = (error: unknown): ApiResponseData => {
  let errorMsg = "Something went wrong";
  if (error instanceof String) {
    errorMsg = error.toString();
  } else if (error instanceof Error) {
    errorMsg = error.message;
  }

  return { success: false, errorMsg, response: [] };
};

export interface HttpMethodContextType {
  showLoding: boolean;
  showError: boolean;
  get: (endpoint: string, showLoader?: boolean) => Promise<ApiResponseData>;
  post: (
    endpoint: string,
    data: object | Array<object>,
    showLoader?: boolean
  ) => Promise<ApiResponseData>;
  patch: (
    endpoint: string,
    data: object | Array<object>,
    showLoader?: boolean
  ) => Promise<ApiResponseData>;
  deleteMe: (
    endpoint: string,
    showLoader?: boolean
  ) => Promise<ApiResponseData>;
}

export const HttpMethodContext = createContext<HttpMethodContextType | null>(null);

const HttpMethodContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /*Notes */
  // const [notes, setNotes] = useState<Note[]>([]);

  const [showLoding, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  // const { deleteNote, fetchNotes } = useNotes();
  // const { loginUser, SignUpcredential } = useUser();

  const get = useCallback(
    async (endpoint: string, showLoader = true): Promise<ApiResponseData> => {
      setShowLoading(showLoader);
      setShowError(false);

      return api
        .get(endpoint)
        .then((res) => {
          return {
            success: true,
            errorMsg: "",
            response: res.data,
          };
        })
        .catch((err) => {
          return createApiErrorResponse(err);
        })
        .finally(() => setShowLoading(false));
    },
    [setShowLoading]
  );

  const deleteMe = useCallback(
    async (endpoint: string, showLoader = true): Promise<ApiResponseData> => {
      setShowLoading(showLoader);
      setShowError(false);

      return api
        .delete(endpoint)
        .then(() => {
          return {
            success: true,
            errorMsg: "",
            response: [],
          };
        })
        .catch((err) => {
          return createApiErrorResponse(err);
        })
        .finally(() => setShowLoading(false));
    },
    [setShowLoading]
  );

  const post = useCallback(
    async (
      endpoint: string,
      data: object | Array<object>,
      showLoader = true
    ): Promise<ApiResponseData> => {
      setShowLoading(showLoader);
      setShowError(false);

      return api
        .post(endpoint, data)
        .then((res) => {
          return {
            success: true,
            errorMsg: "",
            response: res.data,
          };
        })
        .catch((err) => {
          return createApiErrorResponse(err);
        })
        .finally(() => setShowLoading(false));
    },
    [setShowLoading]
  );

  const patch = useCallback(
    async (
      endpoint: string,
      data: object | Array<object>,
      showLoader = true
    ): Promise<ApiResponseData> => {
      setShowLoading(showLoader);
      setShowError(false);

      return api
        .patch(endpoint, data)
        .then((res) => {
          return {
            success: true,
            errorMsg: "",
            response: res.data,
          };
        })
        .catch((err) => {
          return createApiErrorResponse(err);
        })
        .finally(() => setShowLoading(false));
    },
    [setShowLoading]
  );

  const value: HttpMethodContextType = {
    get,
    post,
    patch,
    deleteMe,
    showLoding,
    showError,
  };

  return <HttpMethodContext.Provider value={value}>{children}</HttpMethodContext.Provider>;
};

export const useHttpMethodContext = () => {
  const context = useContext(HttpMethodContext);

  if (!context) {
    throw new Error(`useHttpMethodContext must be use within a userProvider`);
  }

  return context;
};

export default HttpMethodContextProvider;
