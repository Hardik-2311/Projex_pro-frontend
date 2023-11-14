import React from "react";
import { useEffect } from "react";
import { fetchUsersAsync } from "../Features/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.data);
  const users = useSelector((state) => state.user.data);
  // console.log(user)
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  return (
    <div className="flex justify-center flex-col space-y-10 items-center">
      <div className="text-2xl dark:text-white">
        {projects.length === 0 ? (
          <h3>Create project</h3>
        ) : (
          <h3>hello click on project to view details</h3>
        )}
      </div>
      <div className="text-2xl dark:text-white flex flex-col">
        {users.map((user) => {
          return <div>{user.name}</div>;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
