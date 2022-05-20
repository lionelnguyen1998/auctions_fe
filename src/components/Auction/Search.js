import React from 'react';

function Search({setQuery}) {
    return (
        <>
            <input 
                type="text"
                placeholder="検索" 
                className="auctionMenuInput" 
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
        </>
    )
}
export default Search;