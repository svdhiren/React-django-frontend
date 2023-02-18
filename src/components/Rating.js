import React from 'react'

const stars = n => {
    let ar = [];
    let key=1;
    for(let i = 0; i < Math.floor(n); i++){
        ar.push(<i key={key} style={{color: '#f8e825'}} className="fa-solid fa-star"></i>);
        key += 1;
    }
    
    if(Math.floor(n) !== Math.ceil(n)){
        ar.push(<i key={key} style={{color: '#f8e825'}} className="fa-solid fa-star-half-stroke"></i>);
        key += 1;
    }

    let rem = 5-Math.ceil(n);
    for(let i=0; i<rem;i++){
        ar.push(<i key={key} style={{color: '#f8e825'}} className="fa-regular fa-star"></i>);
        key += 1;
    }

    return ar;
}

function Rating({value, num}) {

    return (
    <div>
    {
        num >= 1 ? 
        <div>
        {stars(value)} ({num})
        </div>
        : 
        <div>No reviews yet</div>
    }
    </div>
    )
}

export default Rating