import React from "react";
import Suggestions from "../suggestions/Suggestions";
import './cards.styles.css';

const Cards = (props)=>{
  return(
    <div className="cards">
      {props.results.map((data)=>(
        <Suggestions key={data.id} avatar={data.avatar_url} name={data.name} />
      ))}
    </div>
  )
}

export default Cards;