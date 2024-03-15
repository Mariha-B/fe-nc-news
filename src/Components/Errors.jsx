import { useState } from "react"

const Errors = ({errMessage,errStatus}) =>{


    return(
        <div className="error">
            <p>{errStatus}</p>
            <p>{errMessage}</p>
      </div>
    )
}

export default Errors