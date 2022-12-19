import "../styles/stylesHome.css";
import dogLogo from "../resources/spike_logo.png";
import unknown from "../resources/unknown.png";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  function addPlayer() {
    if (players.length >= 5) {
      alert("Cannot add more players!");
      setName("");
      return;
    }
    if (name.length < 1) {
      alert("Please Input Name");
      return;
    }
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === name) {
        alert("Player already exists");
        return;
      }
    }
    setName("");
    setPlayers([...players, { name: name, score: 0 }]);
    console.log(players);
  }

  function playGame() {
    if (players.length < 2) {
      alert("Must be more than one player!!!");
      return;
    }

    navigate("/game", {
      state: { players },
    });
  }

  useEffect(() => {
    // Reset everything back
    $("body").css("background", "url(" + unknown + ")");
    $("body").css("background-attachment", "fixed");
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <h2 className="text-center" id="judul">
          Don't Take Spike's Bones
        </h2>
        <img
          id="logo"
          className="img-fluid mx-auto my-2"
          src={dogLogo}
          alt="SPIKE"
          draggable="false"
          onContextMenu={() => {
            return false;
          }}
        />
      </div>

      <hr />

      <div className="myFlexContainer2">
        <div id="instruction">
          <p style={{ textAlign: "center" }}>Game Instruction:</p>
          <ol>
            <li>Each turn, different players takes a bone.</li>
            <li>If dangerous bone is picked, the player lose.</li>
            <li>If there is only one man standing, they win.</li>
            <li>There are only 2 to 5 players.</li>
            <li>Have fun!</li>
          </ol>
        </div>

        <div id="player" className="d-flex align-items-center playerDIV">
          <p style={{ paddingBlock: "auto" }} id="insertplayer">
            {players.length < 5
              ? "Insert Player #" + (players.length + 1)
              : "Game Full !!!"}
          </p>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="playerInput"
            ref={inputRef}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                addPlayer();
              }
            }}
            placeholder="New Player"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="floatingInput">New Player</label>
        </div>

        <div className="myFlexContainer">
          <button
            id="addPlayerButton"
            onClick={addPlayer}
            style={{ width: "12rem" }}
            className="button btn-primary btn-block btn-1"
          >
            Add player
          </button>
          <button
            id="playButton"
            onClick={playGame}
            style={{ width: "12rem" }}
            className="button btn-primary btn-block btn-1"
          >
            Play
          </button>
        </div>

        <div className="m-3 px-5 boxplayer rounded ">
          <p id="player">Player List</p>
          <ol id="playerList" style={{ paddingLeft: "0px" }}>
            {players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
