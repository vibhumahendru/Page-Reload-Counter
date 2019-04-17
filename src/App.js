import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

componentDidMount(){
  fetch('http://localhost:3000/users')
.then(res=> res.json())
.then(userObjects=> {
  this.setState({
      reloadCount: userObjects.length +1,
      usersAr:userObjects
    })
  })

  fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application.json'
      },
      body: JSON.stringify({
        name: "no name was entered :("
      })
    }
  ).then(res=> res.json()).then(res=>console.log(res))

}

state = {
  reloadCount:null,
  usersAr:[],
  name:"",
  nameDone: false
}

handleNameInput=(event)=>{
  this.setState({
    name:event.target.value
  })
}

handleSubmitName=()=>{
  if (!this.state.nameDone) {
  fetch(`http://localhost:3000/users/${this.state.reloadCount}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application.json'
      },
      body: JSON.stringify({
        name: this.state.name,
        userId: this.state.reloadCount
      })
    }
  ).then(res=>res.json()).then((res)=>{
    let updatedAr = [...this.state.usersAr]
    updatedAr.push(res)
    this.setState({
      usersAr:updatedAr,
      nameDone: true
    })
  })
  }
  else{alert("You've already been here, mate. Relaod page again.")}
}

handleReload=()=>{
  window.location.reload();
}


  render() {
    return (
      <>
      <div className="App">
        <div>
          <h1>This page has been reloaded:</h1>
          <h1>{this.state.reloadCount}</h1>
          <h1>times since inception</h1>
          <br></br>
          <p>Enter your name below, so we know you were here.</p>
          {this.state.nameDone ? <p>Thanks! Now we know.</p>:<input placeholder="name" onChange={(event)=>this.handleNameInput(event)}type="text"></input> }
          {this.state.nameDone?<button onClick={this.handleReload}>RELOAD!</button>:<button onClick={this.handleSubmitName}>Submit</button>}
        </div>

      </div>
      <div>
        <h2>Site Visitors</h2>
          <ol>{this.state.usersAr.map(el=><li>{el.name}</li>)}</ol>
      </div>
      <br></br>
      <p>* press command + R to refresh</p>
      </>
    );
  }
}

export default App;
