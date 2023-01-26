/* refer to p5js Flocking example
https://p5js.org/examples/hello-p5-flocking.html
http://www.red3d.com/cwr/

processing example:Recursive Tree
https://processing.org/examples/tree.html
Biying Yao 2022/11/25
*/

let canvas;
let button;
let fish = [];
let angle = 0;
let side = 0;

function setup() {
  canvas = createCanvas(1200, 800);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element
  frameRate(10);

  //slider 1 for angle
  slider1 = createSlider(0, 45, 4);
  slider1.position(60, 100);
  slider1.style('width', '150px');
  
  //slider 1 for speed
  slider2 = createSlider(0, 100, 10);
  slider2.position(60, 150);
  slider2.style('width', '150px');
  
  //slider 1 for radius
  slider3 = createSlider(0, 45, 2);
  slider3.position(60, 200);
  slider3.style('width', '150px');

  //add button
  addButton();

  strokeJoin(ROUND);
  for (let i = 0; i < 25; i++) {
    fish[i] = new Fish(random(width), random(height));
  }
  
}


function draw() {
 // background color
  background(255, 210);
  
  
  let d = slider1.value();
  let b = slider2.value();
  let r = slider3.value();

  // text 
  text('Angle', 24, 115);
  text('Speed', 24, 162);
  text('Radius', 24, 213);
  
  // draw fish 
  for (let i = 0; i < 25; i++) {
    fish[i].show();
    fish[i].boundaries();
  } 


  // set the parameter for the fractal patterns
  rectMode(CENTER);
  angle = angle + b/100;

  // patterns1
  translate(width/2, height/2);
  for(let i = 0; i <= 360; i += d) {
    push();
    rotate(i);
    branch1(r);
    pop();
  }
  
  // pattern2
  translate(-150, 100);
  for(let i = 0; i <= 360; i += d) {
    push();
    rotate(i);
    branch2(r + 10);
    pop();
  }

  // pattern3
  translate(-60, -180);
  for(let i = 0; i <= 360; i += d) {
    push();
    rotate(i);
    branch3(r - 8);
    pop();
  }

   // pattern4
   translate(350, -80);
   for(let i = 0; i <= 360; i += d) {
     push();
     rotate(i);
     branch4(r + 8);
     pop();
   }

    // pattern5
    translate(20, 280);
    for(let i = 0; i <= 360; i += d) {
      push();
      rotate(i);
      branch5(r + 6);
      pop();
    }
}

function addButton() {
  //add a button  
  button = createButton("SAVE");
  button.parent("gui-container"); 
  button.addClass("button");
  // press the button
  button.mousePressed(saveImages);
}

function saveImages(){
  console.log("Saved");    
  button.html("SAVING");   
  button.addClass("inactive"); 

  save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
}



function branch1(length) {
	strokeWeight(1.5);
	stroke(122, 27, 56, 25);

	line(0, 0, 0, -length);
	translate(0, -length);

	if (length > 4) {
		push();
		rotate(angle);
		branch1(length * 0.7);
		pop();

		push();
		rotate(-angle);
		branch1(length * 0.7);
		pop();
	}

}

function branch2(length) {
  
	strokeWeight(1.5);
	stroke(122, 27, 56, 25);

	line(0, 0, 0, -length);
	rect(0, 0, length * 0.5, length * 0.5);
	translate(0, -length);

	if (length > 4) {
		push();
		rotate(angle);
		branch2(length * 0.7);
		pop();

		push();
		rotate(-angle);
		branch2(length * 0.7);
		pop();
	}
}

function branch3(length) {
  strokeWeight(1.5);
	stroke(122, 0, 0, 25);

		line(0, 0, 0, -length);
		translate(length, -length);

		if (length > 4) {
			push();
			rotate(angle);
			branch3(length * 0.57 * noise(2));
			pop();

			push();
			rotate(-angle);
			branch2(length * 0.75 * noise(2));
			pop();
		}
}

function branch4(length) {
	strokeWeight(1.5);
	stroke(122, 27, 56, 25);


  translate(0, -length);

	if (length > 8) {
		push();
		rotate(angle * 0.3);
		branch4(length * 0.57 * noise(2));
		pop();

		push();
		rotate(-angle);
		branch4(length * 0.73);
		pop();
	}
	ellipse(0, 0, length * 0.5, length * 0.5);
	ellipse(0, 0, length * 0.5 * noise(1), length * 0.5 * noise(1));
}

function branch5(length) {
	strokeWeight(1.5);
	stroke(122, 27, 56, 75);


  translate(0, -length);

	if (length > 8) {
		push();
		rotate(angle * 0.3);
		branch3(length * 0.57 * noise(2));
		pop();

		push();
		rotate(-angle);
		branch2(length * 0.73);
		pop();
	}
	ellipse(0, 0, length * 0.5, length * 0.5);
}


