import { useState } from "react";

function Time() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [currentTime, setCurrentTime] = useState(time);
    function refresh() {
        const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
        setCurrentTime(newTime);
    }
    setInterval(refresh, 1000);
    return(
        <div className="time">{currentTime}</div>
    );
}

export default Time;