import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFeedbacksAsync,
  createFeedbackAsync,
  deleteFeedbackAsync,
} from "../Features/feedbackSlice";
import { RxCross2 } from "react-icons/rx";
function GoalModal({
  isOpen,
  onClose,
  onGoalCreate,
  onGoalEdit,
  selectedGoal,
  taskId,
  creator,
  assignee,
}) {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    creator: creator,
    due_date: "",
    task_id: taskId,
    assignee: "",
  });
  const [commentData, setcommentData] = useState({
    content: "",
    commentor: creator,
    goal_id: selectedGoal ? selectedGoal.id : null,
  });
  const comments = useSelector((state) => state.feedback.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedGoal) {
      setFormData({
        title: selectedGoal.title,
        desc: selectedGoal.desc,
        creator: creator,
        due_date: selectedGoal.due_date,
        task_id: taskId,
        assignee: selectedGoal.assignee,
      });
    }
    dispatch(fetchFeedbacksAsync());
  }, [selectedGoal, creator, taskId, dispatch]);
  const users = useSelector((state) => state.user.data);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setcommentData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoalCreate = () => {
    if (selectedGoal) {
      onGoalEdit(formData);
    } else {
      onGoalCreate(formData);
    }
    onClose();
  };
  const addComment = () => {
    dispatch(createFeedbackAsync(commentData));
    dispatch(fetchFeedbacksAsync());
    setcommentData({
      content: "",
      commentor: creator,
      goal_id: selectedGoal ? selectedGoal.id : null,
    });
  };
  const handleDeleteComment = (commentId) => {
    dispatch(deleteFeedbackAsync(commentId));
    dispatch(fetchFeedbacksAsync());
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen
          ? "opacity-100 backdrop-blur-md"
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 scrollbar-hide  overflow-y-scroll `}
    >
      <div
        className=" overflow-y-scroll scrollbar-hide  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <div className="flex flex-row justify-around items-baseline">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedGoal ? "Edit Goal" : "Add Goal"}
            </h2>
          </div>
          <div>
            <button
              type="button"
              onClick={onClose}
              className=" button mt-4 text-white"
            >
              Close
            </button>
          </div>
        </div>

        <form>
          <div className="mb-4  flex flex-col space-y-1">
            <label className=" text-sm dark:text-white text-gray-500">
              Title:
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
            />
          </div>
          <div className=" mb-4 flex flex-col space-y-1">
            <label className=" text-sm dark:text-white text-gray-500">
              desc:
            </label>
            <textarea
              required
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              className=" bg-transparent outline-none min-h-[100px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            />
          </div>
          {selectedGoal && (
            <div>
              <div className="mb-4 flex flex-col space-y-2">
                <label className="text-sm dark:text-white text-gray-500">
                  Content:
                </label>
                <input
                  required
                  type="text"
                  name="content"
                  value={commentData.content}
                  onChange={handleInputChange}
                  className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
                />
              </div>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex w-full  bg-white dark:bg-[#20212c] shadow-[#364e7e1a] rounded-full justify-between py-4 px-2 shadow-lg cursor-pointer items-center my-4"
                >
                  <div>
                    <p className="flex-grow mx-4">{comment.content}</p>
                  </div>
                  <div>
                    <RxCross2
                      onClick={() => handleDeleteComment(comment.id)}
                      className="font-bold mx-4 text-black dark:text-white hover:scale-10"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addComment}
                className="text-black dark:text-white flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 mb-4  border-[1px] border-gray-300 focus:outline-[#635fc7] dark:hover:bg-[#635fc7] dark:hover:text-[white] outline-none"
              >
                Add Comment
              </button>
            </div>
          )}
          <div className="mb-4 flex flex-col space-y-2">
            <label className="text-sm dark:text-white text-gray-500">
              Select User:
            </label>
            <select
              name="assignee" // Ensure this matches the property you want to update in formData
              value={formData.assignee}
              onChange={handleInputChange}
              className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
            >
              <option value="" disabled className="dark:bg-[#2b2c37]">
                Select a member
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex flex-col space-y-2">
            <label className="text-sm dark:text-white text-gray-500">
              Creator:
            </label>
            <input
              readOnly
              required
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleInputChange}
              className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
            />
          </div>

          <div className="mb-4 flex flex-col space-y-2">
            <label className="text-sm dark:text-white text-gray-500">
              Due Date:
            </label>
            <input
              required
              type="date"
              name="due_date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.due_date}
              onChange={handleInputChange}
              className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={handleGoalCreate}
              className="text-black dark:text-white flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0   border-[1px] border-gray-300 focus:outline-[#635fc7] dark:hover:bg-[#635fc7] dark:hover:text-[white] outline-none"
            >
              {selectedGoal ? "Edit Goal" : "Add Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GoalModal;
