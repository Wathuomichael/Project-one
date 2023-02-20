import { useEffect, useState } from "react";
import axios from "axios";



function Quote() {
    const [quote, setQuote] = useState({});
    const apiNinjasKey = process.env.REACT_APP_API_NINJAS_KEY;

    const getQuote = () => {
        const options = {
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/quotes?category=inspirational',
            headers: {
              'X-Api-Key': `${apiNinjasKey}`
            }
          };
          axios.request(options).then(function (response) {
            console.log(response);
            setQuote(response.data[0]);
          }).catch(function (error) {
              console.error(error);
          });
    }
    useEffect(() => {
        getQuote();
    }, []);

    return (
        <div className="quote">
            <p className="quotetext">"{quote.quote}"</p>
            <p className="quoteauthor">{quote.author}</p>
        </div>
    );

}

export default Quote;