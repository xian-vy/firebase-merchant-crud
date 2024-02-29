import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

type DeleteDocumentResult = {
  loading: boolean;
  error: string | null;
  deleteDocument: (itemId: string) => Promise<void>;
};

const useDeleteItemHook = (collectionName: string): DeleteDocumentResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDocument = async (itemId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, collectionName, itemId));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteDocument };
};

export default useDeleteItemHook;
