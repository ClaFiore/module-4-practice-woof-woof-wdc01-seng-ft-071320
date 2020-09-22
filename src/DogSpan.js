import React from 'react'

const DogSpan = (props) => {
    return(
        <span onClick={() => props.renderDog(props.dog)}>{props.dog.name}</span>
    )
}

export default DogSpan