// slider label updater
const bpm_slider = document.getElementById("bpm_slider");

const bpm_label = document.getElementById("bpm_label");
bpm_slider.addEventListener(
        "input",
        (event)=>bpm_label.textContent = event.target.value + " BPM"
);


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

//ERROR TO USER
const error_text = document.getElementById("error_text");
function error(error_string, error_loc){
    error_text.innerHTML=`error: ${error_string}`;
    console.error(error_string);
    let code = textbox.innerText;
    textbox.innerHTML = `${code.slice(0,error_loc)}<span class="err_highlight">${code.slice(error_loc, error_loc+1)}</span>${code.slice(error_loc+1)}`;
}

// need this for audio to start playing
let part; //needs to persist outside the function
document.querySelector('#play_pause')?.addEventListener('click', async () => {
	await Tone.start()
    if (playing){
        error_text.innerHTML="";
        part = build(textbox.innerText);
        console.log(textbox.innerText);
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