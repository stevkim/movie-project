import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
	const loadingRef = useRef<HTMLDivElement | null>(null);

	const dotCreation = () => {
		const span = document.createElement('span');
		span.innerText = '.';
		span.classList.add('dot-animation');
		span.addEventListener('animationend', () => {
			span.remove();
		});
		if (loadingRef.current?.firstChild) {
			loadingRef.current?.insertBefore(span, loadingRef.current.firstChild);
		} else {
			loadingRef.current?.append(span);
		}
	};

	useEffect(() => {
		let start = setInterval(dotCreation, 1000);

		return () => clearInterval(start);
	}, []);

	const animations = {
		initial: {
      scale: 0.9,
      y: '10%'
    },
		animate: {
			scale: 1,
			y: 0,
		},
	};

	return (
		<div className="flex justify-center items-center  w-full h-full">
			<div className="flex flex-row text-6xl">
				<div className="flex flex-row mr-4">
					<motion.span
						initial={animations.initial}
						animate={animations.animate}
						transition={{ delay: 0.4 }}
					>
						L
					</motion.span>
					<motion.span
						initial={animations.initial}
						animate={animations.animate}
						transition={{ delay: 0.5 }}
					>
						o
					</motion.span>
					<motion.span
						initial={animations.initial}
						animate={animations.animate}
						transition={{ delay: 0.6 }}
					>
						a
					</motion.span>
					<motion.span
						initial={animations.initial}
						animate={animations.animate}
						transition={{ delay: 0.7 }}
					>
						d
					</motion.span>
					<motion.span
						initial={animations.initial}
						animate={animations.animate}
						transition={{ delay: 0.8 }}
					>
						i
					</motion.span>
					<motion.span
						initial={animations.initial}
						animate={animations.animate}
						transition={{ delay: 0.9 }}
					>
						n
					</motion.span>
					<motion.span
						initial={animations.initial}
						animate={animations.animate}
						transition={{ delay: 1 }}
					>
						g
					</motion.span>
				</div>
				<div
					className="flex flex-row relative"
					ref={loadingRef}
				></div>
			</div>
		</div>
	);
};

export default Loading;
