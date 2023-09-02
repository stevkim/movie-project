import { useEffect, useState } from "react";
import { searchedListState } from "../features/mediaSlice";
import { useAppSelector } from "../Utils/Hooks/hooks";
import { SearchValueState } from "../features/searchSlice";
import MediaCard from "../Components/Media-Card/MediaCard";
import AnimateDiv from "../Components/AnimateDiv";

const SearchPage = () => {
  const searchedList = useAppSelector(searchedListState);
  const searchValue = useAppSelector(SearchValueState);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (searchedList.length > 0) setIsVisible(true);

    return () => setIsVisible(false)
  }, [searchedList, isVisible])

  if (isVisible) {
    return (
      <>
        <p className="title">Here are your search results for "{searchValue}"</p>
        <AnimateDiv>
        <div className="flex flex-wrap justify-center">
        {
          searchedList.map(media => {
            return (
              <div key={`searched result ${media.id}`} className="w-fit">
                <MediaCard media={media} />
              </div>
            )
          })
        }
        </div>
        </AnimateDiv>
      </>
    )
  } else {
    return (
      <>
        Whoops! We couldn't find any results for "{searchValue}"
      </>
    )
  }
}

export default SearchPage;