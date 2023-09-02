import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
	children: ReactNode;
}

const AnimateDiv = ({ children }: Props) => {
	return (
		<motion.div
			className="w-full"
			initial={{ y: '200%' }}
			animate={{ y: 0 }}
		>
			{children}
		</motion.div>
	);
};
export default AnimateDiv;
