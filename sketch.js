let B = [];

let a  = [
  20, 
  -30, 
  100
]

let b  = [
  120, 
  -130, 
  200
]

let c  = [
  50, 
  -40, 
  60
]

let d  = [
  20, 
  -60, 
  10
]

let L  = {
  x: 0, 
  y: 0, 
  z: 0
}

let L2  = {
  x: -50, 
  y: -260, 
  z: 10
}

let cart = {
  x: 0,
  y: -100,
  z: 0
}

function node(pt, hndl){
  return [
    pt, hndl
  ]
}

function setup() {
  createCanvas(900, 600, WEBGL);
  cam = createCamera()
  B.push([a,b], [c,d])
  B = [
  [
    [
      -15.287582653564613,
      -86.62819451395956,
      25.526086699861025
    ],
    [
      -47.95860884692999,
      -56.37235839066085,
      73.39129519830394
    ]
  ],
  [
    [
      104.89667923458757,
      -106.23135873559153,
      -0.6285054638346423
    ],
    [
      54.74588836393198,
      -136.80482472493077,
      -14.609000105807581
    ]
  ],
  [
    [
      233.63602687276824,
      -162.02970071596135,
      81.70786298436525
    ],
    [
      209.90248750835264,
      -101.49915369800271,
      45.37233835043891
    ]
  ]
]
  document.getElementById("exportBtn").addEventListener("click", () => {
  downloadJSON(B, "Bezier.json");
});
  
  console.log(B.length)
  
  clicked = false;
  clickedIndex = 0;
  clickedJindex = 0;
  clickedDist = 10000;
  let clickedHandleVector;
  curveShadows = true;
  mouseDown = false;
  
  shadowH = 100;
  
  params = {
    n: 10,
    curveShadows: true,
    handleShadows: false,
    showHandles: true,
    s: 2 
  }
  
  gui = new dat.GUI();
  gui.add(params, 'n', 1, 20, 1)
  gui.add(params, 'curveShadows')
  gui.add(params, 'handleShadows')
  gui.add(params, 'showHandles')
  gui.add(params, 's', 0.25, 5)
  
  colorMode(HSB)
  
}

function scaleB(B){
  for(let i = 0; i < B.length; i++){
    for(let j = 0; j < B[i].length; j++){
      for(let k = 0; k < B[i][j].length; k++){
        B[i][j][k] *= 2
      }
    }
  }
}

let counter = 0;
let grow = 1;

function draw() {
  background(20);
  clickedDist = 10000;
  fill(200)
  
  lights()
  // pointLight(100, 600, -mouseX, 255, 255, 255)
  // let c = color(255, 255, 255);
  // let lightPos = createVector(mouseX,- mouseY, 65);
  // pointLight(c, lightPos);
  // pointLight(c, lightPos);
  // pointLight(c, lightPos);
  
  
  // let c = color(255, 0, 0);
    // let position = createVector(0, 0, 100);
    // let direction = createVector(0, 0, -1);
    // spotLight(c, position, direction, PI / 3, 1000);
  
//   pointLight(255, 255, 255, L.x, L.y, L.z)
//   pointLight(255, 255, 255, L2.x, L2.y, L2.z)
  
  for(let i = 0; i < lights.length; i++){
    let p = lights[i]
    push()
      translate(p.x, 0, p.z)
      push()
        rotateX(PI/2)
        fill(10)
        circle(0, 0, 10)
      pop()
      translate(0, p.y, 0)
      sphere(5)
    pop()
  }
  // pointLight(255, 255, 255, 255, 255, 255)
  
  // Animate drawing of  curve
  // counter = (sin(frameCount/100) + 1) / 2 * ((B.length-1)*params.n)
  counter= (B.length-1)*params.n+1
  
  // Just show full curve
  // counter = (B.length-1)*params.n + 1
  
  curveShadows = params.curveShadows;
  handleShadows = params.handleShadows;
  n = params.n;
  
  if(!clicked) {
    
    orbitControl()
    // console.log(B.length)
    for(let i = 0; i < B.length; i++){
      for(let j = 0 ; j < 2; j++){
        let distThresh = 10 * params.s/4;  
        // console.log(B[i])
        let p = B[i][j]

        let dCamToTarget = dist(cam.eyeX, cam.eyeY, cam.eyeZ, p[0], p[1], p[2]);

        // raycast accepts a distance to cast the ray, a position of an object and a radius to the object.
        let ray = raycast(dCamToTarget, p, distThresh)

        if(ray[1]  && mouseDown && dCamToTarget < clickedDist){
          clicked = p;
          clickedIndex = i;
          clickedJindex = j;
          clickedHandleVector = vectorSubtract(B[clickedIndex][1],B[clickedIndex][0])
          clickedDist = dCamToTarget;
          // clicked[0] = ray[0][0];
          // clicked[1] = ray[0][1];
          // clicked[2] = ray[0][2];
          break;
        }
      }
    }
  } else {
    let dCamToTarget = dist(cam.eyeX, cam.eyeY, cam.eyeZ, clicked[0], clicked[1], clicked[2]);
    let ray = raycast(dCamToTarget, clicked, 50)
    
    if(clickedIndex%2==1 && clickedIndex !== B.length-1){
      
    }
    
    
    
//     if(clicked == c){
//       dv = [d.x, d.y, d.z];
//       ev = vectorAdd(dv, vectorSubtract(dv, ray[0]))
//       e.x = ev[0];
//       e.y = ev[1];
//       e.z = ev[2];
//     }
    
//     if(clicked == b){
//       av = [a.x, a.y, a.z];
//       fv = vectorAdd(av, vectorSubtract(av, ray[0]))
//       f.x = fv[0];
//       f.y = fv[1];
//       f.z = fv[2];
//     }
    
    clicked[0] = ray[0][0];
    clicked[1] = ray[0][1];
    clicked[2] = ray[0][2];
    
    if(clickedJindex == 0){
      // console.log("HI")
      B[clickedIndex][1] = vectorAdd(B[clickedIndex][0],clickedHandleVector)
    }
  }
  
  
  noStroke()
  
  // cylinder(15, 2000)
  
  // First handle
  b = vectorAdd(B[0][0], vectorSubtract(B[0][1], B[0][0]))
  a = B[0][0];
  
  if(params.showHandles){
    fill(80)
    line3D(a, b, params.s)

    fill(255, 0, 0)
    sphereAt(b, 2.5 *params.s)

    // Handle shadow
    if(handleShadows){
      push()
        colorMode(RGB)
        stroke(5)
        strokeWeight(3)
        line(a[0], 200, a[2], b[0], 200, b[2])
      pop()
    }
  }
  
  // push()
  //     translate(cart.x, cart.y, cart.z)
  //     fill(10)
  //     sphere(10)
  // pop()
  
  for(let i = 0; i < B.length-1; i++){
    let h = vectorAdd(B[i][0], vectorSubtract(B[i][0], B[i][1]))
    bez3D(B[i][0], h, B[i+1][1], B[i+1][0], n, i)
  }
  mouseDown = false;
}

