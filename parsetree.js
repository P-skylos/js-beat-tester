/* GRAMMAR
program -> assigns
assigns -> assign assigns | assign
assign  -> name = [beats] | beats
beats   -> beat beats | beat
beat    -> loop | lookup | . | , | : | ? | <EOF>
loop    -> int[beats]
lookup  -> name
*/

function error(error_string){
    console.error(error_string);
}

function chomp_string(tokens, string){
    const token = tokens.shift();
    if (token.value == string){
        return token;
    }
    error("expected '"+string+"' got "+token.value+"at "+token.location.toString())
    return false;
}

function chomp_type(tokens, type){
    const token = tokens.shift();
    if (token.type == type){
        return token;
    }
    error ("expected a(n) "+type+" got a(n) "+token.type+" at "+token.location.toString())
    return false;
}

function parse_assigns(tokens){
    const left = parse_assign(tokens);
    let right = false;
    if (tokens.length>0){
        right = parse_assign(tokens);
    }
    const node = {left:left, right:right};
    return node;
}

function parse_assign(tokens){
    if (tokens[1].value == '='){
        //its an assign
    }
    else{
        //its a lookup
    }
}

function parse_beats(tokens){
    const left = parse_beat(tokens);


}

function parse_beat(tokens){

}

function parse_loop(tokens){}

function parse_lookup(tokens){}
