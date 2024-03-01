import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface ID {
  id: string;
}

type UpdateDocumentResult<T> = {
  loading: boolean;
  error: string | null;
  updateDocument: (item: T) => Promise<void>;
};

const useUpdateItemHook = <T extends Partial<ID>>(collectionName: string): UpdateDocumentResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateDocument = async (item: T) => {
    setLoading(true);
    setError(null);
    try {
      if (!item.id) {
        throw new Error("Item ID is undefined");
      }
      const docRef = doc(db, collectionName, item.id);
      await updateDoc(docRef, item);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateDocument };
};

export default useUpdateItemHook;
