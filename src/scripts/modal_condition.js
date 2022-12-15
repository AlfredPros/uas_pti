
// Function to show the appropriate modal prompt.
function show_modal(prompt_type = "audio_prompt") {

    switch (prompt_type) {

        case "audio_prompt": {
            $("#staticBackdropLabel").text("Do you want to turn on music?");
            $("#staticBackdropBody").empty();
            $("#continue").remove();
            $("#cancel").remove();

            $("#staticBackdropBody").append("<b>We play music on our site.<br/>Please note the volume.</b>");
            $("#staticBackdropFooter").append('<button type="button" class="button btn-primary btn-block btn-4" onclick="play_sound(\'confirm\'); play_music(false); continue_func();" data-bs-dismiss="modal" id="continue">Yes</button>');
            $("#staticBackdropFooter").append('<button type="button" class="button btn-primary btn-block btn-2" onclick="play_sound(\'cancel\'); play_music(true); continue_func();" data-bs-dismiss="modal" id="cancel">No</button>');

            myModal.show();
            break;
        }

        case "player_lose": {
            let curr_player = players[playerTurn].name;

            $("#staticBackdropLabel").text("Spike Has Woken Up!");
            $("#staticBackdropBody").empty();
            $("#continue").remove();
            $("#cancel").remove();

            $("#staticBackdropBody").append("<b>"+curr_player+" has been moved out from the game for causing a ruckus.<br/>You can proceed without them or start a new game.</b>");
            $("#staticBackdropFooter").append('<button type="button" class="button btn-primary btn-block btn-4" onclick="play_sound(\'confirm\'); continue_func()" data-bs-dismiss="modal" id="continue">Continue</button>');
            $("#staticBackdropFooter").append('<button type="button" class="button btn-primary btn-block btn-2" onclick="play_sound(\'cancel\'); window.location.replace(\'index.html\');" id="cancel">Start Over</button>');

            myModal.show();
            break;
        }

        case "player_late": {
            let curr_player = players[playerTurn].name;

            $("#staticBackdropLabel").text(curr_player + " is too late!");
            $("#staticBackdropBody").empty();
            $("#continue").remove();
            $("#cancel").remove();

            $("#staticBackdropBody").append("<b>"+curr_player+" has been moved out from the game for being too slow.<br/>You can proceed without them or start a new game.</b>");
            $("#staticBackdropFooter").append('<button type="button" class="button btn-primary btn-block btn-4" onclick="play_sound(\'confirm\'); continue_func()" data-bs-dismiss="modal" id="continue">Continue</button>');
            $("#staticBackdropFooter").append('<button type="button" class="button btn-primary btn-block btn-2" onclick="play_sound(\'cancel\'); window.location.replace(\'index.html\');" id="cancel">Start Over</button>');

            myModal.show();
            break;
        }

        case "player_win": {
            let curr_player = players[playerTurn].name;
            let next_player;
            if(playerTurn == players.length - 1){
                next_player = players[0].name;
            } else {
                next_player = players[playerTurn + 1].name;
            }

            $("#staticBackdropLabel").text("Chicken Boner!");
            $("#staticBackdropBody").empty();
            $("#continue").remove();
            $("#cancel").remove();

            $("#staticBackdropBody").append("<b>"+curr_player+" has been moved out from the game.<br/>Therefore, "+next_player+" has won the game! Congratulation!</b>");
            $("#staticBackdropFooter").append('<button type="button" class="button btn-primary btn-block btn-2" onclick="play_sound(\'cancel\'); window.location.replace(\'index.html\');" id="cancel">Start Over</button>');

            myModal.show();
            break;
        }

        case "player_tied": {
            $("#staticBackdropLabel").text("Mission Accomplished!");
            $("#staticBackdropBody").empty();
            $("#continue").remove();
            $("#cancel").remove();

            $("#staticBackdropBody").append("<b>All safe bones have been picked!<br/>All players that survived can go home safely now!");
            $("#staticBackdropFooter").append('<button type="button" class="button btn-primary btn-block btn-4" onclick="play_sound(\'confirm\'); window.location.replace(\'index.html\');" id="cancel">The End</button>');

            myModal.show();
            break;
        }

        default: break;
    }
}