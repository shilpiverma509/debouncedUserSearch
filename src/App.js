import './App.css';
import React from 'react';
import { Octokit } from "@octokit/core";

import SearchBar from './Components/search/SearchBar.jsx';
import Cards from "./Components/Cards/Cards.jsx";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery:"",
      results:[],
      activeSuggestions:"",
      filteredSuggestions:[],
      showSuggestions:false,
      error:null
    }
  }

  debounce = (func,delay)=>{
    console.log("g",delay);
    let timer;
    return function(){
      let context= this;
      let args = arguments;
      const later = function() {
        timer = null;
        func.apply(context, args);
      };
      clearTimeout(timer);
      timer = setTimeout(later, delay);
    };
    }

  search = this.debounce(async(query)=>{
    try{
      const octokit = new Octokit({ auth: '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' });
      const response = await octokit.request('GET /search/users', {
      q: query
    });

      const arrOfNameImageObjects = [];
      await Promise.all(response.data.items.map(async (item)=> {
        let newData = await octokit.request(item.url)
        if(newData){
          let objNameImage = {};
          objNameImage['name']=newData.data.name;
          objNameImage['avatar_url']=newData.data.avatar_url;
          objNameImage['id']=newData.data.id;
          arrOfNameImageObjects.push(objNameImage);
        }
      }))
    this.setState({results:arrOfNameImageObjects})
    }catch(err){
      this.setState({error:`No results`})
      console.log(`Unable to fetch result ${err.message}`);
    }
  },300);


  handleChange=(e)=>{
    this.setState({
      searchQuery:e.target.value,
    },()=>{
      this.state.searchQuery && this.search(this.state.searchQuery)
    })
  }


  render(){
    console.log("res",this.state.results)
    const suggestionData = this.state.results;
    return (
      <div className="app">
        <SearchBar value={this.state.searchQuery} onChange={this.handleChange} />
        {this.state.error?
          <p>{this.state.error}</p>
        :
          <Cards results={suggestionData} />
        }
      </div>
    )
  }
}

export default App;
