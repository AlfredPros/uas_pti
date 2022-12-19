import "../styles/stylesHome.css";
import dogLogo from "../resources/spike_logo.png";
import unmuted from "../resources/unmuted.png";
import muted from "../resources/muted.png";
import background_music from "../resources/background_music.mp3";
import select from "../resources/select.wav";
import Item1 from "../resources/Item1.ogg";
import Correct2 from "../resources/Correct2.wav";
import Miss from "../resources/Miss.ogg";
import dog_bark from "../resources/dog_bark.opus";
import kyaaa from "../resources/kyaaa.wav";
import Scream from "../resources/Scream.ogg";
import voice_human from "../resources/se_maoudamashii_voice_human02.ogg";
import Disappointment from "../resources/Disappointment.ogg";
import found from "../resources/found.wav";
import confirm from "../resources/confirm.wav";
import cancel from "../resources/cancel.wav";
import Victory from "../resources/Victory.wav";
import VictoryBoss from "../resources/VictoryBoss.wav";
import UI_Bell_2 from "../resources/UI_Bell_2.wav";
import UI_Dark from "../resources/UI_Dark.wav";
import UI_SciFi_Select from "../resources/UI_SciFi_Select.wav";
import Equip1 from "../resources/Equip1.ogg";
import bone_hidden from "../resources/bone_hidden.png";
import bone from "../resources/bone.png";

