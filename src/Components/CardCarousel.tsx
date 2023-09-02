import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
	children: ReactNode;
}

const CardCarousel = ({ children }: Props) => {
	const [position, setPosition] = useState(0);
  const [maxPos, setMaxPos] = useState(0);
	const carousel = useRef<HTMLDivElement>(null);
	let offset = 500;

  useEffect(() => {
    if (carousel.current) {setMaxPos(carousel.current.scrollWidth - carousel.current.offsetWidth)};
  }, [children])

	const handleMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const arrowDirection = e.currentTarget.dataset.direction;
    if (arrowDirection === 'left') {
      if (position - offset <= 0) {
        setPosition(0);
      } else {
        setPosition(position - offset);
      }
    } else if (arrowDirection === 'right') {
      if (position + offset >= maxPos) {
        setPosition(maxPos);
      } else {
        setPosition(position + offset);
      }
    }
	};

	return (
		<motion.div className="overflow-hidden relative">
			<button
        data-direction='left'
				onClick={(e) =>handleMove(e)}
				className="absolute left-10 top-[50%] z-[100] rounded-full h-16 w-16 flex justify-center items-center bg-white text-gray-400 opacity-60 hover:opacity-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-4/5 h-4/5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 19.5L8.25 12l7.5-7.5"
					/>
				</svg>
			</button>
			<motion.div
				ref={carousel}
				animate={{ x: `-${position}px` }}
				className="flex"
			>
				{children}
			</motion.div>
			<button
        data-direction='right'
				onClick={(e) => handleMove(e)}
				className="absolute right-0 top-[50%] z-[100] rounded-full h-16 w-16 flex justify-center items-center bg-white text-gray-400 opacity-60 hover:opacity-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-4/5 h-4/5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.25 4.5l7.5 7.5-7.5 7.5"
					/>
				</svg>
			</button>
		</motion.div>
	);
};

export default CardCarousel;
