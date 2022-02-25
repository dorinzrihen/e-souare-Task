import { useState, useEffect } from 'react';

const MaxDataLength = 10;
 
const useBooksSearch = (value) => {
    const [booksData, setBookData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        if(value){
            setIsLoading(true);
            const signal = controller.signal;
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}`, {signal})
            .then(res => res.json())
            .then(res => {
                setBookData(res?.items?.slice(0,MaxDataLength))
                setIsLoading(false)
            })
            .catch(() => setBookData([]))
            .finally(() => setIsLoading(false));
        };
        return () => {
            controller.abort()
            setIsLoading(false)
        };
    },[value]);

    return {
        booksData,
        isLoading
    }
}

export default useBooksSearch;