// Draws a Bezier Curve from a to d with b and c handles and n intervals
// m is the index of the curve in the Bezier chain
function bez3D(a,b,c,d,n,m){
  let prevPt = [a[0], a[1], a[2]]
  for(let i = 1 ; i <= n; i++){
    let pt = bez(a, b, c, d, i/n);
    // fill(i/n*255, 255, 0)
    fill((n*m + i)/((B.length-1)*n)*360, 100, 100)
    
    let dx = pt[0] - prevPt[0];
    let dy = pt[1] - prevPt[1];
    let dz = pt[2] - prevPt[2];
    
    if(n*m + i < counter){
      line3D(prevPt, pt, params.s/2 * 3)
    }
    
    // Handles
    if(params.showHandles){
      fill(80)
      line3D(a, b, params.s)
      line3D(c, d, params.s)

      fill(100, 100, 255)
      sphereAt(a, 2.5*params.s)
      sphereAt(b, 2.5*params.s)
      fill(255, 0, 0)
      sphereAt(c, 2.5*params.s)
      fill(100, 100, 255)
      sphereAt(d, 2.5*params.s)

      // Shadows
      if(handleShadows){
        push()
          colorMode(RGB)
          stroke(5)
          strokeWeight(2)
          line(a[0], shadowH, a[2], b[0], shadowH, b[2])
          line(c[0], shadowH, c[2], d[0], shadowH, d[2])
        pop()
      }
    }
    
    
    
    
    // push()
    //   let pT = bez(a, b, c, d, ((frameCount/3)%n)/n)
    //   translate(pT[0], pT[1], pT[2])
    //   sphere(3)
    // pop()
    
    // Curve shadow
    if(curveShadows){
      push()
        colorMode(RGB)
        stroke(0)
        strokeWeight(2*params.s)
        line(prevPt[0], shadowH, prevPt[2], pt[0], shadowH, pt[2])
      pop()
    }
    
    
    prevPt[0] = pt[0];
    prevPt[1] = pt[1];
    prevPt[2] = pt[2];
  }
}

function bez(a, b, c, d, t){
  return [
    ((1-t)**3) * a[0] + 3*(1-t)**2 * t * b[0] + 3*(1-t)*t**2 * c[0] + t**3 * d[0],
    (1-t)**3 * a[1] + 3*(1-t)**2 * t * b[1] + 3*(1-t)*t**2 * c[1] + t**3 * d[1],
    (1-t)**3 * a[2] + 3*(1-t)**2 * t * b[2] + 3*(1-t)*t**2 * c[2] + t**3 * d[2]
  ]
}

function sphereAt(pt, r){
  push()  
    translate(pt[0],pt[1],pt[2])
    sphere(r)
    // translate(0, -pt[1] + 200, 0)
    // rotateX(PI/2)
    // fill(200)
    // circle(0, 0, 7)
  pop()
}

