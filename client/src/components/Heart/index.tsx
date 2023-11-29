import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
interface Heartprop{
    isFav:boolean;
    size:number;
}
const Heart = ({isFav, size}:Heartprop) => {
  return (
    <>
    {
        isFav ? <FaHeart size={size} style={{color:"red"}} /> : <CiHeart size={size} color={"white"}/>
    }
    </>
  )
}

export default Heart