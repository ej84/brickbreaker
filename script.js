const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 이미지 로드
const paddleImage = new Image();
paddleImage.src = "Breakout Tile Set Free/PNG/50-Breakout-Tiles.png";

const ballImage = new Image();
ballImage.src = "Breakout Tile Set Free/PNG/58-Breakout-Tiles.png";

const brickImage1 = new Image();
brickImage1.src = "Breakout Tile Set Free/PNG/01-Breakout-Tiles.png";

const brickImage2 = new Image();
brickImage2.src = "Breakout Tile Set Free/PNG/07-Breakout-Tiles.png";

const damagedbrickImage1 = new Image();
damagedbrickImage1.src = "Breakout Tile Set Free/PNG/08-Breakout-Tiles.png";

// 게임 객체 초기화
let paddleHeight = 10,
  paddleWidth = 75,
  paddleX = (canvas.width - paddleWidth) / 2;
/*
let ballRadius = 7,
  x = canvas.width / 2,
  y = canvas.height - 30,
  dx = 2,
  dy = -2;
*/
let ballRadius = 5,
  ballX = canvas.width / 2,
  ballY = canvas.height - 30,
  dx = 2,
  dy = -2;
let rightPressed = false,
  leftPressed = false;

// 벽돌 설정
const brickRowCount = 4; // 총 4행의 벽돌
const brickColumnCount = 5; // 총 5열의 벽돌
const brickWidth = 75;
const brickHeight = 15;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 35;

// 벽돌 배열 생성
/*const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  console.log("col: " + c);
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    console.log("row: " + r);
    if (r / 2 === 0 || c / 2 === 0) {
      bricks[c][r] = { x: 0, y: 0, status: 2 }; // status 2: 벽돌이 존재하며 두번 맞아야 부서짐
    } else {
      bricks[c][r] = { x: 0, y: 0, status: 1 }; // status 1: 벽돌이 존재함
    }
  }
}*/

const bricks = [
  [
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
  ],
  [
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
  ],
  [
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
  ],
  [
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
  ],
  [
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 2, damaged: false },
    { x: 0, y: 0, status: 1 },
  ],
];

// 키보드 입력 이벤트 리스너
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

// 공과 패들, 벽돌을 그리는 함수
function drawBall() {
  /*ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  */
  ctx.drawImage(
    ballImage,
    ballX - ballRadius,
    ballY - ballRadius,
    ballRadius * 2,
    ballRadius * 2
  );
}

function drawPaddle() {
  /*
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  */
  ctx.drawImage(
    paddleImage,
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status >= 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        /*ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if (bricks[c][r].status === 2) {
          ctx.fillStyle = "#dd0000";
        } else {
          ctx.fillStyle = "#0095DD";
        }
        ctx.fill();
        ctx.closePath();
        */
        if (bricks[c][r].status === 2) {
          ctx.drawImage(brickImage2, brickX, brickY, brickWidth, brickHeight);
        } else if (bricks[c][r].status === 1 && bricks[c][r].damaged) {
          ctx.drawImage(
            damagedbrickImage1,
            brickX,
            brickY,
            brickWidth,
            brickHeight
          );
        } else {
          ctx.drawImage(brickImage1, brickX, brickY, brickWidth, brickHeight);
        }
      }
    }
  }
}

// 충돌 감지 기능 추가
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status >= 1) {
        if (
          ballX > b.x &&
          ballX < b.x + brickWidth &&
          ballY > b.y &&
          ballY < b.y + brickHeight
        ) {
          if (b.status === 2) {
            console.log(b.damaged);
            b.damaged = true;
            console.log(b.damaged);
          }
          dy = -dy;
          b.status -= 1; // 벽돌 제거
        }
      }
    }
  }
}

// 게임 로직 업데이트
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
  }
  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      dy = -dy;
    } /*else {
      gameMode = false; //document.location.reload(); // 게임 오버
    }*/
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  ballX += dx;
  ballY += dy;
  requestAnimationFrame(draw);
}

// 게임 시작
draw();
