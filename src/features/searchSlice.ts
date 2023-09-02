import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ISearchBarState {
  searchBar: boolean;
  resetInput: boolean;
  searchValue: string;
  valueToFetch: string;
}

const initialState: ISearchBarState = {
  searchBar: false,
  resetInput: false,
  searchValue: '',
  valueToFetch: ''
}

export const searchBarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleSearch: (state, action: PayloadAction<boolean>) => {
      state.searchBar = action.payload;
    },
    resetInput: (state, action: PayloadAction<boolean>) => {
      state.resetInput = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setValueToFetch: (state, action: PayloadAction<string>) => {
      state.valueToFetch = action.payload;
    }
  }
})

export const { toggleSearch, resetInput, setSearchValue, setValueToFetch } = searchBarSlice.actions;

export const SearchBarState = (state: RootState) => state.search.searchBar;
export const resetInputState = (state: RootState) => state.search.resetInput;
export const SearchValueState = (state: RootState) => state.search.searchValue;
export const valueToFetchState = (state: RootState) => state.search.valueToFetch;

export default searchBarSlice.reducer;