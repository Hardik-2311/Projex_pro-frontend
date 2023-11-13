import axios from "axios";
import { setUserData } from "../Features/singleUser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const axiosConfig = {
  withCredentials: true,
};

export function useCheckLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/check_login", axiosConfig);
        if (!res.data.login) {
        //   console.log("kuch to gadbad hai daya");
          window.location.href = 'http://127.0.0.1:3000/';
        } else {
        //   console.log("you can make this happen");
          dispatch(setUserData(res.data.data));
        }
      } catch (error) {
        toast.error("login first")
      }
    };

    fetchData();
  }, [dispatch]);
  return null;
}
