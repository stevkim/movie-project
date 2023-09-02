import { motion } from 'framer-motion';
import { Fragment } from 'react';
import CardCarousel from './CardCarousel';
import MediaCard from './Media-Card/MediaCard';
import { IMediaInfo } from '../Utils/interfaces';

interface Props {
	sectionTitle: string;
  mediaList: IMediaInfo[];
}

const MediaListWrapper = ({ sectionTitle, mediaList }: Props) => {

	return (
		<>
			<motion.h1
				className="text-6xl px-4 indent-4 mt-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				{sectionTitle}
			</motion.h1>
      <CardCarousel>
        {
          mediaList.map((media) => {
              return (
                <Fragment key={`movies ${sectionTitle} ${media.id}`}>
                  <MediaCard media={media}/>
                </Fragment>
              )
          })
        }
      </CardCarousel>
		</>
	);
};

export default MediaListWrapper;
