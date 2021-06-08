let inconsolate;

let boxSize = 80;
let strokeColor = [255,255,0];
let disabledStrokeColor = [50,40,70];
let gameStrokeColor = [255,255,0];

let enabledLayers = 3

let sideView = true;
let phrase = 0;

let turn = "x"

let moves = 0

let board = [
  [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ],[
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ],[
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]
]

let winPositions = 
[
   
]

function setup() {
  
  //more positions
  for (x = 0; x < 3; x++){
    for (y = 0; y < 3; y++){
      winPositions.push([[x, y, 0],[x, y, 1],[x, y, 2]])
      winPositions.push([[x, 0, y],[x, 1, y],[x, 2, y]])
      winPositions.push([[0, y, x],[1, y, x],[2, y, x]])
    }
    winPositions.push([[x, 0, 0],[x, 1, 1],[x, 2, 2]])
    winPositions.push([[x, 2, 0],[x, 1, 1],[x, 0, 2]])
    winPositions.push([[0, x, 0],[1, x, 1],[2, x, 2]])
    winPositions.push([[2, x, 0],[1, x, 1],[0, x, 2]])
    winPositions.push([[0, 0, x],[1, 1, x],[2, 2, x]])
    winPositions.push([[2, 0, x],[1, 1, x],[0, 2, x]])
  }
  
  winPositions.push([[0, 0, 0],[1, 1, 1],[2, 2, 2]])
  winPositions.push([[2, 0, 0],[1, 1, 1],[0, 2, 2]])
  winPositions.push([[0, 0, 2],[1, 1, 1],[2, 2, 0]])
  winPositions.push([[2, 0, 2],[1, 1, 1],[0, 2, 0]])
  winPositions.push([[0, 0, 0],[1, 1, 1],[2, 2, 2]])
  winPositions.push([[2, 2, 0],[1, 1, 1],[0, 0, 2]])
  winPositions.push([[0, 0, 2],[1, 1, 1],[2, 2, 0]])
  winPositions.push([[2, 2, 2],[1, 1, 1],[0, 0, 0]])
  
  //setup font 
  inconsolata = loadFont('/font.ttf');
  
  createCanvas(700, 700, WEBGL);
  
  resetMatrix()
  
}

function draw() {
  background(0,4,15);
  
  
  textFont(inconsolata);
  textSize(48);
  textAlign(CENTER,CENTER)
  
  //kinda raytracing
  tileSize = 90 + (enabledLayers - 1) * 20
           
  mx = (mouseX - 350) * 2
  if (mx > tileSize){
    mx = 1
  }else if(mx < -tileSize){
    mx = -1
  }else{
    mx = 0
  }

  my = (mouseY - 350) * 2
  if (my > tileSize){
    my = 1
  }else if(my < -tileSize){
    my = -1
  }else{
    my = 0
  }
  
  //rotate
  if (phrase == 0)
  {
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    if (frameCount > 156){
      phrase = 1;
      print(frameCount * 0.01)
    }
  }
  
  //rotate modes
  if (phrase == 3){
    if (mouseIsPressed) {
      if (mouseButton === CENTER) {
        rotateX(-0.5);
        rotateY(-0.5);
      }
    }
  }
  
  //set colors
  stroke(strokeColor[0], strokeColor[1], strokeColor[2]);
  if (phrase == 0)
  {
    noStroke();
  }
  fill(255,255,255,0);
  
  //draw
  if (phrase == 0){
    for (z = -1; z < 2; z++){
      for (x = -1; x < 2; x++){
        for (y = -1; y < 2; y++){
          fill(255 * (x+1) / 3,255 * (y+1) / 3,255 * (z+1) / 3);
          push();
          translate(boxSize * x, boxSize * y, boxSize * z);
          box(boxSize);
          pop();
        }
      }
    }
  }else if(phrase != 4){
    for (z = -1; z < 2; z++){
      if (z + 2 != enabledLayers){
        stroke(disabledStrokeColor[0], disabledStrokeColor[1], disabledStrokeColor[2]);
        fill(3,60,7)
      }else{
        stroke(strokeColor[0], strokeColor[1], strokeColor[2]);
        fill(100,290,34)
      }
      for (x = -1; x < 2; x++){
        for (y = -1; y < 2; y++){
          push();
          translate(boxSize * x - boxSize / 2, boxSize * y - boxSize / 2, boxSize * z - boxSize / 2);
          
          if (z + 3 != enabledLayers ){
            line(0,0,boxSize,0,boxSize,boxSize)
          line(0,0,boxSize,boxSize,0,boxSize)
          line(boxSize,0,boxSize,boxSize,boxSize,boxSize)
          line(0,boxSize,boxSize,boxSize,boxSize,boxSize)
            
          }
          if (z + 1 != enabledLayers ){
          line(0,0,0,0,boxSize,0)
            line(0,0,0,boxSize,0,0)
            line(boxSize,0,0,boxSize,boxSize,0)
            line(0,boxSize,0,boxSize,boxSize,0)
          }
          line(0,0,0,0,0,boxSize)
          line(boxSize,0,0,boxSize,0,boxSize)
          line(0,boxSize,0,0,boxSize,boxSize)
          line(boxSize,boxSize,0,boxSize,boxSize,boxSize)
          
          translate(boxSize / 2, boxSize / 2, boxSize / 2);
          textSize(48 + (z + 1) * 7);
          text(board[z+1][y+1][x+1], 0, 0);
          
          
          
          if (phrase == 3 && !mouseIsPressed && z + 2 == enabledLayers && my == y && mx == x && board[z+1][y+1][x+1] == " ") {
            fill(230,34,20)
            text(turn, 0, 0);
          }
          
          
          
          
          pop();
        }
      }
    }
  }
  
  
  if (phrase == 3 && mouseIsPressed && mouseButton == LEFT && board[enabledLayers - 1][my+1][mx+1] == " ") {
    board[enabledLayers - 1][my+1][mx+1] = turn;
    print(board)
    if (turn == "x"){
      turn = "o"
    }else{
      turn = "x"
    }
    moves++;
  }
  
  if (moves == 27){
    phrase = 4
    message = "DRAW!"
  }
  
  //win check
  winPositions.forEach(function(method){
    recorded = []
    method.forEach(function(position){
        recorded.push(board[position[2]][position[0]][position[1]])
    })
    if (recorded[0] == recorded[1] && recorded[0] == recorded[2] && recorded[0] != " "){
      phrase = 4
      message = recorded[0].toUpperCase() + " WON!"
    }
  })
  
  if (phrase == 4){
    fill(100,290,34)
    textSize(160)
    text(message, 0, 0);
  }
  
  //text phrase 1
  if (phrase == 1){
    fill(100,290,34)
    translate(0, 200, 0)
    text('tic tac toe 3D', 0, 0);
    
    if (phrase == 1){
        if (frameCount > 287){
        phrase = 2;
      }
    }
  }
  
  if (phrase == 2){
    boxSize += 0.3
    fill(100,290,34)
    translate(0, 200 + (frameCount - 287) * 4.2069, 0)
    text('tic tac toe 3D', 0, 0);
    
    if (frameCount > 340){
      phrase = 3;
    }
  }
  
}

function mouseWheel(event) {
  if (phrase == 3){
    if (event.delta < 0 && enabledLayers > 1){
      enabledLayers--;
    }
    if (event.delta > 0 && enabledLayers < 3){
      enabledLayers++;
    }
  }
  print(mouseX + ", " + mouseY)
  print(enabledLayers)
}