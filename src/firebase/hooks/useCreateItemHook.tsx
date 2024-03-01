import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface ID {
  id: string;
}
type InsertDocumentResult<T> = {
  loading: boolean;
  error: string | null;
  documentId: string | null;
  insertDocument: (item: T) => Promise<void>;
};

const useCreateItemHook = <T extends Partial<ID>>(collectionName: string): InsertDocumentResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);

  const insertDocument = async (item: T) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, collectionName), item);
      setDocumentId(docRef.id);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, documentId, insertDocument };
};

export default useCreateItemHook;
