import React from "react";
import Card from "./Card";
import Contacts from "../contacts.js";
function App() {
  return (
    <div>
      <h1 className="heading">About us</h1>
      <Card
        img={Contacts[0].imgURL}
        name={Contacts[0].name}
        nim={Contacts[0].nim}
        email={Contacts[0].email}
      />
      <Card
        img={Contacts[1].imgURL}
        name={Contacts[1].name}
        nim={Contacts[1].nim}
        email={Contacts[1].email}
      />
      <Card
        img={Contacts[2].imgURL}
        name={Contacts[2].name}
        nim={Contacts[2].nim}
        email={Contacts[2].email}
      />
      <Card  
        img={Contacts[2].imgURL}
        name={Contacts[2].name}
        nim={Contacts[2].nim}
        email={Contacts[2].email}
      />  
    </div>
  );
}

export default App;