import spike_sleep from "../resources/spike_sleep.png";
import spike_awake from "../resources/spike_awake.png";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Game() {
  // Player
  const [players, setPlayers] = useState(["a", "b", "c", "d"]);
  const [playerTurn, setPlayerTurn] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Audio vars
  const [mute, setMute] = useState(false);

  // Timer vars
  const [seconds, setSeconds] = useState(0);
  const [miliSeconds, setMiliSeconds] = useState(0);
  const [timerToggle, setTimerToggle] = useState(0);

  // Table Bone vars
  const [num, setNum] = useState(players.length); // 4
  const [spacing, setSpacing] = useState(1.0 / num);
  const [temp, setTemp] = useState("");
  const [picked_correct_bone, setPicked_correct_bone] = useState(0);
  const [win, setWin] = useState(false);

  const [playerScores, setPlayerScores] = useState([]);

  /// Modal Functions
  // Function to show the appropriate modal prompt.
  function show_modal(prompt_type = "audio_prompt") {
    let myModal = new bootstrap.Modal(
      document.getElementById("staticBackdrop"),
      {}
    );

    switch (prompt_type) {
      case "audio_prompt": {
        $("#staticBackdropLabel").text("Do you want to turn on music?");
        $("#staticBackdropBody").empty();
        $("#continue").remove();
        $("#cancel").remove();

        $("#staticBackdropBody").append(
          "<b>We play music on our site.<br/>Please note the volume.</b>"
        );
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-4" data-bs-dismiss="modal" id="continue">Yes</button>'
        );
        $("#continue").click(function () {
          play_sound("confirm");
          play_music(false);
          continue_func();
        });
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-2" data-bs-dismiss="modal" id="cancel">No</button>'
        );
        $("#cancel").click(function () {
          play_sound("cancel");
          play_music(true);
          continue_func();
        });

        myModal.show();
        break;
      }

      case "player_lose": {
        let curr_player = players[playerTurn].name;

        $("#staticBackdropLabel").text("Spike Has Woken Up!");
        $("#staticBackdropBody").empty();
        $("#continue").remove();
        $("#cancel").remove();

        $("#staticBackdropBody").append(
          "<b>" +
            curr_player +
            " has been moved out from the game for causing a ruckus.<br/>You can proceed without them or start a new game.</b>"
        );
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-4" onclick="play_sound(\'confirm\'); continue_func()" data-bs-dismiss="modal" id="continue">Continue</button>'
        );
        $("#continue").click(function () {
          play_sound("confirm");
          play_music(false);
          continue_func();
        });
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-2" id="cancel">Start Over</button>'
        );
        $("#cancel").click(function () {
          play_sound("cancel");
          window.location.replace("index.html");
        });

        myModal.show();
        break;
      }

      case "player_late": {
        let curr_player = players[playerTurn].name;

        $("#staticBackdropLabel").text(curr_player + " is too late!");
        $("#staticBackdropBody").empty();
        $("#continue").remove();
        $("#cancel").remove();

        $("#staticBackdropBody").append(
          "<b>" +
            curr_player +
            " has been moved out from the game for being too slow.<br/>You can proceed without them or start a new game.</b>"
        );
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-4" data-bs-dismiss="modal" id="continue">Continue</button>'
        );
        $("#continue").click(function () {
          play_sound("confirm");
          continue_func();
        });
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-2" id="cancel">Start Over</button>'
        );
        $("#cancel").click(function () {
          play_sound("cancel");
          window.location.replace("index.html");
        });

        myModal.show();
        break;
      }

      case "player_win": {
        let curr_player = players[playerTurn].name;
        let next_player;
        if (playerTurn == players.length - 1) {
          next_player = players[0].name;
        } else {
          next_player = players[playerTurn + 1].name;
        }

        $("#staticBackdropLabel").text("Chicken Boner!");
        $("#staticBackdropBody").empty();
        $("#continue").remove();
        $("#cancel").remove();

        $("#staticBackdropBody").append(
          "<b>" +
            curr_player +
            " has been moved out from the game.<br/>Therefore, " +
            next_player +
            " has won the game! Congratulation!</b>"
        );
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-2" id="cancel">Start Over</button>'
        );
        $("#cancel").click(function () {
          play_sound("cancel");
          window.location.replace("index.html");
        });

        myModal.show();
        break;
      }

      case "player_tied": {
        $("#staticBackdropLabel").text("Mission Accomplished!");
        $("#staticBackdropBody").empty();
        $("#continue").remove();
        $("#cancel").remove();

        $("#staticBackdropBody").append(
          "<b>All safe bones have been picked!<br/>All players that survived can go home safely now!"
        );
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-4" id="cancel">The End</button>'
        );
        $("#cancel").click(function () {
          play_sound("confirm");
          window.location.replace("index.html");
        });

        myModal.show();
        break;
      }

      default:
        break;
    }
  }

  // Continue button function
  function continue_func() {
    //reset and start the timer
    setSeconds(9);
    setMiliSeconds(99);
    setTimerToggle(1);
    // reset footer
    $("#footer_text").text("Steal Spike's bones, but without waking him up!");

    //enlarge dog
    /*
    let doge = document.getElementById("dog");
    doge.style = {
      width: "100%",
      transition: "0.5s ease-in-out",
      transform: "scale(1.0)",
    };
    doge.src = spike_sleep;
    */

    // Hide backdrop
    $(".modal-backdrop").remove();
  }

  /// Audio Functions
  // Mute / Unmute
  function mute_func() {
    let mute_btn = document.getElementById("mute");
    let track = document.getElementById("background_music");

    if (track.muted === false) {
      mute_btn.src = muted;
      track.muted = true;
      setMute(true);
    } else if (track.muted === true) {
      mute_btn.src = unmuted;
      track.muted = false;
      setMute(false);
    } else alert("Error occured!");
  }

  // Music Function
  function play_music(mute_init = false) {
    setMute(false);
    $("#background_music")[0].play();

    if (mute_init == true) mute_func();
  }

  // Sound Function
  function play_sound(type) {
    // Sound effect

    if (mute == false) {
      switch (type) {
        case "bone1": {
          $("#sound_effect_bone1")[0].play();
          break;
        }
        case "bone2": {
          $("#sound_effect_bone2")[0].play();
          break;
        }
        case "bone3": {
          $("#sound_effect_bone3")[0].play();
          break;
        }
        case "bone4": {
          $("#sound_effect_bone4")[0].play();
          break;
        }

        case "doge1": {
          $("#sound_effect_doge1")[0].play();
          break;
        }
        case "doge2": {
          $("#sound_effect_doge2")[0].play();
          break;
        }
        case "doge3": {
          $("#sound_effect_doge3")[0].play();
          break;
        }
        case "doge4": {
          $("#sound_effect_doge4")[0].play();
          break;
        }
        case "doge5": {
          $("#sound_effect_doge5")[0].play();
          break;
        }
        case "doge6": {
          $("#sound_effect_doge6")[0].play();
          break;
        }

        case "confirm": {
          $("#sound_effect_confirm")[0].play();
          break;
        }

        case "cancel": {
          $("#sound_effect_cancel")[0].play();
          break;
        }

        case "victory1": {
          $("#sound_effect_victory1")[0].play();
          break;
        }
        case "victory2": {
          $("#sound_effect_victory2")[0].play();
          break;
        }

        case "hover1": {
          $("#sound_effect_hover1")[0].play();
          break;
        }
        case "hover2": {
          $("#sound_effect_hover2")[0].play();
          break;
        }
        case "hover3": {
          $("#sound_effect_hover3")[0].play();
          break;
        }
        case "hover4": {
          $("#sound_effect_hover4")[0].play();
          break;
        }

        default:
          break;
      }
    }
  }

  /// Table Bone Functions
  function randint(max) {
    // From 0 to max
    return Math.floor(Math.random() * max);
  }

  // Bone Behavior
  function dangerous_boners_selected() {
    // Timer stopped, show 00:00
    setTimerToggle(0);
    $("#timer").html("00:00");
    document.getElementById("timer").style.color = "#ff0000";

    //Doge expands, hide bone
    let doge = document.getElementById("dog");
    doge.style = {
      width: "100%",
      transition: "0.25s ease-in-out",
      transform: "scale(2.5)"
    };
    doge.src = spike_awake;

    //change score board color to red
    $("#" + players[playerTurn].name + "scoreboard").css("color", "#ff0000");

    //KickCurrentPlayer
    KickCurrentPlayer();
  }

  function safer_boners_selected() {
    setPicked_correct_bone(picked_correct_bone + 1);

    // Update player score
    $("#" + players[playerTurn].name + "scoreboard span").html(
      ++playerScores[playerTurn]
    );
    //setPlayerScores(...)

    // Check if all corect bones are picked
    if (picked_correct_bone == num * 3) {
      //stop the timer and declare victory
      setTimerToggle(0);
      setWin(true);
      show_modal("player_tied");
      // change footer
      $("#footer_text").text("EVERYONE THAT SURVIVED WINS!!!!!");
      play_sound("victory2");
    } else {
      // Time restarts
      setSeconds(9);
      setMiliSeconds(99);

      // Randomize sound
      let rand = randint(4) + 1;
      play_sound("bone" + rand);

      //next player's turn
      next_player_turn();
    }
  }

  function next_player_turn() {
    if (playerTurn == players.length - 1) {
      setPlayerTurn(0);
    } else {
      setPlayerTurn(playerTurn + 1);
    }
  }

  function bone_clicked(obj) {
    obj.src = bone_hidden;
    obj.style = { width: "100%" };

    if (obj.className == "dangerous_boners") {
      dangerous_boners_selected();
    } else {
      safer_boners_selected();
    }
    obj.onclick = "";
  }

  function hover_action() {
    // play random hover sound
    let rand = randint(4) + 1;
    play_sound("hover" + rand); // Sus
  }

  function initializeBones() {
    let playerScoresTemp = [];
    for (let i = 0; i < players.length; i++) playerScoresTemp.push(0);
    setPlayerScores(playerScoresTemp);

    // Code to select random bones
    let dangerBonerTemp = [];
    for (let i = 0; dangerBonerTemp.length < num; i++) {
      // Generate Random Number between 0 and 4*number of players
      const x = randint(4 * num);
      // Check if the number is already in danger_bones
      if (!dangerBonerTemp.includes(x)) {
        dangerBonerTemp.push(x);
      }
    }

    // Generating bones
    let id = 0;
    for (let i = 0; i < num + 2; i++) {
      let temp = "";
      temp += "<tr>";

      for (let j = 0; j < num + 2; j++) {
        if (i === 0) {
          // Header
          temp += '<th style="width: ' + spacing + '%">';
          if (!(j == 0 || j == num + 1)) {
            if (dangerBonerTemp.includes(id)) {
              temp +=
                '<img class="dangerous_boners" src=' +
                bone +
                ' style="width:100%; cursor:pointer;" id="bone' +
                id +
                '" draggable="false" oncontextmenu="return false"/>';
            } else {
              temp +=
                '<img class="safer_boners" src=' +
                bone +
                ' style="width:100%; cursor:pointer;" id="bone' +
                id +
                '" draggable="false" oncontextmenu="return false"/>';
            }
            id++;
          }
          temp += "</th>";
        } else if (i !== num + 1) {
          // Content
          if (j == 0 || j == 1) {
            if (dangerBonerTemp.includes(id)) {
              temp +=
                '<td> <img class="dangerous_boners" src=' +
                bone +
                ' style="width:100%; cursor:pointer;" id="bone' +
                id +
                '" draggable="false" oncontextmenu="return false"/> </td>';
            } else {
              temp +=
                '<td> <img class="safer_boners" src=' +
                bone +
                ' style="width:100%; cursor:pointer;" id="bone' +
                id +
                '" draggable="false" oncontextmenu="return false"/> </td>';
            }
            id++;
          }
          if (j == 0 && i == 1) {
            // Dog: id="dog"
            temp +=
              '<td colspan="' +
              num +
              '" rowspan="' +
              num +
              '"> <img src=' +
              spike_sleep +
              ' style="width:100%" id="dog" draggable="false" oncontextmenu="return false"/></td>';
          }
        } else {
          // Footer
          temp += "<td>";
          if (!(j == 0 || j == num + 1)) {
            if (dangerBonerTemp.includes(id)) {
              temp +=
                '<img class="dangerous_boners" src=' +
                bone +
                ' style="width:100%; cursor:pointer;" id="bone' +
                id +
                '" draggable="false" oncontextmenu="return false"/>';
            } else {
              temp +=
                '<img class="safer_boners" src=' +
                bone +
                ' style="width:100%; cursor:pointer;" id="bone' +
                id +
                '" draggable="false" oncontextmenu="return false"/>';
            }
            id++;
          }
          temp += "</td>";
        }
      }

      temp += "</tr>";

      $("#game-content").append(temp);

      // Set bone functions
      // Problem: this executes more than one.
      for (let i = 0; i < num * 4; i++) {
        let idName = "#bone" + i;
        $(idName).click(function () {
          bone_clicked(this);
        });
        $(idName).mouseover(function () {
          hover_action();
        });
      }
    }
  }

  useEffect(() => {
    if (location.state == null) {
      navigate("/");
      return;
    }
    show_modal("audio_prompt");
    // Get players from Router
    setPlayers(location.state.players.map((object) => object.player_name));
    initializeBones();
  }, []);

  return (
    <>
      {
        // Header
      }
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-12 col-md-1 offset-md-1">
            <a href="index.html">
              <button className="button btn-primary btn-block btn-2">
                Back
              </button>
            </a>
          </div>
          <div className="col-md-8 text-center">
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
        </div>
        <hr />
      </div>

      {
        // Content
      }
      <div className="container">
        <div className="row">
          <div className="col text-start order-1">
            {
              // Left
            }
            <p>
              Turns: <span id="player-turn">1</span>
            </p>
            <p>
              Timer: <span id="timer">00:00</span>
            </p>
            <div
              id="player-list"
              className="boxplayer rounded p-4 text-start justify-content-sm-center me-5"
            ></div>
          </div>

          <div className="col-md-6 col-sm-12 text-center justify-content-center order-3">
            {
              // Middle
            }
            <table>
              <tbody id="game-content"></tbody>
            </table>

            <div className="row mt-5">
              <p
                id="footer_text"
                style={{ fontWeight: "bold", fontSize: "1.25em" }}
              >
                Steal Spike's bones, but without waking him up!
              </p>
            </div>
          </div>

          <div className="col order-2 order-md-3 text-end">
            {
              // Right
            }
            <img
              src={unmuted}
              style={{ width: "calc(24px + 3vw)", cursor: "pointer" }}
              id="mute"
              onClick={mute_func}
              draggable="false"
              onContextMenu={() => {
                return false;
              }}
            />
            <audio src={background_music} id="background_music" loop>
              music bgm
            </audio>
            <audio src={select} id="sound_effect_bone1">
              sound bone1
            </audio>
            <audio src={Item1} id="sound_effect_bone2">
              sound bone2
            </audio>
            <audio src={Correct2} id="sound_effect_bone3">
              sound bone3
            </audio>
            <audio src={Miss} id="sound_effect_bone4">
              sound bone4
            </audio>
            <audio src={dog_bark} id="sound_effect_doge1">
              sound doge1
            </audio>
            <audio src={kyaaa} id="sound_effect_doge2">
              sound doge2
            </audio>
            <audio src={Scream} id="sound_effect_doge3">
              sound doge3
            </audio>
            <audio src={voice_human} id="sound_effect_doge4">
              sound doge4
            </audio>
            <audio src={Disappointment} id="sound_effect_doge5">
              sound doge5
            </audio>
            <audio src={found} id="sound_effect_doge6">
              sound doge6
            </audio>
            <audio src={confirm} id="sound_effect_confirm">
              sound confirm
            </audio>
            <audio src={cancel} id="sound_effect_cancel">
              sound cancel
            </audio>
            <audio src={Victory} id="sound_effect_victory1">
              sound victory1
            </audio>
            <audio src={VictoryBoss} id="sound_effect_victory2">
              sound victory2
            </audio>
            <audio src={UI_Bell_2} id="sound_effect_hover1">
              sound hover1
            </audio>
            <audio src={UI_Dark} id="sound_effect_hover2">
              sound hover2
            </audio>
            <audio src={UI_SciFi_Select} id="sound_effect_hover3">
              sound hover3
            </audio>
            <audio src={Equip1} id="sound_effect_hover4">
              sound hover4
            </audio>
          </div>
        </div>
      </div>

      {
        // Modal
      }
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-background">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel"></h5>
            </div>
            <div className="modal-body" id="staticBackdropBody"></div>
            <div className="modal-footer" id="staticBackdropFooter"></div>
          </div>
        </div>
      </div>
    </>
  );
}
