import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IProfileMenuState {
  profileMenu: boolean;
  logoutModal: boolean;
  deleteModal: boolean;
}

const initialState: IProfileMenuState = {
  profileMenu: false,
  logoutModal: false,
  deleteModal: false
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.profileMenu = action.payload;
    },
    toggleLogoutModal: (state, action: PayloadAction<boolean>) => {
      state.logoutModal = action.payload;
    },
    toggleDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.deleteModal = action.payload;
    }
  }
})

export const { toggleMenu, toggleLogoutModal, toggleDeleteModal } = profileSlice.actions;

export const ProfileMenuState = (state: RootState) => state.profile.profileMenu;
export const LogoutModalState = (state: RootState) => state.profile.logoutModal;
export const DeleteModalState = (state: RootState) => state.profile.deleteModal;

export default profileSlice.reducer;