function keyPressed(){
  // If E key is pressed add a node to the Bezier curve 
  // Node located at Origin
  if(keyCode == 69){
    let lst = B[B.length-1][0]
    // New node point
    let lsth = vectorAdd(lst, scalarMultiply(2,vectorSubtract(lst, B[B.length-1][1])))
    // New node handle
    lsthndl = vectorAdd(lst, scalarMultiply(1.25,vectorSubtract(lst, B[B.length-1][1])))
    // console.log(lsth)
    B.push(node(lsth, lsthndl))
  }
  
  //Undo (press Z)
  if(keyCode == 90){
    B.pop()
  }
  
  // Press C to toggle curve shadows
  if(keyCode == 67){
    curveShadows = !curveShadows;
  }
  
  // Press P to print Bezier curve
  if(keyCode == 80){
    console.log(JSON.stringify(B));
    downloadJSON(B, "Bezier.json");
  }
}

function downloadJSON(data, filename = "Bezier.json") {
  const json = JSON.stringify(data, null, 2); // pretty print
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

function mousePressed(){
  mouseDown = true;
  
  // console.log(JSON.stringify([a, b, c, d, e, f]))
}

function mouseReleased(){
  clicked = false;
}




















function raycast(d, pos, thresh){
  // ***************   Unprojection   ***************

  // Normalized screen space  (0 : 1)  Viewport Coordinates
  let normX = mouseX/width;
  let normY = mouseY/height;

  // NDC Space (-1 : 1)  Normalized Device Coordinates
  let ndcX = (mouseX - width/2) / width * 2;
  let ndcY = (mouseY - height/2) / height * 2;
  let ndcZ = 1.0;
  ndc = [ndcX, -ndcY, ndcZ, 1]  // NDC vector

  // Projection Matrix
  let p = _renderer.uPMatrix.mat4;
  let projectionMatrix = [
    [p[0], p[1], p[2], p[3]],
    [p[4], p[5], p[6], p[7]],
    [p[8], p[9], p[10], p[11]],
    [p[12], p[13], p[14], p[15]]
  ]

  // Eye/view/camera space vector
  let camV = math.multiply(ndc, math.inv(projectionMatrix));

  // Division factor for perspective compensation
  let w = camV[3];

  // Model View Matrix

  const uMVMatrix = _renderer.uModelMatrix.copy().mult(_renderer.uViewMatrix)

  let m = uMVMatrix.mat4;
  let modelViewMatrix = [
    [m[0], m[1], m[2], m[3]],
    [m[4], m[5], m[6], m[7]],
    [m[8], m[9], m[10], m[11]],
    [m[12], m[13], m[14], m[15]]
  ]

  // World space
  let world = math.multiply(camV, math.inv(modelViewMatrix));

  // World space (compensating for perspective)
  let world2 = [world[0]/w, world[1]/w, world[2]/w]
  // ***************************************************

  // Ray length - distance from camera to pickable object
  let dRay = d;

  // Position of the tip of the ray in world space
  let phi = atan2(world2[1] - cam.eyeY, dist(world2[0], world2[2], cam.eyeX, cam.eyeZ))
  let th = -atan2(world2[0] - cam.eyeX, world2[2] - cam.eyeZ) + PI/2
  let ray = [cam.eyeX + dRay * cos(phi) * cos(th), 
           cam.eyeY + dRay * sin(phi), 
           cam.eyeZ + dRay * cos(phi) * sin(th)]

  // Picking detection
  if(dist(ray[0], ray[1], ray[2], pos[0], pos[1], pos[2]) < thresh) {
    return [ray, true]
  }
  return [ray, false];
}

function line3D(v1, v2, r){
  push()
    translate(v1[0], v1[1], v1[2])
    let v = vectorSubtract(v2,v1);
    let L = vectorMagnitude(v) + 2;
    let angles = eulerAngles(v);
    rotateZ(angles[0])
    rotateX(angles[1])
    translate(0, L/2, 0)
    cylinder(r, L)
    translate(0, L/2, 0)
  pop()
}

function eulerAngles(v){
  let th = atan2(v[1], v[0]) - PI/2; 
  // console.log(th)// Rotation about Z axis
  let phi = atan2(v[2], sqrt(v[0]**2 + v[1]**2)) // Rotation about X axis
  return [th, phi]
}

// Vector math functions
function scalarMultiply(s, v){
  return [v[0]*s, v[1]*s, v[2]*s]
}

function vectorAdd(v1, v2){
  return [v2[0]+v1[0], v2[1]+v1[1], v2[2]+v1[2]]
}

function vectorSubtract(v2, v1){
  return [v2[0]-v1[0], v2[1]-v1[1], v2[2]-v1[2]]
}

function randomUnitVector(){
  let v = [Math.random(), Math.random(), Math.random()]
  return vectorNormalize(v)
}

function vectorNormalize(v){
  let vectorLength = vectorMagnitude(v)
  return [v[0]/vectorLength, v[1]/vectorLength, v[2]/vectorLength]
}

function vectorMagnitude(v) {
  return Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
}
