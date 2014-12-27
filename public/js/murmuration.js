var egBird = {
    position: [100, 200],
    velocity: [10, 10]
}
var leftWing = [-10, -3];
var rightWing = [10, -3];

function moveBird(bird) {
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

    c.moveTo(ox + left[0], oy + left[1]);
    c.lineTo(ox, oy);
    c.lineTo(ox + right[0], oy + right[1]);
    c.stroke();
}

function draw() {
    var canvas = $(".maindisplay");
    var w = canvas.width();
    var h = canvas.height();
    canvas[0].width = w;
    canvas[0].height = h;
    var c = canvas[0].getContext("2d");

    c.fillStyle = "#80A0FF";
    c.fillRect(0, 0, w, h);

    drawBird(egBird, c);
}

$(function() {
    draw();
    window.setInterval(function () {
	draw();
    }, 100);
});
