import React, { Component } from "react";
import db from "./firebase";

const makeList = obj => {
  return Object.keys(obj).map(key => {
    const item = obj[key];
    item.key = key;
    return item;
  });
};

class App extends Component {
  state = {
    weapons: [],
    isTyping: false,
    weaponNameValue: "",
    damageValue: "",
    userName: null,
    typer: null
  };

  componentDidMount() {
    db.ref("typer").on("value", snapshot => {
      this.setState({ typer: snapshot.val() || /*<-- this means or*/ [] });
    });
    db.ref("weapons").on("value", snapshot => {
      this.setState({ weapons: snapshot.val() || /*<-- this means or*/ [] });
    });
    db.ref("isTyping").on("value", snapshot => {
      this.setState({
        isTyping: snapshot.val() || false
      });
    });
  }

  handleChange = stateKey => event => {
    this.setState(
      {
        [stateKey]: event.target.value
      },
      () => {
        let isTyping = false;
        if (this.state.weaponNameValue !== "") {
          isTyping = true;
        }
        if (this.state.damageValue !== "") {
          isTyping = true;
        }
        db.ref("/isTyping").set(isTyping);
        db.ref("/typer").set(this.state.userName);
      }
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    db.ref("/weapons").push({
      name: this.refs.nameInput.value,
      damage: this.refs.damageInput.value
    });
    this.state.weaponNameValue = "";
    this.state.damageValue = "";
    db.ref("/isTyping").set(false);
    this.refs.nameInput.focus();
  };

  handleSubmitUser = event => {
    event.preventDefault();
    this.setState({
      userName: this.refs.userNameInput.value
    });
  };

  render() {
    const {
      isTyping,
      weapons,
      weaponNameValue,
      damageValue,
      userName,
      typer
    } = this.state; /*this is a nickname so I don't have to type this.state.weapons every time*/
    return (
      <div className="App">
        {userName
          ? <div>
              <h3>Hello, {userName}.</h3>
              <ul>
                {makeList(weapons).map(weapon =>
                  <li key={weapon.key} style={{ marginBottom: 10 }}>
                    Name : <b>{weapon.name}</b>
                    <br /> Damage :
                    {" "}
                    <span style={{ color: "blue" }}>{weapon.damage}</span>
                  </li>
                )}
              </ul>

              {isTyping === true
                ? <p style={{ color: "red" }}>{typer} is typing...</p>
                : <div />}
              <form onSubmit={this.handleSubmit}>
                Weapon Name :<input
                  ref="nameInput"
                  value={weaponNameValue}
                  onChange={this.handleChange("weaponNameValue")}
                />
                <br />Damage:<input
                  ref="damageInput"
                  value={damageValue}
                  onChange={this.handleChange("damageValue")}
                />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
          : <div>
              What is your name, user?
              <form onSubmit={this.handleSubmitUser}>
                <input ref="userNameInput" />
                <button type="submit">Submit</button>

              </form>
            </div>}
      </div>
    );
  }
}

export default App;
