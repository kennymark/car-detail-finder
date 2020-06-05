import { useEffect, useState } from "react";

function useFetch(url) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!data) setLoading(true);
        else {
          setLoading(false);
          setData(data);
        }
      })
      .catch(error => setError(error));

    return () => {
      setData(null);
    };
  }, [url, loading]);

  return { loading, data, error, setData };
}

export default useFetch;
