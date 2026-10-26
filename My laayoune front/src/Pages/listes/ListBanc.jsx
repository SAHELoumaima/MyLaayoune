import React, { useState } from 'react';
import "./lll.css";
import Rating from 'react-rating-stars-component';




function ListBanc() {

    // Rating
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (

        <div>
            <h2 style={{ color: '#a67003', textAlign: 'center', fontSize: '50px' }}>Liste of Banc</h2>

            <div className="searchItem">
                <img
                    src=""
                    alt=""
                    className="siImg" />
                <div className="siDesc">
                    <h1 className="siTitle">Banc 1</h1>
                    <span className="siDistance">50m from center</span>
                    <span className="siSubtitle"> Relaxed rooms & suites </span>
                    <span className="siTaxiOp"> +212 5288-94168</span>
                </div>
                <div className="siDetails">
                    <div className="siRating">
                     <Rating
                        count={5}
                        value={rating}
                        onChange={handleRatingChange}
                        size={24}
                        activeColor="#ffd700"
                        />

                        {/* Add your own rating component */}

                    </div>
                    <div className="siDetailTexts">

                        <button className="siCheckButton">See Details</button>
                    </div>
                </div>
            </div></div>

    )

}

export default ListBanc;