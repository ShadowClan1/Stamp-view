import { useState } from "react";
import Context1 from "./Context1";


const Context2 = (props)=>{
    const [pins, setPins] = useState();
    const [showLoading, setShowLoading] = useState(false);
return (
 <Context1.Provider value={{pins,  setPins, showLoading, setShowLoading}} >
{props.children}
</Context1.Provider>
        )
}
export default Context2;