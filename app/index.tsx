import Onboarding from "@/components/onboarding/Onboarding";
import { getCurrentUser } from "@/lib/supabase/supabase";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/features/user/userSlice";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { Redirect } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const fetchUser = async () => {
    const { data, error } = await getCurrentUser();
    if (data) {
      dispatch(setUser(data.user));
    } else if (error) {

      dispatch(setUser(null));
    }
  };
  useEffect(() => {
    fetchUser();
    SplashScreen.hideAsync();
  }, [user]);

  return user ? <Redirect href={"/(tabs)/home"} /> : <Onboarding />;
};

export default Index;
