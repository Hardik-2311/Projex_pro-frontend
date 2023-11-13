import React from "react";
import { useEffect } from "react";
import { fetchUsersAsync } from "../Features/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);
  console.log(user)
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  return (
    <div className="flex justify-center items-center">
      <div className="text-3xl dark:text-white">
        <h3>hello click on project to view details</h3>
      </div>
    </div>
  );
};

export default Dashboard;
