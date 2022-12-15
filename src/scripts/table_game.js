let num = players.length;  // 4
let spacing = 1.0 / num;
let temp = "";
let id = 0;
let picked_correct_bone = 0;
let win = false;

let dangerous_boners = [];

//initialize player scores
let playerScores = [];
for(let i = 0; i < players.length; i++) playerScores.push(0);

function randint(max) {  // From 0 to max
    return Math.floor(Math.random() * max);
}

// Code to select random bones
for (let i = 0; dangerous_boners.length < num; i++) {
    // Generate Random Number between 0 and 4*number of players
    const x = randint(4 * num);
    // Check if the number is already in danger_bones
    if (!dangerous_boners.includes(x)) {
        dangerous_boners.push(x);
    }
}

// Generating bones
for (let i = 0; i < num + 2; i++) {
    temp = "";
    temp += "<tr>";

    for (let j = 0; j < num + 2; j++) {

        if (i == 0) { // Header

            temp += '<th style="width: ' + spacing + '%">';
            if (!(j == 0 || j == num + 1)) {

                if (dangerous_boners.includes(id)) {
                    temp += '<img class="dangerous_boners" src="resources/bone.png" onclick="bone_clicked(this);" onmouseover="hover_action();" style="width:100%; cursor:pointer;" id="bone' + id + '" draggable="false" oncontextmenu="return false"/>';
                } else {
                    temp += '<img class="safer_boners" src="resources/bone.png" onclick="bone_clicked(this);" onmouseover="hover_action();" style="width:100%; cursor:pointer;" id="bone' + id + '" draggable="false" oncontextmenu="return false"/>';
                }
                id++;
            }
            temp += '</th>';
        } else if (i != num + 1) { // Content
            if (j == 0 || j == 1) {
                if (dangerous_boners.includes(id)) {
                    temp += '<td> <img class="dangerous_boners" src="resources/bone.png" onclick="bone_clicked(this);" onmouseover="hover_action();" style="width:100%; cursor:pointer;" id="bone' + id + '" draggable="false" oncontextmenu="return false"/> </td>';
                } else {
                    temp += '<td> <img class="safer_boners" src="resources/bone.png" onclick="bone_clicked(this);" onmouseover="hover_action();" style="width:100%; cursor:pointer;" id="bone' + id + '" draggable="false" oncontextmenu="return false"/> </td>';
                }
                id++;
            }
            if (j == 0 && i == 1) { // Dog: id="dog"
                temp += '<td colspan="' + num + '" rowspan="' + num + '"> <img src="resources/spike-sleep.png" style="width:100%" id="dog" draggable="false" oncontextmenu="return false"/></td>';
            }
        } else { // Footer
            temp += "<td>";
            if (!(j == 0 || j == num + 1)) {
                if (dangerous_boners.includes(id)) {
                    temp += '<img class="dangerous_boners" src="resources/bone.png" onclick="bone_clicked(this);" onmouseover="hover_action();" style="width:100%; cursor:pointer;" id="bone' + id + '" draggable="false" oncontextmenu="return false"/>';
                } else {
                    temp += '<img class="safer_boners" src="resources/bone.png" onclick="bone_clicked(this);" onmouseover="hover_action();" style="width:100%; cursor:pointer;" id="bone' + id + '" draggable="false" oncontextmenu="return false"/>';
                }
                id++;
            }
            temp += "</td>";
        }

    }

    temp += "</tr>"

    $("#game-content").append(temp);
}


// Bone Behavior
function dangerous_boners_selected() {

    // Timer stopped, show 00:00
    timerToggle = 0;
    $("#timer").html("00:00");
    document.getElementById("timer").style.color = "#ff0000";

    //Doge expands, hide bone
    let doge = document.getElementById("dog");
    doge.style = "width:100%; transition: 0.25s ease-in-out; transform: scale(2.5);";
    doge.src = "resources/spike-awake.png";

    //change score board color to red
    $("#" + players[playerTurn].name + "scoreboard").css("color", "#ff0000");

    //KickCurrentPlayer
    KickCurrentPlayer();
}

function safer_boners_selected() {

    picked_correct_bone++;

    //update player score
    $("#" + players[playerTurn].name + "scoreboard span").html(++playerScores[playerTurn]);

    // Check if all corect bones are picked
    if (picked_correct_bone == num*3) {
        //stop the timer and declare victory
        timerToggle = 0;
        win = true;
        show_modal("player_tied");
        // change footer
        $("#footer_text").text("EVERYONE THAT SURVIVED WINS!!!!!");
        play_sound("victory2");
    } else {
        // Time restarts
        seconds = 9;
        miliSeconds = 99;
        
        // Randomize sound
        let rand = randint(4) + 1;
        play_sound("bone"+rand);

        //next player's turn
        next_player_turn();
    }

}

function next_player_turn(){
    if(playerTurn == players.length - 1){
        playerTurn = 0;
    }else{
        playerTurn++;
    }
}

function bone_clicked(obj) {
    obj.src = 'resources/bone_hidden.png';
    obj.style = "width:100%;";

    if (obj.className == "dangerous_boners") {
        dangerous_boners_selected();
    }
    else {
        safer_boners_selected();
    }
    obj.onclick = "";
}

function hover_action() {
    // play random hover sound
    let rand = randint(4) + 1;
    play_sound("hover" + rand);
}
