import {useEffect,useState} from "react";
import axios from "axios";
import { Octokit } from "@octokit/core";


const useUserSearch = (query,pageNumber)=>{

  useEffect(()=>{
    const octokit = new Octokit({ auth: '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' });
      const response = await octokit.request('GET /search/users', {
      q: query,
      per_page:30,
      page: pageNumber
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
    // this.setState({results:arrOfNameImageObjects})
  },[query,pageNumber]
  )
  return null;
}