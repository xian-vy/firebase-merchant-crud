import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

type UpdateDocumentResult<T> = {
  loading: boolean;
  error: string | null;
  updateDocument: (item: T) => Promise<void>;
};

const useUpdateItemHook = <T extends { [x: string]: any }>(collectionName: string): UpdateDocumentResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateDocument = async (item: T) => {
    setLoading(true);
    setError(null);
    try {
      await updateDoc(doc(db, collectionName, item.id), item);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateDocument };
};

export default useUpdateItemHook;
