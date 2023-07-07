import request from "../utils/request";

const useQuery = (query, variables) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await request.get(query, variables);
      setData(data);
    } catch (ex) {
      setError(ex);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};
