import React from "react";
import './suggestions.styles.css';

const Suggestions = ({avatar,name})=>{
  return(
  <div className="suggestions--list">
    <img src={avatar} /> 
    <div className="name-container">
      <span className="name">{name}</span> 
    </div>
  </div>
)}

export default Suggestions;