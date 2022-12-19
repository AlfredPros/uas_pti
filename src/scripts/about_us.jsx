import "../styles/stylesAboutUs.css";
import React from "react";
import Card from "./card";
import contacts from "./contacts.js";
import { useNavigate } from "react-router-dom";

function createCard(contact) {
  return (
    <Card
      key={contact.id}
      name={contact.name}
      imgURL={contact.imgURL}
      nim={contact.nim}
      email={contact.email}
    />
  );
}

function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-12 col-md-1 offset-md-1">
            <button
              className="button btn-primary btn-block btn-2"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button>
          </div>
          <div className="col-md-8 text-center">
            <h2 className="text-center" id="judul">
              Group Profile
            </h2>
          </div>
        </div>
        <hr />
      </div>
      <div className="mt-5">{contacts.map(createCard)}</div>
    </>
  );
}

export default AboutUs;
