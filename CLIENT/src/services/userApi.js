import axios from "axios";
import { getAuth } from "firebase/auth";

export const getMe = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Not logged in");

  const token = await user.getIdToken();

  return axios.get("http://localhost:8080/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
