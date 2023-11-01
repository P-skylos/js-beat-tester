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
wishlist:
- allow the user to set the notes for each beat
- allow multiple parts to play at once
- add a drone part