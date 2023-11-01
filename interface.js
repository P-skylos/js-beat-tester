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
        build(textbox.value);
    }
}


// // need this for audio to start playing
// document.querySelector('#play_pause')?.addEventListener('click', async () => {
// 	await Tone.start()
//     console.log(textbox.value);
//     build(textbox.value);
// })

// //bind tone bpm to slider
// bpm_slider.addEventListener(
//     "input",
//     (event)=>Tone.Transport.bpm.value= event.target.value
// );