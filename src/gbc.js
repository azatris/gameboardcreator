var tileWidth = 117;
var tileHeight = 135;

var w = window.innerWidth;
var h = window.innerHeight;

var stage = new Kinetic.Stage({
  container: 'container',
  x: w*0.03,
  y: h*0.03,
  width: w*0.97,
  height: h*0.97
});
var layer = new Kinetic.Layer();

var boardSizeX = parseInt(prompt("Please insert the horizontal number of tiles:","24"));
var boardSizeY = parseInt(prompt("Please insert the vertical number of tiles:","8"));
var landPercentage = parseInt(prompt("Please insert the percent (%) of land tiles:","20")) / 100;
var cityPercentage = parseInt(prompt("Please insert the percent (%) of city tiles:","5")) / 100;

// var boardSizeX = 12;
// var boardSizeY = 36;
var scaleX = (w*0.9/tileWidth - 0.5)/boardSizeX;
var scaleY = (h*0.9/(tileHeight*0.75) - 0.25)/boardSizeY;
var scale = Math.min(scaleX, scaleY);
console.log("scaleX: " + scaleX + " and scaleY: " + scaleY);


for (var i = 0; i < boardSizeY; i++) {
  for (var j = 0; j < boardSizeX; j++) {
    var x = i % 2 == 0 ? tileWidth*j*scale : (tileWidth*j + tileWidth/2)*scale;
    var y = tileHeight*0.75*i*scale;
    drawTileAt(x, y);  
  }
}


console.log(stage[x]);

function drawTileAt(x, y) {
  var tile = new Image();
  tile.onload = function() {
    var aTile = new Kinetic.Image({
      x: x,
      y: y,
      image: tile,
      width: 117,
      height: 135
    });
    aTile.scale({x:scale,y:scale});
    layer.add(aTile);
    stage.add(layer);
  };
  if (Math.random() < cityPercentage) {
    tile.src = "bin/tile_city.png";
  } else if (Math.random() > landPercentage) {
    var n = Math.random();
    if (n > 0.66) {
      tile.src = "bin/tile_sea_1.png";
    } else if (n > 0.33) {
      tile.src = "bin/tile_sea_2.png";
    } else {
      tile.src = "bin/tile_sea_3.png";
    }
  } else {
    tile.src = "bin/tile_land.png";
  }

}
