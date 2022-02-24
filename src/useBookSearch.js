import { useMemo } from 'react'
 
const useBookSearch = (value) => {

    const booksData = useMemo(() => console.log(value),[value])

    return {
        booksData
    }
}

export default useBookSearch