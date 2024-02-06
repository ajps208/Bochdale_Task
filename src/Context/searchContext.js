import React, { createContext, useState } from 'react';

// Create a context for managing search data
export const searchQuery = createContext();

function SearchContext({ children }) {
    // State to store search data
    const [searchData, setSearchData] = useState('');

    return (
        // Provide the search data and setSearchData function to the children components
        <searchQuery.Provider value={{ searchData, setSearchData }}>
            {children}
        </searchQuery.Provider>
    );
}

export default SearchContext;
