only_comment_is_skipped = {input:'..*hello*,,', expected:'>.>.>,>,>EOF'}
only_whitespace_is_skipped = {input:'..   ,,', expected:'>.>.>,>,>EOF'}
only_name_is_consumed = {input:'..foo:,,', expected:'>.>.>foo>:>,>,>EOF'}
only_num_is_consumed = {input:',.1234,,.', expected:'>,>.>1234>,>,>.>EOF'}
only_equals_or_bracket_is_consumed = {input:',,a=[]a.?', expected:'>,>,>a>=>[>]>a>.>?>EOF'}

token_tests=[only_comment_is_skipped, only_whitespace_is_skipped, only_name_is_consumed, only_num_is_consumed, only_equals_or_bracket_is_consumed]

function test_token(test){
    const tokens = tokenize(test.input);
    const out = print_tokens(tokens);
    if (out != test.expected){
        console.error(`tokenize failed: \n${test.input} \n${out}`);
    }
}

token_tests.forEach(test => {
    test_token(test);
});

lookup = {input:'a', expected:'sequence\n>lookup a\n>no op'}
function test_parse(test){
    let tokens = tokenize(test.input)
    const ast = parse(tokens);
}