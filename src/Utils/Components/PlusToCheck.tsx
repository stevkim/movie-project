import { useState } from "react";

interface Props {
  isInList: boolean;
}

const PlusToCheck = ({isInList} :Props) => {
  const [checked, setChecked] = useState(isInList);

  const handleClick = () => {
    setChecked(!checked);
  }

  return (
    <>
      <div className="w-[15px] h-[15px] relative" onClick={handleClick}>
        <div className={`transition-all w-full h-[20%] absolute ${checked ? 'top-[45%] rotate-[-45deg] translate-x-[20%] bg-green-600' : 'top-[50%] rotate-0 translate-x-0 bg-black'}`}></div>
        <div className={`transition-all h-[20%] absolute top-[50%] ${checked ? 'w-[50%] rotate-45 left-[-5%]  bg-green-600' : 'w-full rotate-90 bg-black'}`}></div>
      </div>
    </>
  )
}
export default PlusToCheck;
