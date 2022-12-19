import "../styles/stylesGame.css";
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

import umnPagi from "../resources/umn_pagi.webp";
import umnSiang from "../resources/umn_siang.jpg";
import umnMalam from "../resources/umn_malam.jpg";
import clearSkyDay from "../resources/weather/01d@4x.png";
import clearSkyNight from "../resources/weather/01d@4x.png";
import fewCloudsDay from "../resources/weather/02d@4x.png";
import fewCloudsNight from "../resources/weather/02n@4x.png";
import scatteredCloudsDay from "../resources/weather/03d@4x.png";
import scatteredCloudsNight from "../resources/weather/03n@4x.png";
import brokenCloudsDay from "../resources/weather/04d@4x.png";
import brokenCloudsNight from "../resources/weather/04n@4x.png";
import showerRainDay from "../resources/weather/09d@4x.png";
import showerRainNight from "../resources/weather/09n@4x.png";
import rainDay from "../resources/weather/10d@4x.png";
import rainNight from "../resources/weather/10n@4x.png";
import thunderstormDay from "../resources/weather/11d@4x.png";
import thunderstormNight from "../resources/weather/11n@4x.png";
import snowDay from "../resources/weather/13d@4x.png";
import snowNight from "../resources/weather/13n@4x.png";
import mistDay from "../resources/weather/50d@4x.png";
import mistNight from "../resources/weather/50n@4x.png";

