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
            }
            break;
        case 'lookup':
            const value = context.get(ast.name.value);
            time = _eval(value, time);
            break;
        case 'assign':
            const fossilized_value = _eval_assignment(ast.value)
            context.set(ast.name.value, fossilized_value);
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

function _eval_assignment(ast){ //evaluate all lookups at time of assignment to dodge recursion
    switch (ast.type){
        case 'sequence':
            const left = _eval_assignment(ast.left);
            const right = _eval_assignment(ast.right);
            return {type: 'sequence', left: left, right: right};
        case 'beat':
            return ast;
        case 'loop':
            const fossilized_beats = _eval_assignment(ast.beats);
            return {type:'loop', times: ast.times, beats: fossilized_beats};
        case 'lookup':
            const value = context.get(ast.name.value);
            const fossilized_val = _eval_assignment(value);
            return fossilized_val;
        case 'assign':
            return {type: 'NO-OP'};
        case 'NO-OP':
            return {type: 'NO-OP'};
    }
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
