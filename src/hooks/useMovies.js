import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export const useMovies = ({search, sort}) => {

    const [ movies, setMovies ] = useState([])
    const previousSearch = useRef(search)

    const getMovies = useCallback( async ({search}) => {
        if(search === previousSearch.current) return
        try {
            previousSearch.current = search
            const newMovies = await searchMovies({search})
            setMovies(newMovies)
        } catch (error) {
            throw new Error('error en la busqueda')
        }
       
    }, [])

    const sortedMovies = useMemo( () => {
       return sort ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies
    }, [sort, movies])
    

    return { movies: sortedMovies , getMovies}
}