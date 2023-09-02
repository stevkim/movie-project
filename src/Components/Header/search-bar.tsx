import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../Utils/Hooks/hooks';
import { toggleSearch, resetInput, setSearchValue, SearchValueState, resetInputState, SearchBarState, setValueToFetch } from '../../features/searchSlice';
import useDebounce from '../../Utils/Hooks/useDebounce';

const SearchBar = () => {
  const isSearchBarOpen = useAppSelector(SearchBarState);
  const isResetButton = useAppSelector(resetInputState);
	const SearchValue = useAppSelector(SearchValueState);
  const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	const searchValueToPass = useDebounce(SearchValue, 1000);

	const handleClick = () => {
		dispatch(toggleSearch(!isSearchBarOpen));
		inputRef.current!.focus();
	};

  const handleInputChange = () => {
    inputRef.current!.value.length > 0 ? dispatch(resetInput(true)) : dispatch(resetInput(false));
		dispatch(setSearchValue(inputRef.current!.value))
  }

  const handleResetButton = () => {
    inputRef.current!.value = '';
    handleInputChange();
  }

	useEffect(() => {
		dispatch(setValueToFetch(searchValueToPass))
	}, [searchValueToPass])

	/* If the reset button is not visible, reset the input value to be empty */
	useEffect(() => {
		if (!isResetButton) {
			inputRef.current!.value = '';
		}
	}, [isResetButton])

	return (
		<div className={`flex w-auto rounded-sm ${isSearchBarOpen ? 'border-2 border-gray-600' : ''}`}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-8 aspect-square mr-auto"
				onClick={handleClick}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
			<input
				type="text"
				className={`transition-width focus:outline-0 indent-2 ${
					isSearchBarOpen ? 'w-auto' : 'w-0'
				}`}
				placeholder="Search anything"
				ref={inputRef}
        onChange={handleInputChange}
			/>
      <div className={`${isSearchBarOpen ? 'w-8 aspect-square' : ''}`}>
			{isResetButton && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-full aspect-square"
          onClick={handleResetButton}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			)}
      </div>
		</div>
	);
};

export default SearchBar;
