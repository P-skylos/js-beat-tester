// token = {type: name|int|beat, location: char number, }

function tokenize(text){
    let c;
    let token;
    const tokens = new Array();
    for (let i = 0; i<text.length(); i++){
        c = text[i];
        if (/[.,:?]/.test(c)){
            token = {location: i, type: 'beat', value: c};
        } else if (c=='[' || c==']' || c=='='){
            token = {location: i, type: 'syntax', value:c};
        } else if (/[0-9]/.test(c)){
            let int_string = c;
            let location = i;
            i ++;
            c = text[i];
            while (/[0-9]/.test(c)){
                int_string = int_string + c
                i++;
                c = text[i];
            }
            token = {location: location, type: "int", value:parseInt(int_string)}
        } else if (c == '*'){
            i++;
            c = text[i];
            while (c != '*' && i<text.length){
                i++;
                c = text[i];
            }
        }
        else{
            //eat name
            let name = c;
            let location = i;
            i++;
            c = text[i];
            while(/[^\*.,:?0-9]/.test(c)){
                name = name + c;
                i++;
                c = text[i];
            }
            token = {location:location, type:"name", value:name}
        }
        tokens.push(token)
    }
    tokens.push({location:text.length(), type:"EOF", val:"EOF"})
    return tokens;
}