import React,{ useState,useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
import {apiGet} from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";
import ActorGrid from "../components/actor/ActorGrid";
import {useLastQuery} from "../misc/custom-hooks";
import {RadioInputsWrapper, SearchButtonWrapper, SearchInput} from "./Home.styled";
import CustomRadio from "../components/CustomRadio";

const Home = () => {
    const [input,setInput] = useLastQuery();
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
            <SearchInput placeholder="Search for something" type="text" onChange={onInputChange} value={input} onKeyDown={onKeyDown}/>
            <RadioInputsWrapper>
                <div>
                    <CustomRadio label="Show" id="shows-search" value="show" onChange={onRadioChange} checked={isShowsSearch}/>
                </div>
                <div>
                    <CustomRadio label="Actors" id="actors-search" value="people" onChange={onRadioChange} checked={!isShowsSearch}/>
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type="button" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    )
};

export default Home;