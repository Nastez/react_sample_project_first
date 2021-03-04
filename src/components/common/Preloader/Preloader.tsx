import preloader from "../../../assets/images/preloader.svg"
import React from "react"

const Preloader: React.FC = (props) => {
    return (
        <img alt='preloader' src={preloader} />
    )
}

export default Preloader