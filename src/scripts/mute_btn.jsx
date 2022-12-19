import "../styles/stylesHome.css";
import dogLogo from "../resources/spike_logo.png";
import React, { useState, useRef } from "react";

let mute_btn = document.getElementById("mute");
let track = document.getElementById("background_music");
let mute = false;

function mute_func() {
    dir = mute_btn.src;

    dir = dir.split("/");

    path = "";
    for (i = 0; i < dir.length - 1; i++) {
        path = path + dir[i] + "/";
    }

    if (dir[dir.length - 1] == "unmuted.png") {
        path = path + "muted.png"
        mute_btn.src = path;
        track.muted = true;
        mute = true;
    } else if (dir[dir.length - 1] == "muted.png") {
        path = path + "unmuted.png"
        mute_btn.src = path;
        track.muted = false;
        mute = false;
    } else alert("Error occured!");
}

// Music function
function play_music(mute_init=false) {

    mute = false;
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

            default: break;
        }
    }
}