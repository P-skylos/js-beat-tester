/*
ast is composed of the following objects
{type: 'sequence', left, right}
{type: 'beat' beat}
{type: 'loop' times beats}
{type: 'lookup' name}
{type: 'assign' name value}
*/

function build(text){
    let tokens = tokenize(text);
    console.log(print_tokens(tokens));
    let ast = parse_assigns(tokens);
    console.log(print_parse(ast));
}

const context = new Map();

function make_part(parse_blob, synth){
    let part = new Tone.Part(
        (time, note) =>{synth.triggerAttackRelease(note, "8n", time)}
    )
    part.loop=true
    part.loopStart = 0
}