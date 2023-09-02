import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAccountState {
  genreModal: boolean;
  updateModal: boolean;
  fieldToUpdate: string;
}

const initialState: IAccountState = {
  genreModal: false,
  updateModal: false,
  fieldToUpdate: ''
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    toggleUpdateModal: (state, action: PayloadAction<boolean>) => {
      state.updateModal = action.payload;
    },
    toggleGenreModal: (state, action: PayloadAction<boolean>) => {
      state.genreModal = action.payload;
    },
    fieldUpdater: (state, action: PayloadAction<string>) => {
      state.fieldToUpdate = action.payload
    }
  }
})

export const { toggleUpdateModal, fieldUpdater, toggleGenreModal } = accountSlice.actions;

export const accountUpdateModalState = (state: RootState) => state.account.updateModal;
export const updateFieldState = (state: RootState) => state.account.fieldToUpdate;
export const genreModalState = (state: RootState) => state.account.genreModal;

export default accountSlice.reducer;