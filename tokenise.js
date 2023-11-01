// token = {type, location, value}
// types: : name|int|beat|syntax|EOF

function tokenize(text){
    let c;
    let token;
    const tokens = new Array();
    for (let i = 0; i<text.length; i++){
        c = text[i];
        //BEAT
        if (/[.,:?]/.test(c)){
            token = {location: i, type: 'beat', value: c};
        }
        //SYNTAX
        else if (c=='[' || c==']' || c=='='){
            token = {location: i, type: 'syntax', value:c};
        }
        //NUMBERS
        else if (/[0-9]/.test(c)){
            let int_string = c;
            let location = i;
            i ++;
            c = text[i];
            while (/[0-9]/.test(c)){
                int_string = int_string + c
                i++;
                c = text[i];
            }
            i--;//last char is not a number so we back off
            token = {location: location, type: "int", value:parseInt(int_string)}
        }
        //SKIP COMMENT
        else if (c == '*'){
            i++;
            c = text[i];
            while (c != '*' && i<text.length){
                i++;
                c = text[i];
            }
            token={type: false}
        }
        //whitespace
        else if (/[\ \t]/.test(c)){
            token={type: false}
        }
        else if (/\n/.test(c)){
            token={type: false}
        }
        //NAME
        else{
            let name = '';
            let location = i;
            // i++;
            // c = text[i];
            while(/[^\*.,=:?0-9]/.test(c)){
                name = name + c;
                i++;
                c = text[i];
            }
            i--; //test failed so we back off
            token = {location:location, type:"name", value:name}
        }
        if (token.type){
            tokens.push(token)
        }
    }
    tokens.push({location:text.length, type:"EOF", value:"EOF"})
    return tokens;
}

function print_tokens(tokens){
    let string = ""
    tokens.forEach(token => {
        string = `${string}>${token.value}`
    });
    return string;
}