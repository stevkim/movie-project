import { useAppDispatch, useAppSelector } from "../Utils/Hooks/hooks";
import { toggleDeleteModal } from "../features/profileSlice";
import { useState } from "react";
import { setLogin, setToken } from "../features/userSlice";
import { handleRefresh } from "../Utils/fetchFunctions";
import { userInfoState } from "../features/userSlice";

const DeleteModal = () => {
  const userInfo = useAppSelector(userInfoState);
  const [confirm, setConfirm] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (!confirm) {
      alert('Do you understand that by deleting your account, there is no way to retrieve saved information and is a permanent decision?')
      setConfirm(true);
    } else {
      let token = await handleRefresh();
      let body = { username: userInfo?.username }
      const res = await fetch('http://localhost:3000/account/delete', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      })
      const result = await res.json();
      dispatch(toggleDeleteModal(false))
      dispatch(setLogin(false));
      dispatch(setToken(''));
      window.localStorage.setItem('loggedIn', 'false');
      window.localStorage.setItem('ID', '');

      return result.msg;
    }
  }

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 z-[10] bg-overlay flex justify-center items-center"
      onClick={() => dispatch(toggleDeleteModal(false))}
    >
      <div
        className="bg-white min-w-[300px] h-auto max-w-[600px] w-auto p-4 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Are you sure?</p>
        <div className="w-full flex justify-evenly mt-4">
					<button
						className="w-2/5 bg-red-300 rounded-md"
						onClick={handleClick}
					>
						Delete
					</button>
					<button
						className="w-2/5 bg-gray-300 rounded-md"
						onClick={() => {
							dispatch(toggleDeleteModal(false));
						}}
					>
						Cancel
					</button>
          </div>
      </div>
    </div>
  )
}

export default DeleteModal;