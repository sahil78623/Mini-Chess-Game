const express = require('express')
const app = express()
const port = 3000

// Importing the module
const readline = require("readline-sync");

  let A = new Set()
  let B = new Set()

  let Board = Array.from(Array(5), () => new Array(5));
  let BoardPositions = {}

  printBoard = () => {
      console.log()
    for(let i = 0 ; i < 5 ; i++) {
        for(let j = 0 ; j < 5 ; j++) {
            if(Board[i][j] == undefined) {
                process.stdout.write('-'+'\t')
            }
            else {
                process.stdout.write(Board[i][j]+'\t')
            }
        }
        console.log()
    }
  }
  while(1) {
    if(A.size == 0) {
        // read player A pawns
        console.log()
        console.log("Enter Player1 Input:")
        for (let i = 0; i < 5; i++) {
            let P = readline.question().toUpperCase()
            A.add(P);
            Board[4][i] = 'A-'+P
        }
        if(A.size == 5) {
            printBoard()
        }
        else {
            console.log("Please Enter valid and Distinct Input For Player1")
            continue
        }     
        console.log()
        // console.log(A)
    }
    // break;
    else if(B.size == 0) {
        console.log()
        console.log("Enter Player2 Input:")
        for (let i = 0; i < 5; ++i) {
            let P = readline.question().toUpperCase()
            B.add(P);
            Board[0][i] = 'B-'+P
        }
        if(B.size == 5) {
            printBoard()
        }
        else {
            console.log("Please Enter valid and Distinct Input For Player2")
            continue
        }   
        console.log()
    }
    // else {

    // }
  }
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
})