//below code is for canvas which stores everything in imageoncanvas array
  //---------------------------------------------------------------------------------------------------------
  var image = document.getElementById(''+copyid+'');
  
  var mouse_position_x = ev.dataTransfer.getData("mouse_position_x");
  var mouse_position_y = ev.dataTransfer.getData("mouse_position_y");
	var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
	imagesOnCanvas.push({
      context: ctx,  
      image: image,  
      x:ev.clientX - canvas.offsetLeft - mouse_position_x,
      y:ev.clientY - canvas.offsetTop - mouse_position_y,
      width: image.offsetWidth,
      height: image.offsetHeight
    });
  //----------------------------------------------------------------------------------------------------------

//--------
//function for canvas to render the image onto the canvas
function renderScene() {
    requestAnimationFrame(renderScene);

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,
        canvas.width,
        canvas.height
    );


    for(var x = 0,len = imagesOnCanvas.length; x < len; x++) {
        var obj = imagesOnCanvas[x];
		alert("made it here");
        obj.context.drawImage(obj.image,obj.x,obj.y);

    }
}

requestAnimationFrame(renderScene);


//monitor mousedown events on canvas, and if the event occurs on an image the startMove action can be called
//canvas.onmousedown = function(e) {
//    var downX = e.offsetX,downY = e.offsetY;

    // scan images on canvas to determine if event hit an object
//    for(var x = 0,len = imagesOnCanvas.length; x < len; x++) {
//        var obj = imagesOnCanvas[x];
//        if(!isPointInRange(downX,downY,obj)) {
//            continue;
//        }

//        startMove(obj,downX,downY);
//        break;
//    }

//}
//'move mode' is active, the x/y coordinates of the object are changed to reflect the new mouse position
function startMove(obj,downX,downY) {
    var canvas = document.getElementById('canvas');

    var origX = obj.x, origY = obj.y;
    canvas.onmousemove = function(e) {
        var moveX = e.offsetX, moveY = e.offsetY;
        var diffX = moveX-downX, diffY = moveY-downY;


        obj.x = origX+diffX;
        obj.y = origY+diffY;
    }

    canvas.onmouseup = function() {
        // stop moving
        canvas.onmousemove = function(){};
    }
}
//returns true if the mouse event occurred on an image object
function isPointInRange(x,y,obj) {
    return !(x < obj.x ||
        x > obj.x + obj.width ||
        y < obj.y ||
        y > obj.y + obj.height);
}