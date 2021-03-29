const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Define Field object
// Empty field creation
class Field {
  constructor(hatHoles, field) {
    this._field  = field;
    this._hatHoles = hatHoles;
  }

// Coordinates for path character's start point
  playGame() {
    let x = 0;
    let y = 0; 
    this.print(this._field);
   
// y = pathCharacter, x = fieldCharacter
// Ensures movement is within the limit of the grid
    while (this._hatHoles[y][x] === pathCharacter || this._hatHoles[y][x] === fieldCharacter) {
      const direction = prompt('Find your hat! To move use U to move up, D for down, L for left, R for right. \n');
    
    if (direction.toUpperCase() === 'U') {
      if (y === 0) {
        console.log('You cannot move up. Please choose another direction')
      } else {
        y -=1
      }
    } else if (direction.toUpperCase() === 'D') {
        if (y >= this._field.length) {
          console.log('You cannot move down. Please choose another direction')
        } else {
          y +=1
        }
      } else if (direction.toUpperCase() === 'L') {
        if (x === 0) {
          console.log('You cannot move left. Please choose another direction')
        } else {
          x -= 1
        }
      } else if (direction.toUpperCase() === 'R') {
        if (x >= this._field[y].length) {
          console.log('You cannot move right. Please choose another direction')
        } else {
          x += 1
        }
      } else {
        console.log('Invalid entry. Please enter U, D, L, or R')
      } 

// Player finds hat/hole
      if (this._hatHoles[y][x] === hat) {
        console.log(`Congratulations! You\'ve found the hat`)
      } else if (this._hatHoles[y][x] === hole) {
        console.log(`You fell in a hole. Game Over`)
      } else {
        this._field[y][x] = pathCharacter;
        this.print(this._field);
      }
    } 
  }

//Print current state of the field
  print() {
    for (let row of this._field){
      console.log(row.join(' '));
    }
  }

// Returns a randomized two-dimensional array with a hat and several holes
  static generateField(height, width, holes) {
    let newField = [];
    // every iteration till the height.length will push a random character to the field
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
          newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter; // start place
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    newField[hatY][hatX] = hat; 
    
    for (let k = holes; k > 0; k--) {
      let holeX = hatX;
      let holeY = hatY;
      while (holeX === hatX) {
        holeX = Math.floor(Math.random() * width)
      };
      while (holeY === hatY) {
        holeY = Math.floor(Math.random() * height)
      };
     newField[holeY][holeX] = hole; 
    }
    return newField;
  } 
  
// Generate blank field for the user to traverse without seeing the hat and holes
  static generateBlankField(height, width){
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
          newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter;
    return newField;
  }
}


// Create blank field for the user to see
const blankField = Field.generateBlankField(5, 5)

// Create the field with the hat and holes
const newField = Field.generateField(5, 5, 1);
console.log(blankField);

// Instantiate a Field object 
myField = new Field (newField, blankField);

// Call playGame method
myField.playGame();