// slider label updater
const bpm_slider = document.getElementById("bpm_slider");

const bpm_label = document.getElementById("bpm_label");
bpm_slider.addEventListener(
        "input",
        (event)=>bpm_label.textContent = event.target.value + " BPM"
);

//ERROR TO USER
function error(error_string){
    const error_text = document.getElementById("error_text");
    error_text.innerHTML=`error: ${error_string}`;
    console.error(error_string);
}

// play button toggler
const textbox = document.getElementById("beat_code");
let playing = false;
function toggle(){
    if (playing) {
        document.getElementById("play_pause").innerHTML = "play!🔁";
        playing = false;
    }
    else{
        document.getElementById("play_pause").innerHTML = "stop⏹";
        playing = true;
    }
}


// need this for audio to start playing
let part; //needs to persist outside the function
document.querySelector('#play_pause')?.addEventListener('click', async () => {
	await Tone.start()
    if (playing){
        part = build(textbox.value);
        Tone.Transport.start();
    } else {
        Tone.Transport.pause();
        part.dispose(); //we rebuild the part each time to account for changes
    }
})

//bind tone bpm to slider
bpm_slider.addEventListener(
    "input",
    (event)=>Tone.Transport.bpm.value= event.target.value
);