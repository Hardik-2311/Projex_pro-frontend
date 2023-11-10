import React, { useEffect, useCallback } from "react";
import GoalList from "./GoalPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksAsync, deleteTaskAsync } from "../Features/taskSlice";
import { MdDelete } from "react-icons/md";

function TaskList(props) {
  const projectId = props.projectId;
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.data);
  const tasks = useSelector((state) => state.task.data);
  const status = useSelector((state) => state.task.status);

  const handleTaskDelete = useCallback(
    async (taskId) => {
      // Assuming your API call is handled in the 'deletetask' action
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
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskDelete(task.id);
                        }}
                      />
                    </p>
                  </li>
                  <div className="mt-2">
                    <GoalList taskId={task.id} />
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
          projects.length === 0
            ? "hidden"
            : 'className=" h-[100vh] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-gray-200  dark:bg-[#20212c]  scrollbar-hide mb-2   mx-5 min-w-[280px] text-[#828FA3] rounded-lg"'
        }
        
      >
        Add a task
      </div>
    </div>
  );
}

export default React.memo(TaskList);
