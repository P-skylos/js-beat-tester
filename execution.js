/*
ast is composed of the following objects
{type: 'sequence', left, right}
{type: 'beat' beat}
{type: 'loop' times beats}
{type: 'lookup' name}
{type: 'assign' name value}
{type: 'NO-OP'}
*/

//these vars need to be global for the side effecting we're doing
let context;
let notes;

function eval(ast){
    context = new Map();
    notes = new Array();
    //we use side effecting to populate the context and note array
    const end = _eval(ast, 0);
    return {notes: notes, end: end}
}

function _eval(ast, time){
    switch (ast.type){
        case 'sequence':
            time = _eval(ast.left, time);
            time = _eval(ast.right, time);
            break;
        case 'beat':
            time = _eval_beat(ast, time);
            break;
        case 'loop':
            for (i=0; i<ast.times.value; i++){
                time = _eval(ast.beats, time);
                time ++;
            }
            break;
        case 'lookup':
            const value = context.get(ast.name.value);
            time = _eval(value, time);
            break;
        case 'assign':
            context.set(ast.name.value, ast.value);
            break;
        case 'NO-OP':
            break;
    }
    return time;
}

function _eval_beat(ast, time){
    switch(ast.beat.value){
        case ',':
            notes.push(["0:"+time, "C2"])
            break;
        case '.':
            notes.push(["0:"+time, "B2"])
            break;
        case ':':
            notes.push(["0:"+time, "B2"])
            notes.push(["0:"+time+":2", "B2"])
            break;
        case '?':
            break; //advance time but do not produce a note
    }
    return time + 1;
}

function build(text){
    let tokens = tokenize(text);
    //console.log(print_tokens(tokens))
    const ast = parse_assigns(tokens);
    //console.log(print_parse(ast));
    const part_sequence = eval(ast);
    return make_part(part_sequence);
}

//makes a new synth object and connects it to the audio device
const synth = new Tone.MembraneSynth().toDestination();

function make_part(part_sequence){
    let part = new Tone.Part(
        (time, note) =>{synth.triggerAttackRelease(note, "8n", time)},
        part_sequence.notes
    ).start(0);
    part.loop=true;
    part.loopStart = 0;
    part.loopEnd = "0:"+part_sequence.end;
    return part;
}
