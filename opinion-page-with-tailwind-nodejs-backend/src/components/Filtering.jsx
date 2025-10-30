
import { OpinionsContext } from '../store/opinions-context';
import './filteringStyling.css';

import { useState,useContext } from 'react';

function Filtering() {
    const [activeButton, setActiveButton] = useState();
    const { mostVoted , latestOpinions} = useContext(OpinionsContext);
    const handleSortClick = (sortType) => {
    setActiveButton(sortType);
    if(sortType === 'popular'){
        mostVoted();
    }else{
        latestOpinions();
    }
    //onFilterChange('sort', sortType);
  };
    return (
        <section className='filter - bar'>
            <div className="filter-sort-buttons">
                <button
                    className={activeButton === "popular" ? "active" : ""}
                    onClick={() => handleSortClick("popular")}
                >
                    Most Voted
                </button>
                <button
                    className={activeButton === "newest" ? "active" : ""}
                    onClick={() => handleSortClick("newest")}
                >
                    Newest
                </button>
            </div>
        </section>
    );
}

export default Filtering;