import spike_sleep from "../resources/spike_sleep.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Game() {
  // Player
  const [players, setPlayers] = useState(["a", "b", "c", "d", "e", "f"]);
  var playerTurn = 0;
  const location = useLocation();
  const navigate = useNavigate();

  // Timer vars
  // const [seconds, setSeconds] = useState(10);
  var seconds = 10;
  // const [miliSeconds, setMiliSeconds] = useState(60);
  var miliSeconds = 60;
  const [timerToggle, setTimerToggle] = useState(false);

  const calculateTimeLeft = () => {
    // const difference = 10000;
    let time = {};
    time = {
      seconds: Math.floor((difference / 1000) % 60),
      milliseconds: Math.floor((difference / 1000) % 600),
    };
    return time;
  };

  const [timeLeft, setTimeLeft] = useState({ seconds: 9, milliseconds: 999 });

  useEffect(() => {
    timeLeft.seconds > 0 &&
      timerToggle &&
      setTimeout(() => {
        setTimeLeft((prevTime) => {
          if (prevTime.milliseconds < 10) {
            const difference = 10 - prevTime.milliseconds;
            return {
              seconds: prevTime.seconds - 1,
              milliseconds: 999 - difference,
            };
          }
          return {
            seconds: prevTime.seconds,
            milliseconds: prevTime.milliseconds - 10,
          };
        });
      }, 10);
    if (timeLeft.seconds <= 0) KickCurrentPlayer((late = true));
  }, [timerToggle, timeLeft]);
  // var timerToggle = 0;
  var late = false;

  // Table Bone vars
  const [tableCreated, setTableCreated] = useState(false);

  // API Variables
  var dogeImg = { spike_sleep };
  var weatherIcon = clearSkyDay;
  var weatherMain = "Clear";

  // const [playerScores, setPlayerScores] = useState([]);

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
          '<button type="button" class="button btn-primary btn-block btn-4" data-bs-dismiss="modal" id="continue">Continue</button>'
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
          $(".modal-backdrop").remove();
          navigate("/");
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
          $(".modal-backdrop").remove();
          navigate("/");
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
          $(".modal-backdrop").remove();
          navigate("/");
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
          $(".modal-backdrop").remove();
          navigate("/");
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
    seconds = 9;
    miliSeconds = 99;
    // timerToggle = 1;
    setTimeLeft({ seconds: 9, milliseconds: 999 });
    setTimerToggle(true);

    // reset footer
    $("#footer_text").text("Steal Spike's bones, but without waking him up!");

    //ensmall dog
    $("#dog").css("transition", "0.5s ease-in-out");
    $("#dog").css("transform", "scale(1.0)");

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
    } else if (track.muted === true) {
      mute_btn.src = unmuted;
      track.muted = false;
    } else alert("Error occured!");
  }

  // Music Function
  function play_music(mute_init = false) {
    $("#background_music")[0].play();

    if (mute_init == true) mute_func();
  }

  // Sound Function
  function play_sound(type) {
    let track = document.getElementById("background_music");

    // Sound effect

    if (track.muted === false) {
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
    // timerToggle = 0;
    // $("#timer").html("00:00");
    // document.getElementById("timer").style.color = "#ff0000";
    setTimerToggle(false);
    //Doge expands, hide bone
    $("#dog").css("transition", "0.25s ease-in-out");
    $("#dog").css("transform", "scale(2.5)");

    //change score board color to red
    //$("#" + players[playerTurn].name + "scoreboard").css("color", "#ff0000");

    //KickCurrentPlayer
    KickCurrentPlayer();
  }

  function KickCurrentPlayer(late) {
    //if the remaining player is the last one standing, declare victory
    let playerLength = players.length;
    console.log("PlayerLength", playerLength);
    if (playerLength - 1 === 1) {
      play_sound("victory1");
      // change footer
      $("#footer_text").text("YOU WON!!!!!");
      show_modal("player_win");
    } else {
      if (late == true) {
        //change score board color to red
        $("#" + players[playerTurn].name + "scoreboard").css(
          "color",
          "#ff0000"
        );
        // change footer
        $("#footer_text").text("YOU RAN OUT OF TIME!!!!!");
        play_sound("doge5");

        show_modal("player_late");
      }
      // If player lost but there are player 2+ remaining
      else {
        // Randomize sound
        let rand = randint(4) + 1;
        play_sound("doge" + rand);
        rand = randint(2);
        if (rand == 0) play_sound("doge5");
        else play_sound("doge6");

        // change footer
        $("#footer_text").text("YOU LOST!!!!!");

        show_modal("player_lose");
      }
    }

    //remove current player
    setPlayers((currentPlayer) => {
      return currentPlayer.filter((player, index) => index != playerTurn);
    });

    //if kicked player is the last player in the queue, go to first player in the queue
    if (playerTurn >= players.length) {
      playerTurn = 0;
    }
  }

  var picked_correct_boner = 0;
  function safer_boners_selected() {
    setTimeLeft({ seconds: 9, milliseconds: 999 });
    console.log(players.length);
    picked_correct_boner++;
    setPlayers((currentPlayers) =>
      currentPlayers.map((player, index) => {
        let comp = playerTurn - 1;
        // if (playerTurn < 0)
        if (comp < 0) comp = players.length - 1;
        console.log(comp);
        if (index === comp) {
          return { ...player, score: player.score + 1 };
        }
        return player;
      }, next_player())
    );

    // Check if all corect bones are picked
    let num = players.length;
    if (picked_correct_boner === num * 3) {
      //stop the timer and declare victory
      // timerToggle = 0;
      setTimerToggle(false);
      show_modal("player_tied");
      // change footer
      $("#footer_text").text("EVERYONE THAT SURVIVED WINS!!!!!");
      play_sound(VictoryBoss);
    } else {
      // Time restarts
      seconds = 9;
      miliSeconds = 99;

      // Randomize sound
      let rand = randint(4) + 1;
      play_sound("bone" + rand);
    }
  }

  function next_player() {
    playerTurn = (playerTurn + 1) % players.length;
  }

  function bone_clicked(obj) {
    obj.src = bone_hidden;

    let idName = "#" + obj.id;
    $(idName).off();
    $(idName).css("cursor", "");

    if (obj.className == "dangerous_boners") {
      dangerous_boners_selected();
    } else {
      safer_boners_selected();
    }
  }

  function hover_action() {
    // play random hover sound
    let rand = randint(4) + 1;
    play_sound("hover" + rand); // Sus
  }

  function initializeBones() {
    if (players.length > 5) return;

    // Code to select random bones
    let num = players.length;
    let spacing = 1 / num;
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
              dogeImg +
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
    }

    // Set bone functions
    for (let i = 0; i < num * 4; i++) {
      let idName = "#bone" + i;
      $(idName).click(function () {
        bone_clicked(this);
      });
      $(idName).mouseover(function () {
        hover_action();
      });
    }

    setTableCreated(true);
  }

  useEffect(() => {
    // Fetch doge
    const urlDoge = "https://dog.ceo/api/breed/shiba/images/random";
    fetch(urlDoge)
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "success") {
          console.log("Fetch failed");
        } else {
          dogeImg = data.message;
          let doge = document.getElementById("dog");
          doge.src = data.message;
          console.log("Fetch doge success! ", data.message);
        }
      });

    let date = new Date();
    let hour = date.getHours();
    // Change background according to time
    if (hour >= 18 || hour < 5) {
      console.log("umnMalam");
      $("body").css("background", "none");
      $("body").css("background", "url(" + umnMalam + ")");
    } else if (hour >= 11) {
      console.log("umnSiang");
      $("body").css("background", "none");
      $("body").css("background", "url(" + umnSiang + ")");
    } else if (hour >= 5) {
      console.log("umnPagi");
      $("body").css("background", "none");
      $("body").css("background", "url(" + umnPagi + ")");
    } else {
      console.log("Hour is outside range.");
    }
    $("body").css("background-attachment", "fixed");

    // Fetch weather
    const urlWeather =
      "https://api.openweathermap.org/data/2.5/weather?lat=-6.256200674087959&lon=106.61819479260977&appid=1c167086e928d4d955efbe5061f3371b";
    fetch(urlWeather)
      .then((response) => response.json())
      .then((data) => {
        let weather = data.weather[0];
        weatherMain = weather.main;
        let icon = weather.icon;

        switch (icon) {
          case "01d": {
            weatherIcon = clearSkyDay;
            break;
          }
          case "01n": {
            weatherIcon = clearSkyNight;
            break;
          }
          case "02d": {
            weatherIcon = fewCloudsDay;
            break;
          }
          case "02n": {
            weatherIcon = fewCloudsNight;
            break;
          }
          case "03d": {
            weatherIcon = scatteredCloudsDay;
            break;
          }
          case "03n": {
            weatherIcon = scatteredCloudsNight;
            break;
          }
          case "04d": {
            weatherIcon = brokenCloudsDay;
            break;
          }
          case "04n": {
            weatherIcon = brokenCloudsNight;
            break;
          }
          case "09d": {
            weatherIcon = showerRainDay;
            break;
          }
          case "09n": {
            weatherIcon = showerRainNight;
            break;
          }
          case "10d": {
            weatherIcon = rainDay;
            break;
          }
          case "10n": {
            weatherIcon = rainNight;
            break;
          }
          case "11d": {
            weatherIcon = thunderstormDay;
            break;
          }
          case "11n": {
            weatherIcon = thunderstormNight;
            break;
          }
          case "13d": {
            weatherIcon = snowDay;
            break;
          }
          case "13n": {
            weatherIcon = snowNight;
            break;
          }
          case "50d": {
            weatherIcon = mistDay;
            break;
          }
          case "50n": {
            weatherIcon = mistNight;
            break;
          }
          default: {
            weatherIcon = clearSkyDay;
          }
        }

        let weatherLogo = document.getElementById("weather_logo");
        weatherLogo.src = weatherIcon;
        weatherLogo.alt = weatherMain;

        console.log("Fetch weather success!");
      });

    if (location.state == null) {
      navigate("/");
      return;
    }
    const playerList = location.state.players;
    show_modal("audio_prompt");
    setPlayers(playerList);
  }, []);

  useEffect(() => {
    if (tableCreated === false) initializeBones();
    console.log(players);
  }, [players]);

  return (
    <>
      {
        // Header
      }
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
              Don't Take Spike's Bones
            </h2>
            <img
              id="logo"
              className="img-fluid mx-auto my-0 mt-2"
              src={dogLogo}
              alt="SPIKE"
              draggable="false"
              onContextMenu={() => {
                return false;
              }}
            />
            <img
              id="weather_logo"
              className="img-fluid mx-auto my-0 mt-2"
              src={weatherIcon}
              alt="Weather Logo"
              draggable="false"
              style={{ height: "42%" }}
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
            {timeLeft.seconds ? (
              <p>
                <span>{timeLeft.seconds}</span>
                <span>:</span>
                <span>{timeLeft.milliseconds}</span>
              </p>
            ) : (
              <p>Time is up 🔥</p>
            )}
            <div
              id="player-list"
              className="boxplayer rounded p-4 text-start justify-content-sm-center me-5"
            >
              {players.map((player, index) => (
                <p key={index} id={player.name + "scoreboard"}>
                  {player.name} <span>{player.score}</span>
                </p>
              ))}
            </div>
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
