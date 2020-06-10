Method 3 (greg)
Comments from Greg Meredith:

Implement token methodology like last time 

Link back to coop membership to verify membership

Coop issues REV address to all members.  Issue REV voting.

Members send rev dust to address

https://docs.google.com/document/d/1jfARb33suC_7AkICblTOFTmKN2mvTu9r7cFRPDKZ6hw/edit#


## Locker using `deployerID`

Deploy `Locker.rho` to make a locker named `locker1`. Then deploy
`Locker_test.rho` to:

1. set the contents to 123
2. modify the contents to 124
3. observe the contents and add 1 to it, returning 125:

```
"DEPLOY RETURN DATA" {
  "args": [
    125
  ],
  "cost": 7848,
```

Since `rho:rchain:deployerId` forms an unforgeable name, no other
deployer can reach your locker (unless you send it to them).
