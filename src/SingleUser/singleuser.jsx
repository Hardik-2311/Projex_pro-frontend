import axios from "axios";
axios.defaults.headers.post["Content-Type"]="multipart/form-data";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const axiosConfig = {
  withCredentials: true,
};
export default function CheckLogin(){
    // const dispatch =useDispatch()
    axios.get("http://127.0.0.1:8000/check_login",axiosConfig).then((res)=>{
        console.log(res.data.data);
        if(!(res.data.login)){
             console.log("kuch to gadbad hai daya")
            // window.location.href=`${FRONTEND_HOST}login`;
        }
        else{
            console.log("you can make this happen")
        }
    })
}

