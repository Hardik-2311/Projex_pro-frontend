import React, { useEffect, useCallback, useState } from "react";
import GoalList from "./GoalPage";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasksAsync,
  deleteTaskAsync,
  createTaskAsync,
} from "../Features/taskSlice";
import Modal from "../Components/Modal";
import { fetchUsersAsync } from "../Features/userSlice";
import { MdDelete } from "react-icons/md";
import TaskModal from "../Modals/TaskModal";
function TaskList(props) {
  const projectId = props.projectId;
  const dispatch = useDispatch();
  const statususer = useSelector((state) => state.user.status);
  const User_login=useSelector((state)=>state.singleuser)
  useEffect(() => {
    if (statususer === "idle") {
      dispatch(fetchUsersAsync());
    }
  }, [statususer, dispatch]);
  const projects = useSelector((state) => state.project.data);
  const tasks = useSelector((state) => state.task.data);
  const status = useSelector((state) => state.task.status);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const handleTaskCreate = useCallback(
    (formData) => {
      const taskDataWithProjectId = {
        ...formData,
        project: projectId,
      };
      dispatch(createTaskAsync(taskDataWithProjectId));
    },
    [dispatch, projectId]
  );
  const handleTaskDelete = useCallback(
    async (taskId) => {
      dispatch(deleteTaskAsync(taskId));
    },
    [dispatch]
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasksAsync());
    }
  }, [status, dispatch]);

  return (
    <div className="flex gap-3">
      <div>
        <div>
          <ul className="flex flex-row gap-3">
            {tasks.map((task) => {
              return task.project === projectId ? (
                <div key={task.id}>
                  <li className="w-[300px] dark:text-white px-3 py-3 dark:bg-[#20212c] gap-3">
                    <p className="font-bold text-center uppercase flex items-center justify-around">
                      {task.Task_name}
                      <MdDelete
                        className="cursor-pointer hover:text-[#635FC7] dark:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskDelete(task.id);
                        }}
                      />
                    </p>
                  </li>
                  <div className="mt-2">
                    <GoalList taskId={task.id} creator={User_login.name} />
                  </div>
                </div>
              ) : (
                <li key={task.id} className="hidden"></li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={
          projectId === null || projects.length===0
            ? "hidden"
            : 'className=" h-[100vh] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer  dark:bg-[#20212c]  scrollbar-hide mb-2   mx-5 min-w-[280px] text-[#828FA3] rounded-lg"'
        }
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
      >
        Add a task
      </div>
      <Modal isOpen={isTaskModalOpen}>
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onTaskCreate={handleTaskCreate}
          project={projectId}
          creator={User_login.name}
        />
      </Modal>
    </div>
  );
}

export default React.memo(TaskList);
