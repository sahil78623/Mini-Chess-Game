const express = require('express')
const app = express()
const port = 3000

// Importing the module
const readline = require("readline-sync");

  let A = new Set()
  let B = new Set()

  let Board = Array.from(Array(5), () => new Array(5));
  let BoardPositions = {}
  let PlayerTurn = 1

  for(let i = 0 ; i < 5 ; i++) {
    for(let j = 0 ; j < 5 ; j++) {
        Board[i][j] = '-'
    }
}

let PlayerAKnockoutCount = 0
let PlayerBKnockoutCount = 0


  printBoard = () => {
      console.log('Current Grid:')
    for(let i = 0 ; i < 5 ; i++) {
        for(let j = 0 ; j < 5 ; j++) {
            if(Board[i][j] == '-') {
                process.stdout.write('-'+'\t')
            }
            else {
                process.stdout.write(Board[i][j]+'\t')
            }
        }
        console.log()
    }
  }

  let validateMove = (player, character, position) => {
      if(BoardPositions[player+character] == undefined) {
          console.log('Invalid Character!!!')
          return 0
      }
      if(position == 'L' || position == 'R' || position == 'F' || position == 'B') {
          if(player == 'A-') {
            //   validating for moves to be inside the table 
            if(position == 'L') {
                if(BoardPositions[player+character][1] - 1 < 0) {
                    console.log('Invalid Move Outside The Board!!!')
                    return 0
                }
                 // check for not killing own team player
                let coordinatesOfCurrentCharacter = BoardPositions[player+character]
                let nextMovingPositionCharacter = Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]-1]
                if(nextMovingPositionCharacter[0] == player[0]) {
                    console.log('Your Character Already Present At This Position!!!')
                    return 0
                }

                let enemy = Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]-1]
                Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]-1] = player+character
                Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]] = '-'

                // update board positions
                BoardPositions[player+character] = [coordinatesOfCurrentCharacter[0], coordinatesOfCurrentCharacter[1]-1]
                if(nextMovingPositionCharacter[0] != '-'){
                    PlayerAKnockoutCount++
                    delete BoardPositions[enemy]
                }
                return 1
            }
            else if(position == 'R') {
                if(BoardPositions[player+character][1] + 1 > 4) {
                    console.log('Invalid Move Outside The Board!!!')
                    return 0
                }
                 // check for not killing own team player
                let coordinatesOfCurrentCharacter = BoardPositions[player+character]
                let nextMovingPositionCharacter = Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]+1]
                if(nextMovingPositionCharacter[0] == player[0]) {
                    console.log('Your Character Already Present At This Position!!!')
                    return 0
                }
                
                let enemy = Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]+1]
                Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]+1] = player+character
                Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]] = '-'
                
                BoardPositions[player+character] = [coordinatesOfCurrentCharacter[0], coordinatesOfCurrentCharacter[1]+1]
                if(nextMovingPositionCharacter[0] != '-'){
                    PlayerAKnockoutCount++
                    delete BoardPositions[enemy]
                }
                return 1
            }
            else if(position == 'F') {
                if(BoardPositions[player+character][0] - 1 < 0) {
                    console.log('Invalid Move Outside The Board!!!')
                    return 0
                }
                 // check for not killing own team player
                let coordinatesOfCurrentCharacter = BoardPositions[player+character]
                let nextMovingPositionCharacter = Board[coordinatesOfCurrentCharacter[0]-1][coordinatesOfCurrentCharacter[1]]
                if(nextMovingPositionCharacter[0] == player[0]) {
                    console.log('Your Character Already Present At This Position!!!')
                    return 0
                }

                let enemy = Board[coordinatesOfCurrentCharacter[0]-1][coordinatesOfCurrentCharacter[1]]
                Board[coordinatesOfCurrentCharacter[0]-1][coordinatesOfCurrentCharacter[1]] = player+character
                Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]] = '-'
                
                BoardPositions[player+character] = [coordinatesOfCurrentCharacter[0]-1, coordinatesOfCurrentCharacter[1]]
                if(nextMovingPositionCharacter[0] != '-'){
                    PlayerAKnockoutCount++
                    delete BoardPositions[enemy]
                }
                return 1
            }
            else if(position == 'B') {
                if(BoardPositions[player+character][0] + 1 > 4) {
                    console.log('Invalid Move Outside The Board!!!')
                    return 0
                }
                 // check for not killing own team player
                let coordinatesOfCurrentCharacter = BoardPositions[player+character]
                let nextMovingPositionCharacter = Board[coordinatesOfCurrentCharacter[0]+1][coordinatesOfCurrentCharacter[1]]
                if(nextMovingPositionCharacter[0] == player[0]) {
                    console.log('Your Character Already Present At This Position!!!')
                    return 0
                }

                let enemy = Board[coordinatesOfCurrentCharacter[0]+1][coordinatesOfCurrentCharacter[1]]
                Board[coordinatesOfCurrentCharacter[0]+1][coordinatesOfCurrentCharacter[1]] = player+character
                Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]] = '-'
                
                BoardPositions[player+character] = [coordinatesOfCurrentCharacter[0]+1, coordinatesOfCurrentCharacter[1]]
                if(nextMovingPositionCharacter[0] != '-'){
                    PlayerAKnockoutCount++
                    delete BoardPositions[enemy]
                }
                return 1
            }



          }
          else {
              //   validating for moves to be inside the table 
                if(position == 'L') {
                    if(BoardPositions[player+character][1] + 1 > 4) {
                        console.log('Invalid Move Outside The Board!!!')
                        return 0
                    }
                     // check for not killing own team player
                     let coordinatesOfCurrentCharacter = BoardPositions[player+character]
                     let nextMovingPositionCharacter = Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]+1]
                     if(nextMovingPositionCharacter[0] == player[0]) {
                        console.log('Your Character Already Present At This Position!!!')
                        return 0
                     }

                    let enemy = Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]+1]
                    Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]+1] = player+character
                    Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]] = '-'
                    
                    BoardPositions[player+character] = [coordinatesOfCurrentCharacter[0], coordinatesOfCurrentCharacter[1]+1]
                    if(nextMovingPositionCharacter[0] != '-'){
                        PlayerBKnockoutCount++
                        delete BoardPositions[enemy]
                    }
                    return 1
                    
                }
                else if(position == 'R') {
                    if(BoardPositions[player+character][1] - 1 < 0) {
                        console.log('Invalid Move Outside The Board!!!')
                        return 0
                    }
                     // check for not killing own team player
                     let coordinatesOfCurrentCharacter = BoardPositions[player+character]
                     let nextMovingPositionCharacter = Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]-1]
                     if(nextMovingPositionCharacter[0] == player[0]) {
                        console.log('Your Character Already Present At This Position!!!')
                        return 0
                     }

                    let enemy = Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]-1]
                    Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]-1] = player+character
                    Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]] = '-'
                    
                    BoardPositions[player+character] = [coordinatesOfCurrentCharacter[0], coordinatesOfCurrentCharacter[1]-1]
                    if(nextMovingPositionCharacter[0] != '-'){
                        PlayerBKnockoutCount++
                        delete BoardPositions[enemy]
                    }
                    return 1
                }
                else if(position == 'F') {
                    if(BoardPositions[player+character][0] + 1 > 4) {
                        console.log('Invalid Move Outside The Board!!!')
                        return 0
                    }
                     // check for not killing own team player
                     let coordinatesOfCurrentCharacter = BoardPositions[player+character]
                     let nextMovingPositionCharacter = Board[coordinatesOfCurrentCharacter[0]+1][coordinatesOfCurrentCharacter[1]]
                     if(nextMovingPositionCharacter[0] == player[0]) {
                        console.log('Your Character Already Present At This Position!!!')
                        return 0
                     }

                    let enemy = Board[coordinatesOfCurrentCharacter[0]+1][coordinatesOfCurrentCharacter[1]]
                    Board[coordinatesOfCurrentCharacter[0]+1][coordinatesOfCurrentCharacter[1]] = player+character
                    Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]] = '-'
                    
                    BoardPositions[player+character] = [coordinatesOfCurrentCharacter[0]+1, coordinatesOfCurrentCharacter[1]]
                    if(nextMovingPositionCharacter[0] != '-'){
                        PlayerBKnockoutCount++
                        delete BoardPositions[enemy]
                    }
                    return 1
                }
                else if(position == 'B') {
                    if(BoardPositions[player+character][0] - 1 < 0) {
                        console.log('Invalid Move Outside The Board!!!')
                        return 0
                    }
                     // check for not killing own team player
                     let coordinatesOfCurrentCharacter = BoardPositions[player+character]
                     let nextMovingPositionCharacter = Board[coordinatesOfCurrentCharacter[0]-1][coordinatesOfCurrentCharacter[1]]
                     if(nextMovingPositionCharacter[0] == player[0]) {
                        console.log('Your Character Already Present At This Position!!!')
                        return 0
                     }

                    let enemy = Board[coordinatesOfCurrentCharacter[0]-1][coordinatesOfCurrentCharacter[1]]
                    Board[coordinatesOfCurrentCharacter[0]-1][coordinatesOfCurrentCharacter[1]] = player+character
                    Board[coordinatesOfCurrentCharacter[0]][coordinatesOfCurrentCharacter[1]] = '-'
                    
                    BoardPositions[player+character] = [coordinatesOfCurrentCharacter[0]-1, coordinatesOfCurrentCharacter[1]]
                    if(nextMovingPositionCharacter[0] != '-'){
                        PlayerBKnockoutCount++
                        delete BoardPositions[enemy]
                    }
                    return 1
                }
          }
      }
      else{
        console.log('Invalid Move!!!')
          return 0
      }
  }
  while(1) {
    if(PlayerAKnockoutCount == 5) {
        console.log("Conratulations Player A WON!!!")
        break
    }
    else if(PlayerBKnockoutCount == 5) {
        console.log("Conratulations Player B WON!!!")
        break
    }
    if(A.size == 0) {
        // read player A pawns
        console.log()
        console.log("Enter Player1 Input:")
        let P = readline.question()
        let Parray = P.split(",");
        if(Parray.length < 5) {
            console.log("Please Enter Sufficient No Of Characters")
            continue
        }
        for (let i = 0; i < 5; i++) {
            A.add(Parray[i].trim().toUpperCase())
            Board[4][i] = 'A-'+Parray[i].trim().toUpperCase()
            BoardPositions['A-'+Parray[i].trim().toUpperCase()] = [4,i]
        }
        if(A.size == 5) {
            printBoard()
        }
        else {
            console.log("Please Enter valid and Distinct Input For Player1")
            A.clear()
            continue
        }     
        console.log()
    }
    // break;
    else if(B.size == 0) {
        console.log()
        console.log("Enter Player2 Input:")
        let P = readline.question()
        let Parray = P.split(",");
        if(Parray.length < 5) {
            console.log("Please Enter Sufficient No Of Characters")
            continue
        }
        for (let i = 0; i < 5; i++) {
            B.add(Parray[i].trim().toUpperCase())
            Board[0][i] = 'B-'+Parray[i].trim().toUpperCase()
            BoardPositions['B-'+Parray[i].trim().toUpperCase()] = [0,i]
        }
        if(B.size == 5) {
            printBoard()
        }
        else {
            console.log("Please Enter valid and Distinct Input For Player2")
            B.clear()
            continue
        }   
        console.log()
    }
    else {
        let validate = 1
        if(PlayerTurn == 1) {
            process.stdout.write("Player A's Move:")
            let move = readline.question()
            let Parray = move.split(":");  
            let player = 'A-'
            let character = Parray[0].trim()
            let position = Parray[1].trim()
            validate = validateMove(player, character, position)
        }
        else {
            process.stdout.write("Player B's Move:")
            let move = readline.question()
            let Parray = move.split(":");  
            let player = 'B-'
            let character = Parray[0].trim()
            let position = Parray[1].trim()
            validate = validateMove(player, character, position)
        }
        if(validate) {
            PlayerTurn = 1 - PlayerTurn
            printBoard()
        }
    }
  }
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
})