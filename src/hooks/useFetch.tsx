import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface UseFetchResult<T> {
  data: T[];
  loading: boolean;
  error: AxiosError | null;
  reFetch: () => Promise<void>;
}

const useFetch = <T,>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res: AxiosResponse<T[]> = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err as AxiosError);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<T[]> = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err as AxiosError);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;