import { CircleLoader } from "react-spinners"
import { BackDrop } from "./Loader.styled"


export const Loader = () => {
    return <BackDrop><CircleLoader color="#36d7b7" /></BackDrop>
}