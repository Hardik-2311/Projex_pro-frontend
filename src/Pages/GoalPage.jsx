// GoalList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGoalsAsync,
  deleteGoalAsync,
  createGoalAsync,
  editGoalAsync,
} from "../Features/goalSlice";
import {RiDeleteBin5Line} from "react-icons/ri"
import { MdModeEdit } from "react-icons/md";
import GoalModal from "../Modals/GoalModal";
import Modal from "../Components/Modal";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";

// ... (imports)

const DraggableGoal = ({ goal, onEditClick, onDelete }) => {
  const [, drag] = useDrag({
    type: "GOAL",
    item: { goal },
  });

  return (
    <div
      ref={drag}
      className="w-[280px] bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] rounded-lg mx-auto my-4 py-6 px-3 shadow-lg cursor-pointer"
    >
      <li>
        <div className="flex items-center justify-between">
          <div className="text-black text-xl dark:text-white font-bold">
            {goal.title}
          </div>
          <div className="text-black text-xl dark:text-white font-bold">
            {goal.task_id}
          </div>
          <div className="flex items-center">
            <MdModeEdit className="cursor-pointer mr-2 dark:text-white hover:dark:text-[#635FC7]" onClick={onEditClick} />
            <RiDeleteBin5Line className="cursor-pointer dark:text-white hover:dark:text-[#635FC7]" onClick={onDelete} />
          </div>
        </div>
      </li>
    </div>
  );
};

function GoalList(props) {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goal.data);
  const status = useSelector((state) => state.goal.status);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const handleDroppedGoal = (droppedGoal, newTaskId) => {
    dispatch(
      editGoalAsync({
        newData: { ...droppedGoal, task_id: newTaskId },
        goalId: droppedGoal.id,
      })
    );
  };

  const [{ isOver }, drop] = useDrop({

    accept: "GOAL",
    drop: (item) => handleDroppedGoal(item.goal, props.taskId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const handleGoalCreate = (formData) => {
    dispatch(createGoalAsync(formData));
    setIsGoalModalOpen(false);
  };

  const handleGoalEdit = (formData) => {
    if (selectedGoal) {
      dispatch(editGoalAsync({ newData: formData, goalId: selectedGoal.id }));
      setIsGoalModalOpen(false);
      setSelectedGoal(null);
    }
  };

  const handleGoalDelete = (goalId) => {
    dispatch(deleteGoalAsync(goalId));
  };
  const handlegoaladdwithourform =()=>{
    setSelectedGoal(null)
  }
  const handleGoalEditClick = (goal) => {
    setSelectedGoal(goal);
    setIsGoalModalOpen(true);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGoalsAsync());
    }
  }, [status, dispatch]);
// Filter goals for the current task
const taskGoals = goals.filter((goal) => props.taskId === goal.task_id);
  return (
    <div className="flex flex-col items-center "ref={drop}>
      <div>
        <ul className="flex flex-col" ref={drop}>
          {taskGoals.map((goal) => (
            <DraggableGoal
              key={goal.id}
              goal={goal}
              onEditClick={() => handleGoalEditClick(goal)}
              onDelete={() => handleGoalDelete(goal.id)}
            />
          ))}
        </ul>
      </div>
      <div>
        <button className="button mb-4 bg-white text-[#653fc7] dark:bg-[#635FC7] dark:text-white " onClick={()=>{
          setIsGoalModalOpen(true)
          handlegoaladdwithourform()
        }}>
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
          taskId={props.taskId}
          creator={props.creator}
        />
      </Modal>
    </div>
  );
}

export default GoalList;
