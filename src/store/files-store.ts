import { create } from "zustand";
import { persist } from "zustand/middleware";

type File = {
  name: string;
  content: string;
};

interface State {
  files: File[];
  currentFile: File | null;
  addFile: (file: File) => void;
  updateFile: (file: File) => void;
  // setCurrentFile: (file: File) => void;
  deleteFile: (name: string) => void;
}

export const useFilesStore = create<State>()(
  persist(
    (set, get) => ({
      files: [],
      currentFile: null,

      addFile: (file: File) => {
        const { files } = get();
        set({ files: [...files, file] });
      },
      updateFile: (file: File) => {
        const { files } = get();
        const index = files.findIndex((f) => f.name === file.name);
        files[index] = file;
        set({ files: [...files] });
      },
      setCurrentFile: (file: File) => {
        set({ currentFile: file });
      },
        deleteFile: (name: string) => {
        const { files } = get();
        const newFiles = files.filter((f) => f.name !== name);
        set({ files: newFiles });
        
           
        },
    }),

    {
      name: "files-store",
    }
  )
);
