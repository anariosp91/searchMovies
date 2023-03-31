import { useCallback, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'



function App() {
  const [ sort, setSort ] = useState([])
  // const inputRef = useRef()
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({search, sort})
  
  const debouncedGetMovies = useCallback(
    debounce( search => {
      getMovies({search})
    }, 300),
    [getMovies]
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({search})
    // una forma usando useRef
    // const inputEl = inputRef.current
    // const value = inputEl.value
    // console.log(value)

    //otra forma de recuperar los campos del formulario con js vanilla cada input debe tener la propiedad name
    //esta es una forma no controlada, la forma controlada es a traves de estados con useState
    // const { query } = Object.fromEntries(
    //   new window.FormData(e.target)
    // )
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (e) => {
    const newSearch= e.target.value
    updateSearch(newSearch )
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{
            border : '1px solid transparent',
            borderColor: error? 'red': 'transparent'
          }} value={search} onChange={handleChange} name='query' placeholder='Avatar, star wars ...'/>
          <input type='checkbox' onChange={handleSort} checked={sort}/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color : 'red'}}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
