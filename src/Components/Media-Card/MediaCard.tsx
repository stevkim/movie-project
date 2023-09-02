import { useState } from 'react';
import { IMediaInfo } from '../../Utils/interfaces';
import CardFront from './CardFront';
import { motion } from 'framer-motion';

interface Props {
	media: IMediaInfo;
}

const MediaCard = ({ media }: Props) => {
	const { poster } = media;

	const [hover, setHover] = useState<boolean>(false);
	const [flip, setFlip] = useState<boolean>(false);

	const toggleFlip = () => {
		setFlip(!flip);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={`card ${flip ? 'card-toggle' : ''}`}
			onMouseEnter={() => {
				setHover(true);
				setFlip(false);
			}}
			onMouseLeave={() => {
				setHover(false);
				setFlip(false);
			}}
			onClick={toggleFlip}
		>
			<div className={`card-inner transition-all ${flip ? 'card-toggle' : ''}`}>
				<div
					className={`${
						hover ? 'translate-y-0 z-20' : 'translate-y-[100%] z-[2]'
					} transition-all card-front bg-glassmorph`}
				>
					<CardFront media={media} />
				</div>
				<img
					src={`https://image.tmdb.org/t/p/original/${poster}`}
					className={`card-back`}
					alt="Whoops! We couldn't find a poster for this one!"
				/>
			</div>
		</motion.div>
	);
};

export default MediaCard;
