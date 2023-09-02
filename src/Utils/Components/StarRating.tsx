import { Fragment, useEffect, useRef } from 'react';

interface Props {
  starRating: number;
}

const StarRating = ({ starRating }: Props) => {
  const starWidthRef= useRef<HTMLDivElement | null>(null);

  let convertedStars = (starRating * 10).toFixed();

  useEffect(() => {
    starWidthRef.current!.style.width = convertedStars + '%';
  }, [convertedStars])

	return (
		<>
			<div className="relative w-[100px] h-[20px]">

        <div ref={starWidthRef} className='h-full overflow-hidden'>
          <div className="relative flex flex-row z-[2] h-full">
            {[...new Array(5)].map((_, index) => {
              const leftKey = ['star-fill-first','star-fill-second','star-fill-third','star-fill-fourth','star-fill-fifth',]
              return (
                <Fragment key={`star` + index}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={"text-yellow-500 w-[20px] h-[20px] absolute top-0 " + leftKey[index]}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                </Fragment>
              );
            })}
          </div>
        </div>

        <div className="absolute flex flex-row top-0 left-0">
					{[...new Array(5)].map((_, index) => {
						return (
							<Fragment key={'outline' + index}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="text-gray-400 w-[20px] h-[20px]"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
									/>
								</svg>
							</Fragment>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default StarRating;