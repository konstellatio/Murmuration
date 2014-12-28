// Constants
var leftWing = [-10, -3];
var rightWing = [10, -3];
var initialVelocity = 20;
var cohesionPower = 1;
var cohesionScale = 1;

// Birds
var egBird = {
    position: [100, 200],
    velocity: [10, 10]
};
function moveBird(bird, dt) {
    bird.position[0] += bird.velocity[0] * dt;
    bird.position[1] += bird.velocity[1] * dt;
}
function rotate(vec, angle) {
    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);
    return [
        cosA * vec[0] - sinA * vec[1],
        sinA * vec[0] + cosA * vec[1]
    ];
}
function drawBird(bird, c) {
    c.beginPath();
    var ox = bird.position[0];
    var oy = bird.position[1];
    var a = -Math.atan2(bird.velocity[0], bird.velocity[1]);
    var left = rotate(leftWing, a);
    var right = rotate(rightWing, a);

    c.lineWidth = "3";
    c.moveTo(ox + left[0], oy + left[1]);
    c.lineTo(ox, oy);
    c.lineTo(ox + right[0], oy + right[1]);
    c.stroke();
}
function randomBirds(n, w, h) {
    var birds = [];
    for (var i = 0; i < n; ++i) {
        var orientation = Math.random() * 2 * Math.PI;
        birds.push({
            position: [
                w * Math.random(),
                h * Math.random()
            ],
            velocity: [
                initialVelocity * Math.cos(orientation),
                initialVelocity * Math.sin(orientation)
            ]
        });
    }
    return birds;
}

// Flocking


// App
var frameRate = 10;
var birds = null;
function draw() {
    var canvas = $(".maindisplay");
    var w = canvas.width();
    var h = canvas.height();
    canvas[0].width = w;
    canvas[0].height = h;
    var c = canvas[0].getContext("2d");

    c.fillStyle = "#80A0FF";
    c.fillRect(0, 0, w, h);

    birds.forEach(function (bird) {
        cohesion(bird,birds,1.0/frameRate)
        moveBird(bird, 1.0/frameRate);
        avoidWall(bird,w,h)
        drawBird(bird, c);
    });
}

$(function() {
    var canvas = $(".maindisplay");
    var w = canvas.width();
    var h = canvas.height();
    birds = randomBirds(100, w, h);

    draw();
    window.setInterval(function () {
        draw();
    }, 1000.0 / frameRate);
});

function cohesion(bird,others,timestep) {
    var x = 0;
    var y = 0;
    others.forEach(function (bird) {
        x += bird.position[0];
        y += bird.position[1];
    })
    x /= others.length;
    y /= others.length;
    var dx = x - bird.position[0];
    var dy = y - bird.position[1];
    var scale = cohesionScale/Math.pow(dx*dx + dy*dy,(cohesionPower-1)/2);
    bird.velocity[0] += timestep * scale * dx;
    bird.velocity[1] += timestep * scale * dy;
}

function avoidWall(bird, width, height) {
    var x = bird.position[0];
    var y = bird.position[1];
    var xinc = bird.velocity[0];
    var yinc = bird.velocity[1];
    if((xinc<0 && x <= 0) || (xinc>0 && x >= width)) {
        bird.velocity[0] *= -1;
    }
    if((yinc<0 && y <= 0) || (yinc>0 && y >= height)) {
        bird.velocity[1] *= -1;
    }
}