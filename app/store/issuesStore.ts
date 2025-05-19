import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { IssueProps } from "../types/issue";

type IssuesState = {
  issues: IssueProps[];
  loading: boolean;
  error: string | null;
  fetchIssues: () => Promise<void>;
};

const fetchIssuesData = async (): Promise<IssueProps[]> => {
  const response = await axios.get("/api/issues");
  return response.data;
};

export const useIssues = create<IssuesState>((set) => ({
  issues: [],
  loading: true,
  error: null,
  fetchIssues: async () => {
    set({ loading: true, error: null });

    try {
      const issues = await fetchIssuesData();
      set({ issues, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.message
          : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
    }
  },
}));
