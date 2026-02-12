import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useFileFetcher<T = unknown>(fileid: number) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchFile() {
      try {
        const res = await axios.get(`${API_URL}/graph/${fileid}`);
        if (!cancelled) setData(res.data.elements);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFile();

    return () => {
      cancelled = true;
    };
  }, [fileid]);

  return { data, error, loading };
}