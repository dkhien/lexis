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
  addSummaryToDocument: (documentId, summary) => set((state) => ({
    documents: state.documents.map((doc) => {
      console.log('hello');
      console.log(doc.id, documentId);
      if (doc.id === documentId) {
        console.log('gello if');
        return { ...doc, summary };
      }
      return doc;
    }),
  })),
  addLanguageToDocument: (documentId, language) => set((state) => ({
    documents: state.documents.map((doc) => {
      if (doc.id === documentId) {
        return { ...doc, language };
      }
      return doc;
    }),
  })),
}));

export default useDocumentStore;
