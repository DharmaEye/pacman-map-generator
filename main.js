var img = document.getElementById("img");

//color #2121de
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var width = 500;
var height = 550;
var isReady = false;

img.onload = function () {
    canvas.width = width;
    canvas.height = height;

    setColor();
}

function setColor() {
    var color = document.getElementById('colorc').value.replace('#', '').match(/.{1,2}/g);
    var r = parseInt(color[0], 16);
    var g = parseInt(color[1], 16);
    var b = parseInt(color[2], 16);

    loadMap({
        r:r,
        g:g,
        b:b
    });
}

function loadMap(color) {
    var data = [];

    ctx.drawImage(img, 1, 1);

    var imgData = ctx.getImageData(0, 0, width, height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        var r = imgData.data[i];
        var g = imgData.data[i+1];
        var b = imgData.data[i+2];

        if (!(r === 33 && g === 33 && b === 222)) {
            var x = (i / 4) % width;
            var y = Math.floor((i / 4) / width);
            var imageData = ctx.createImageData(1, 1);
            imageData.data[0] = 0;
            imageData.data[1] = 0;
            imageData.data[2] = 0;
            imageData.data[3] = 255;
            ctx.putImageData(imageData, x, y);
            continue;
        }

        var x = (i / 4) % width;
        var y = Math.floor((i / 4) / width);

        var imageData = ctx.createImageData(1, 1);
        imageData.data[0] = color.r;
        imageData.data[1] = color.g;
        imageData.data[2] = color.b;
        imageData.data[3] = 255;
        ctx.putImageData(imageData, x, y);
    }
}

document.getElementById('colorc').oninput = setColor;
