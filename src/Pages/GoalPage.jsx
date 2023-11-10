import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGoalsAsync, deleteGoalAsync } from "../Features/goalSlice";
import { MdDelete } from "react-icons/md";

function GoalList(props) {
  const taskId = props.taskId;
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goal.data);
  const status = useSelector((state) => state.goal.status);
  const error = useSelector((state) => state.goal.error);

  const handleGoalDelete = (goalId) => {
    dispatch(deleteGoalAsync(goalId)); // Assuming deletegoal action handles API call
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGoalsAsync());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <ul className="flex flex-col">
          {goals.map((goal) => {
            return taskId === goal.task_id ? (
              <div
                key={goal.id}
                className="w-[280px] bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] rounded-lg mx-auto my-4 py-6 px-3 shadow-lg cursor-pointer"
              >
                <li>
                  <div className="flex items-center justify-between">
                    <div className="text-black text-xl dark:text-white font-bold">
                      {goal.title}
                    </div>
                    <div>
                      <MdDelete
                        className="cursor-pointer"
                        onClick={() => handleGoalDelete(goal.id)}
                      />
                    </div>
                  </div>
                </li>
              </div>
            ) : (
              <li key={goal.id} className="hidden"></li>
            );
          })}
        </ul>
      </div>
      <div>
        <button className="button">Add Goal</button>
      </div>
    </div>
  );
}

export default GoalList;
