import { create } from 'zustand';

const useFileStore = create((set) => ({
  files: [],
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (fileId) => set((state) => ({
    files: state.files.filter((file) => file.id !== fileId),
  })),
  removeAllFiles: () => set({ files: [] }),
}));

export default useFileStore;
