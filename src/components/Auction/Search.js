import React from 'react';

function Search({setQuery, t}) {
    return (
        <>
            <input 
                type="text"
                placeholder={t('search.search')}
                className="auctionMenuInput" 
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
        </>
    )
}
export default Search;