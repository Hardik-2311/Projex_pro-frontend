// GoalList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGoalsAsync,
  deleteGoalAsync,
  createGoalAsync,
  editGoalAsync,
} from "../Features/goalSlice";

import { MdDelete, MdModeEdit } from "react-icons/md";
import GoalModal from "../Modals/GoalModal";
import Modal from "../Components/Modal";

function GoalList(props) {
  const taskId = props.taskId;
  const creator = props.creator;
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goal.data);
  const status = useSelector((state) => state.goal.status);
  const error = useSelector((state) => state.goal.error);

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleGoalCreate = (formData) => {
    dispatch(createGoalAsync(formData));
    setIsGoalModalOpen(false);
  };

  const handleGoalEdit = (formData) => {
    if (selectedGoal) {
      console.log(selectedGoal.id);
      dispatch(editGoalAsync({newData:formData, goalId:selectedGoal.id}));
      setIsGoalModalOpen(false);
      setSelectedGoal(null);
    }
  };

  const handleGoalDelete = (goalId) => {
    dispatch(deleteGoalAsync(goalId));
  };

  const handleGoalEditClick = (goal) => {
    setSelectedGoal(goal);
    setIsGoalModalOpen(true);
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
                    <div className="flex items-center">
                      <MdModeEdit
                        className="cursor-pointer mr-2"
                        onClick={() => handleGoalEditClick(goal)}
                      />
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
        <button className="button" onClick={() => setIsGoalModalOpen(true)}>
          Add Goal
        </button>
      </div>

      <Modal isOpen={isGoalModalOpen}>
        <GoalModal
          isOpen={isGoalModalOpen}
          onClose={() => setIsGoalModalOpen(false)}
          onGoalCreate={handleGoalCreate}
          onGoalEdit={handleGoalEdit}
          selectedGoal={selectedGoal}
          taskId={taskId}
          creator={creator}
        />
      </Modal>
    </div>
  );
}

export default GoalList;
