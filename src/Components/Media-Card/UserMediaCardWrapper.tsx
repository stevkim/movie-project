import { ReactNode } from 'react';

interface Props {
	id: number;
	children: ReactNode;
	handleDelete(id: number): void;
}

const UserMediaCardWrapper = ({ id, children, handleDelete }: Props) => {
	return (
		<div
			key={id}
			className="flex flex-col"
		>
			{children}
			<button
				onClick={() => handleDelete(id)}
				className="w-[20vw] mx-auto bg-red-200 hover:text-white hover:bg-red-300"
			>
				Remove from List
			</button>
		</div>
	);
};

export default UserMediaCardWrapper;
