import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"; // Make sure this imports the Firestore instance

interface FetchItemsResult<T> {
  items: T[] | null;
  loading: boolean;
  error: Error | null;
}

export const useFetchItems = <T,>(collectionName: string): FetchItemsResult<T> => {
  const [items, setItems] = useState<T[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = () => {
      const collectionRef = collection(db, collectionName);
      const unsubscribe = onSnapshot(
        collectionRef,
        (snapshot) => {
          const data: T[] = snapshot.docs.map((doc) => ({
            ...(doc.data() as T),
            id: doc.id,
          }));
          setItems(data);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    };

    fetchData();
  }, [collectionName]);

  return { items, loading, error };
};
