# beatmakerjs
 this is a small, minimal interface to the *tone.js* library meant to enable users to play around with beat structures.

 # usage and features

- `,` light beat
- `.` heavy beat
- `:` cha-cha beat
- `?` rest
- `*comment*`
- `variable_name=[beats]` for example `foo=[,:,:..,:]`
- `variable_name` to reference it in a beat
All unrecognized character will simply be ignored, so you can include as much whitespace as you want and use delimiters to help visually group notes together.

 ## grammar
```
program -> assigns
assigns -> assign assigns | assign
assign  -> name=[beats] | beats
beats   -> beat beats | beat
beat    -> loop | lookup | . | , | : | ? | <EOF>
loop    -> int[beats]
lookup  -> name
```
