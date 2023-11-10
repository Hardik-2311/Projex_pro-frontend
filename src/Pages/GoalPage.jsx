// GoalList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGoalsAsync,
  deleteGoalAsync,
  createGoalAsync,
} from "../Features/goalSlice";
import { MdDelete } from "react-icons/md";
import GoalModal from "../Modals/GoalModal";
import Modal from "../Components/Modal";

function GoalList(props) {
  const taskId = props.taskId;
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goal.data);
  const status = useSelector((state) => state.goal.status);
  const error = useSelector((state) => state.goal.error);

  const [isgoalModalOpen, setIsgoalModalOpen] = useState(false);

  const handleGoalCreate = (formData) => {
    dispatch(createGoalAsync(formData));
  };

  const handleGoalDelete = (goalId) => {
    dispatch(deleteGoalAsync(goalId));
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
          {goals.map((goal) =>
            taskId === goal.task_id ? (
              <div
                key={goal.id}
                className="w-[280px] bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] rounded-lg mx-auto my-4 py-6 px-3 shadow-lg cursor-pointer"
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
            )
          )}
        </ul>
      </div>
      <div>
        <button className="button" onClick={() => setIsgoalModalOpen(true)}>
          Add Goal
        </button>
      </div>

      {/* GoalModal */}

      <Modal isOpen={isgoalModalOpen} >
        <GoalModal
          onClose={() => setIsgoalModalOpen(false)}
          className="flex flex-col"
          onGoalCreate={handleGoalCreate}
          taskId={taskId}
        />
      </Modal>
    </div>
  );
}

export default GoalList;
