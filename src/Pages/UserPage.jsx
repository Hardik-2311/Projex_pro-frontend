// UserPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersAsync } from '../Features/userSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const activeUsers =users.filter((user) => user.is_active===true)
  activeUsers.map((activeuser)=>{
    return activeuser
  })
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsersAsync());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>User Profile</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && (
        <div>
          <strong>Username:</strong> {
            activeUsers.map((user)=>{
                return <h1>{user.enrolment_no}</h1>
            })
          }
        </div>
      )}
      {status === 'failed' && <div>Error loading user data</div>}
    </div>
  );
};

export default UserPage;
