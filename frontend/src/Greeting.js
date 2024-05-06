import { useState } from "react";

function Greeting (){
    const now = new Date().getHours();
    const [message, setMessage] = useState("Welcome");
    function refresh (){
        if (now > 17){
            setMessage("Good Evening");
        } else if (now > 11){
            setMessage("Good Afternoon");
        } else if (now > 4){
            setMessage("Good Morning");
        } else {
            setMessage("Good Evening");
        }
    }
    setTimeout(refresh, 1000); 
    return (
        <div className="greeting">{message}</div>
    );
}

export default Greeting;
