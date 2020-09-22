import React, { Component } from 'react';
import './App.css';
import DogSpan from './DogSpan'
import DogInfo from './DogInfo'

let pupsUrl = 'http://localhost:3000/pups/'

class App extends Component {

  state = {
    dogs: [],
    displayDog: 0,
    filter: false
  }

  componentDidMount(){
    fetch(pupsUrl)
    .then(res => res.json())
    .then(dogs => {
      this.setState({
        dogs: dogs
      })
    })
  }

  renderDog = (dog) => {
    this.setState({
      displayDog: dog
    })
  }

  changeCharacter = (dog) => {
    let clickedDog = {...dog, isGoodDog: !dog.isGoodDog}
      let updatedDogsArray = this.state.dogs.map(pup =>{
          if (pup.id === clickedDog.id){
            pup = clickedDog
          }
          return pup
        })
    this.setState({
      displayDog: clickedDog,
      dogs: updatedDogsArray
      })
    let configObj = {method: 'PATCH', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                    body: JSON.stringify(clickedDog)}
    fetch(pupsUrl+dog.id, configObj)
    .then(res=>res.json())
  }

  filterGoodDogs = (e) => {
    if (e.target.innerText === 'Filter good dogs: OFF'){
      e.target.innerText = 'Filter good dogs: ON'
      this.setState({
        filter: true
      })
    }else{
      e.target.innerText = 'Filter good dogs: OFF'
      this.setState({
        filter: false
      })
    }

  }

  render() {
    return(
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={(e) => this.filterGoodDogs(e)}>Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
          {
            this.state.filter ?
            this.state.dogs.filter(pup => pup.isGoodDog === true).map(dog => <DogSpan dog={dog} key={dog.id} renderDog={this.renderDog}/>)
            :
            this.state.dogs.map(dog => <DogSpan dog={dog} key={dog.id} renderDog={this.renderDog}/>)
          }
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {(this.state.displayDog === 0) ? null : <DogInfo dog={this.state.displayDog} changeCharacter={this.changeCharacter}/>}
        </div>
      </div>
    </div>
    )
  };
}

export default App;
