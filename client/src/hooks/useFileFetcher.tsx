import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useFileFetcher<T = unknown>(filename: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchFile() {
      try {
        const res = await fetch(`${API_URL}/graph/${filename}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${filename}`);
        }
        const json = (await res.json()) as T;
        if (!cancelled) setData(json);
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
  }, [filename]);

  return { data, error, loading };
}