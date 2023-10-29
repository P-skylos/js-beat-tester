function make_part(parse_blob, synth){
    let part = new Tone.Part(
        (time, note) =>{synth.triggerAttackRelease(note, "8n", time)}
    )
    part.loop=true
    part.loopStart = 0
}