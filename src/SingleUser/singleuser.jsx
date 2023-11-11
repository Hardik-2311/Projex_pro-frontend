import axios from "axios";
import { setUserData } from "../Features/singleUser";
import { useDispatch } from "react-redux";
axios.defaults.headers.post["Content-Type"]="multipart/form-data";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const axiosConfig = {
  withCredentials: true,
};
export default function CheckLogin(){
    const dispatch =useDispatch()
    axios.get("http://127.0.0.1:8000/check_login",axiosConfig).then((res)=>{
        if(!(res.data.login)){
             console.log("kuch to gadbad hai daya")
            window.location.href='http://127.0.0.1:3000/';
        }
        else{
            console.log("you can make this happen")
            dispatch(setUserData(res.data.data))
        }
    })
}
