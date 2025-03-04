let points = [];
let numPoints = 25; // Longer red string
let gravity = 0.07; 
let stiffness = 0.25; 
let damping = 0.95; 
let draggingPoint = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let startX = width * 0.38; // Start further left
  let endX = width * 0.67; // End further right
  let spacing = (endX - startX) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    let yPosition = height / 2;

    if (i === 0) yPosition -= 220; // Raise the leftmost point
    if (i === numPoints - 1) yPosition += 20; // Lower the rightmost point
    if (i > 0 && i < numPoints - 1) yPosition += 80; // Extra sagging for longer length

    points.push({ 
      x: startX + i * spacing, 
      y: yPosition, 
      vy: 0, 
      fixed: i === 0 || i === numPoints - 1 // Keep endpoints fixed
    });
  }
  clear();

  // Handwritten main text
  let mainText = createP("What if you let fate find you love?");
  mainText.style("font-family", "'SquarePeg'");
  mainText.style("font-size", "2.5rem");
  mainText.style("color", "white");
  mainText.style("text-align", "center");
  mainText.style("position", "absolute");
  mainText.style("top", `${height * 0.65}px`); // Positioned above the additional text
  mainText.style("left", "50%");
  mainText.style("transform", "translateX(-50%)");
  mainText.style("pointer-events", "none"); // Ensures it doesn't interfere with interactions

  // Additional poetic context
  let storyText = createP(`
      <br>they say <i> red strings </i> connect destined souls. <br>
      invisible, unbreakable, tied long before they meet.<br>
      Tonight, beneath the eyes of Yue Lau,
      will you follow fate?
  `);
  storyText.style("font-family", "'NotoSerif'"); // More traditional feel
  storyText.style("font-size", ".8rem");
  storyText.style("color", "#ddd");
  storyText.style("text-align", "center");
  storyText.style("width", "80%");
  storyText.style("line-height", "1.4");
  storyText.style("position", "absolute");
  storyText.style("top", `${height * 0.72}px`); // Positioned below the main text
  storyText.style("left", "50%");
  storyText.style("transform", "translateX(-50%)");
  storyText.style("pointer-events", "none");

  // Update Enter Button Text
  let enterButton = select("#enter-button");
  if (enterButton) {
    enterButton.html("enter if your heart is ready"); // Update button text
  }
}

function draw() {
  clear();
  background(0, 0, 0, 0);

  for (let i = 1; i < points.length - 1; i++) {
    if (!points[i].fixed && draggingPoint !== points[i]) {
      points[i].vy += gravity;
      points[i].y += points[i].vy;
      points[i].vy *= damping;
    }
  }

  for (let i = 1; i < points.length - 1; i++) {
    if (!points[i].fixed) { 
      let left = points[i - 1];
      let right = points[i + 1];
      let targetY = (left.y + right.y) / 2;
      points[i].vy += (targetY - points[i].y) * stiffness;
    }
  }

  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let p of points) vertex(p.x, p.y);
  endShape();
}

function mousePressed() {
  for (let i = 1; i < points.length - 1; i++) {
    if (dist(mouseX, mouseY, points[i].x, points[i].y) < 20) {
      draggingPoint = points[i];
      break;
    }
  }
}

function mouseDragged() {
  if (draggingPoint) {
    draggingPoint.y = mouseY;
    draggingPoint.vy = 0;
  }
}

function mouseReleased() {
  draggingPoint = null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  points = [];

  let startX = width * 0.3;
  let endX = width * 0.7;
  let spacing = (endX - startX) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    let yPosition = height / 2;

    if (i === 0) yPosition -= 100;
    if (i === numPoints - 1) yPosition += 20;
    if (i > 0 && i < numPoints - 1) yPosition += 80;

    points.push({ 
      x: startX + i * spacing, 
      y: yPosition, 
      vy: 0, 
      fixed: i === 0 || i === numPoints - 1 
    });
  }
}
