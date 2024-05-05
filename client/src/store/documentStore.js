import { create } from 'zustand';

const useDocumentStore = create((set) => ({
  documents: [],
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) => set((state) => ({ documents: [...state.documents, document] })),
  addDocuments: (documents) => set((state) => ({ documents: [...state.documents, ...documents] })),
  removeDocument: (documentId) => set((state) => ({
    documents: state.documents.filter((doc) => doc.id !== documentId),
  })),
  removeAllDocuments: () => set({ documents: [] }),
}));

export default useDocumentStore;
