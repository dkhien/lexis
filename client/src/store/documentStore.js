/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { produce } from 'immer';

const useDocumentStore = create((set) => ({
  documents: [],
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) => set((state) => produce(state, (draft) => {
    draft.documents.push(document);
  })),
  addDocuments: (documents) => set((state) => produce(state, (draft) => {
    draft.documents.push(...documents);
  })),
  removeDocument: (documentId) => set((state) => produce(state, (draft) => {
    draft.documents = draft.documents.filter((doc) => doc.id !== documentId);
  })),
  removeAllDocuments: () => set({ documents: [] }),
  addSummaryToDocument: (documentId, summary) => set((state) => produce(state, (draft) => {
    draft.documents = draft.documents.map((doc) => {
      if (doc.id === documentId) {
        return { ...doc, summary };
      }
      return doc;
    });
  })),
  addLanguageToDocument: (documentId, language) => set((state) => produce(state, (draft) => {
    draft.documents = draft.documents.map((doc) => {
      if (doc.id === documentId) {
        return { ...doc, language };
      }
      return doc;
    });
  })),
}));

export default useDocumentStore;
