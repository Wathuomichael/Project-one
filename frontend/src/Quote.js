import { useEffect, useState } from "react";
import axios from "axios";

function Quote() {
    const [quote, setQuote] = useState({});

    const getQuote = async() => {
        const response = await axios.get('https://quote-garden.herokuapp.com/api/v3/quotes?limit=1');
        setQuote(response.data.data[0]);
    }
    useEffect(() => {
        getQuote();
    }, []);

    return (
        <div>
            <p className="quotetext">"{quote.quoteText}"</p>
            <p className="quoteauthor">{quote.quoteAuthor}</p>
        </div>
    );

}

export default Quote;