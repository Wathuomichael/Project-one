import { useState, useEffect } from "react";
import axios from "axios";

function Background() {
    const [image, setImage] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const client_id = process.env.REACT_APP_CLIENT_ID;

    useEffect(() => {
        axios.get(`https://api.unsplash.com/photos/random?query=scenic&client_id=${client_id}`)
        .then(response => setImage(response.data.urls.regular + "&fit=scale&w=1920&h=1000"))
        .then(() => setIsLoading(false));
    },[]);
    
    console.log(image);
    
    document.body.style.backgroundImage = `url(${image})`;
}

export default Background;