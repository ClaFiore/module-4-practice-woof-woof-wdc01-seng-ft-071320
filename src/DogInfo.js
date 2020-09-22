import React from 'react'

const DogInfo = (props) => {

    const {name, image, isGoodDog} = props.dog

    return(
        <div>
            <img src={image}/>
            <h3>{name}</h3>
            <h3>{isGoodDog ? 'Good Dog' : 'Bad Dog'}</h3>
            <button onClick={() => props.changeCharacter(props.dog)}>Change Character</button>
        </div>
    )
}

export default DogInfo