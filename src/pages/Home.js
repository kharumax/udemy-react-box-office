import React,{ useState,useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
import {apiGet} from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";
import ActorGrid from "../components/actor/ActorGrid";

const Home = () => {
    const [input,setInput] = useState(' ');
    const [results,setResults] = useState(null);
    const [searchOption,setSearchOption] = useState("shows");

    const isShowsSearch = searchOption === "shows";

    const onInputChange = (ev) => {
        setInput(ev.target.value)
    };

    const onSearch = () => {
        apiGet(`search/${searchOption}?q=${input}`).then(result => {
            setResults(result)
        });
    };
    const onKeyDown = (ev) => {
        if (ev.keyCode=== 13) {
            onSearch()
        }
    };
    const renderResults = () => {
      if (results && results.length === 0) {
          return <div>No Results</div>
      }
      if (results && results.length > 0) {
          return results[0].show ? <ShowGrid data={results}/> : <ActorGrid data={results}/>
      }
      return null;
    };

    const onRadioChange = (ev) => {
      setSearchOption(ev.target.value)
    };

    return (
        <MainPageLayout>
            <input placeholder="Search for something" type="text" onChange={onInputChange} value={input} onKeyDown={onKeyDown}/>
            <div>
                <label>Shows
                    <input id="show-search" type="radio" value="shows" onChange={onRadioChange} checked={isShowsSearch}/>
                </label>
                <label>Actors
                    <input id="actors-search" type="radio" value="people" onChange={onRadioChange} checked={!isShowsSearch}/>
                </label>
            </div>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
};

export default Home;