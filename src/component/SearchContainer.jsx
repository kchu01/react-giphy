import { useState } from 'react'
import axios from 'axios'
import Search from "./Search"
import Results from './Results'

const SearchContainer = () => {
    const [query, setQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [hasSearched, setHasSearched] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setHasSearched(true)

        const url = 'http://api.giphy.com/v1/gifs/search'
        const API_KEY = 'bs8lQnELCCJjLdAB2WjtRN8qPKJsSRCb'
        const response = await axios.get(`${url}?api_key=${API_KEY}&q=${query}`)
        const data = response.data.data

        setSearchResults(data)

        console.log('searched!')
    }

    const handleChange = (event) => {
        setQuery(event.target.value)
        console.log('handle change!')
    }

    let searchFormContent = <Search
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        query={query}
    />

    let resultsContent = searchResults.map((result, idx) => {
        return <Results
            key={idx}
            data={result}
        />
    })


    return (
        <div>

            {searchFormContent}
            {hasSearched ? resultsContent : <></>}
        </div>
    )

}

export default SearchContainer;