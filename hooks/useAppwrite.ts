import { signInWithPassword } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useSupabase = (fn: () => Promise<any>) => {
	const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert(error as unknown as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  return { data, error, loading };
};

const a = async()=>{
const b = await signInWithPassword({email: "", password: ""});
}

export default useSupabase;