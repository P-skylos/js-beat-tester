/* GRAMMAR
program -> assigns EOF
assigns -> assign assigns | assign | <empty>
assign  -> name = [assigns] | lookup | beat
lookup  -> name
beat    -> loop | . | , | : | ?
loop    -> int[assigns]
*/

// a token stream looks like an array of {type, value, location}, terminated by an EOF

////
//PARSE
////

function parse_assigns(tokens){
    if (peek(tokens).value===']'){
        return{type: 'NO-OP'};
    }
    const left = parse_assign(tokens);
    if (peek(tokens).type !== "EOF"){
        const right = parse_assigns(tokens);
        return {type:"sequence", left: left, right: right};
    }
    return left;
}

function parse_assign(tokens){
    const token = peek(tokens);
    if (token.type !== "name"){
        return parse_beat(tokens);
    }
    const name = chomp_by_type(tokens, "name");
    if (peek(tokens).value === '='){ //its an assign
        chomp_by_string(tokens, '=');
        chomp_by_string(tokens, '[');
        const value = parse_assigns(tokens);
        chomp_by_string(tokens, ']');
        return {type: "assign", name: name, value: value};
    }
    return {type: "lookup", name: name};
}

function parse_beat(tokens){
    const token = peek(tokens);
    if (token.type === 'int'){
        return parse_loop(tokens);
    }
    const beat = chomp_by_type(tokens, 'beat');
    return {type: 'beat', beat: beat}
}

function parse_loop(tokens){
    const times = chomp_by_type(tokens, 'int');
    chomp_by_string(tokens, '[');
    const beats = parse_assigns(tokens);
    chomp_by_string(tokens, ']');
    return {type: 'loop', times: times, beats: beats}
}


////
//TOOLS
////

function peek(tokens){ //this mostly exists as a readability choice
    if (tokens.length >= 1 ){
        return tokens[0];
    };
    // error("peeked end of array");
}

function chomp_by_string(tokens, string){
    const token = tokens.shift();
    if (token.value == string){
        return token;
    }
    error(`expected '${string}' got ${token.value} at ${token.location.toString()}`, token.location)
    return false;
}

function chomp_by_type(tokens, type){
    const token = tokens.shift();
    if (token.type == type){
        return token;
    }
    error (`expected a(n) ${type} got a ${token.type} "${token.value}" at ${token.location.toString()}`, token.location)
    return false;
}

function print_parse(ast){
    return _pprint(ast, 1)
}

function _pprint(ast, depth){
    const indent = '>'.repeat(depth);
    depth += 1;
    switch(ast.type){
        case 'sequence':
            return `sequence\n${indent}${_pprint(ast.left, depth)}\n${indent}${_pprint(ast.right, depth)}`;
        case 'assign':
            return `assign ${ast.name.value} = ${_pprint(ast.value, depth)}`
        case 'lookup':
            return `lookup ${ast.name.value}`
        case 'loop':
            return `loop ${ast.times.value} times\n${indent}${_pprint(ast.beats, depth)}`
        case 'beat':
            return `beat ${ast.beat.value}`
        case 'NO-OP':
            return 'no op'
    }
}