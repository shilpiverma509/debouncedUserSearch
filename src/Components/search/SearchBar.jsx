import React from "react";
import './search.css';

const SearchBar =(props)=>{
  return (
    <div className="searchBar">
      <input
        type="search"
        onChange={props.onChange}
        placeholder={props.placeholder}
       />
    </div>
  )
}

export default SearchBar;