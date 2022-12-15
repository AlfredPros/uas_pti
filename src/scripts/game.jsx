import "../styles/stylesHome.css";
import dogLogo from "../resources/spike_logo.png";
import unmuted from "../resources/unmuted.png";

export default function Game() {
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
