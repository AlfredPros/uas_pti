import "../styles/stylesHome.css";
import dogLogo from "../resources/spike_logo.png";
import unmuted from "../resources/unmuted.png";
import React, { useEffect, useState, useRef } from "react";

export default function Game() {
  const [mute, setMute] = useState(false);

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
          '<button type="button" class="button btn-primary btn-block btn-4" onclick="play_sound(\'confirm\'); play_music(false); continue_func();" data-bs-dismiss="modal" id="continue">Yes</button>'
        );
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-2" onclick="play_sound(\'cancel\'); play_music(true); continue_func();" data-bs-dismiss="modal" id="cancel">No</button>'
        );

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
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-2" onclick="play_sound(\'cancel\'); window.location.replace(\'index.html\');" id="cancel">Start Over</button>'
        );

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
          '<button type="button" class="button btn-primary btn-block btn-4" onclick="play_sound(\'confirm\'); continue_func()" data-bs-dismiss="modal" id="continue">Continue</button>'
        );
        $("#staticBackdropFooter").append(
          '<button type="button" class="button btn-primary btn-block btn-2" onclick="play_sound(\'cancel\'); window.location.replace(\'index.html\');" id="cancel">Start Over</button>'
        );

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
          '<button type="button" class="button btn-primary btn-block btn-2" onclick="play_sound(\'cancel\'); window.location.replace(\'index.html\');" id="cancel">Start Over</button>'
        );

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
          '<button type="button" class="button btn-primary btn-block btn-4" onclick="play_sound(\'confirm\'); window.location.replace(\'index.html\');" id="cancel">The End</button>'
        );

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
    seconds = 9;
    miliSeconds = 99;
    timerToggle = 1;
    // reset footer
    $("#footer_text").text("Steal Spike's bones, but without waking him up!");

    //enlarge dog
    let doge = document.getElementById("dog");
    doge.style =
      "width:100%; transition: 0.5s ease-in-out; transform: scale(1.0);";
    doge.src = "resources/spike-sleep.png";
  }

  // Mute / Unmute
  function mute_func() {
    let mute_btn = document.getElementById("mute");
    let track = document.getElementById("background_music");

    dir = mute_btn.src;

    dir = dir.split("/");

    path = "";
    for (i = 0; i < dir.length - 1; i++) {
      path = path + dir[i] + "/";
    }

    if (dir[dir.length - 1] == "unmuted.png") {
      path = path + "muted.png";
      mute_btn.src = path;
      track.muted = true;
      setMute(true);
    } else if (dir[dir.length - 1] == "muted.png") {
      path = path + "unmuted.png";
      mute_btn.src = path;
      track.muted = false;
      setMute(false);
    } else alert("Error occured!");
  }

  // Music function
  function play_music(mute_init = false) {
    setMute(false);
    $("#background_music")[0].play();

    if (mute_init == true) mute_func();
  }

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

  useEffect(() => {
    show_modal("audio_prompt");
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
              onClick="{mute_func()}"
              draggable="false"
              onContextMenu={() => {
                return false;
              }}
            />
            <audio
              src={require("../resources/background_music.mp3")}
              id="background_music"
              loop
            >
              music bgm
            </audio>
            <audio
              src={require("../resources/select.wav")}
              id="sound_effect_bone1"
            >
              sound bone1
            </audio>
            <audio
              src={require("../resources/Item1.ogg")}
              id="sound_effect_bone2"
            >
              sound bone2
            </audio>
            <audio
              src={require("../resources/Correct2.wav")}
              id="sound_effect_bone3"
            >
              sound bone3
            </audio>
            <audio
              src={require("../resources/Miss.ogg")}
              id="sound_effect_bone4"
            >
              sound bone4
            </audio>
            <audio
              src={require("../resources/dog_bark.opus")}
              id="sound_effect_doge1"
            >
              sound doge1
            </audio>
            <audio
              src={require("../resources/kyaaa.wav")}
              id="sound_effect_doge2"
            >
              sound doge2
            </audio>
            <audio
              src={require("../resources/Scream.ogg")}
              id="sound_effect_doge3"
            >
              sound doge3
            </audio>
            <audio
              src={require("../resources/se_maoudamashii_voice_human02.ogg")}
              id="sound_effect_doge4"
            >
              sound doge4
            </audio>
            <audio
              src={require("../resources/Disappointment.ogg")}
              id="sound_effect_doge5"
            >
              sound doge5
            </audio>
            <audio
              src={require("../resources/found.wav")}
              id="sound_effect_doge6"
            >
              sound doge6
            </audio>
            <audio
              src={require("../resources/confirm.wav")}
              id="sound_effect_confirm"
            >
              sound confirm
            </audio>
            <audio
              src={require("../resources/cancel.wav")}
              id="sound_effect_cancel"
            >
              sound cancel
            </audio>
            <audio
              src={require("../resources/Victory.wav")}
              id="sound_effect_victory1"
            >
              sound victory1
            </audio>
            <audio
              src={require("../resources/VictoryBoss.wav")}
              id="sound_effect_victory2"
            >
              sound victory2
            </audio>
            <audio
              src={require("../resources/UI_Bell_2.wav")}
              id="sound_effect_hover1"
            >
              sound hover1
            </audio>
            <audio
              src={require("../resources/UI_Dark.wav")}
              id="sound_effect_hover2"
            >
              sound hover2
            </audio>
            <audio
              src={require("../resources/UI_Sci-Fi_Select.wav")}
              id="sound_effect_hover3"
            >
              sound hover3
            </audio>
            <audio
              src={require("../resources/Equip1.ogg")}
              id="sound_effect_hover4"
            >
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
