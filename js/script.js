var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var showMenuFlag = true;
var lineWidth = 1;
var lineColor = "red";
var eraserEnable = false;
const sizeArr = ["", 1, 2, 4, 6, 8];
const colorArr = ["", "red", "green", "blueviolet", "blue", "yellow", "black", "gray"];
var colorSelectElm = document.getElementById("colorSelect");
var sizeSelectElm = document.getElementById("sizeSelect");

canvasInit();

// 画布初始化
function canvasInit() {
  var cW = document.documentElement.clientWidth;
  var cH = document.documentElement.clientHeight;
  canvas.width = cW;
  canvas.height = cH;

  leftMenu();
  customMenu();
  sizeSelect();
  colorSelect();
  listenToMouse(canvas);
}

// 左侧菜单栏
function leftMenu() {
  var menu = document.getElementById("menu");
  var item = menu.getElementsByTagName("li");
  var showMenuBtn = item[item.length - 1].getElementsByTagName('span')[0];
  // 画笔
  item[0].onclick = () => {
    eraserEnable = false;
  }
  // 橡皮擦
  item[1].onclick = () => {
    eraserEnable = true;
  }
  // 宽度
  item[2].onmouseover = () => {
    showSizeSelect();
  }
  // 颜色
  item[3].onmouseover = () => {
    showColorSelect();
  }
  // 菜单栏显隐
  item[4].onclick = () => {
    showMenuFlag = !showMenuFlag;
    if (showMenuFlag) {
      menu.style.top = "0";
      showMenuBtn.className = "icon iconfont icon-icon--";
      showMenuBtn.title = "隐藏菜单栏";
    } else {
      menu.style.top = "-200px";
      showMenuBtn.className = "icon iconfont icon-icon--1";
      showMenuBtn.title = "显示菜单栏";
    }
  }
}

//自定义右键菜单
function customMenu() {

  var contextmenu = document.getElementById('contextmenu');
  var item = contextmenu.getElementsByTagName('li');

  document.oncontextmenu = function (e) {

    var e = e || event;
    var sX = e.clientX;
    var sY = e.clientY;

    contextmenu.style.display = 'block';
    contextmenu.style.left = sX + 'px';
    contextmenu.style.top = sY + 'px';

    return false;
  };

  contextmenu.onclick = () => {
    contextmenu.style.display = 'none';
  };
  // 清空画板
  item[0].onclick = () => {
    emptyBoard();
  };
  // 全屏
  item[1].onclick = () => {
    fullScreen();
  };
  // 保存
  item[2].onclick = () => {
    saveImg();
  };
  // 退出
  item[3].onclick = () => {
    contextmenu.style.display = 'none';
  };
}

// 显示画笔粗细菜单
function showSizeSelect() {
  colorSelectElm.style.display = "none";
  sizeSelectElm.style.display = "block";
}

// 选择画笔粗细
function sizeSelect() {
  var item = sizeSelectElm.getElementsByTagName("li");
  for (let i = 0; i < item.length; i++) {
    item[i].onclick = function () {
      lineWidth = sizeArr[i];
      sizeSelectElm.style.display = "none";
    }
  }
}

// 显示颜色菜单
function showColorSelect() {
  sizeSelectElm.style.display = "none";
  colorSelectElm.style.display = "block";
}

// 选择颜色
function colorSelect() {
  var item = colorSelectElm.getElementsByTagName("li");
  for (let i = 0; i < item.length; i++) {
    item[i].onclick = function () {
      lineColor = colorArr[i];
      colorSelectElm.style.display = "none";
    }
  }
}

// 清空画板
function emptyBoard() {
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 全屏函数
function fullScreen() {
  var docElm = document.documentElement;

  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  }
}

// 保存成png图片
function saveImg() {
  let MIME_TYPE = 'image/png';
  let imgURL = canvas.toDataURL(MIME_TYPE);
  let aElement = document.createElement('a');

  aElement.download = 'Canvas-Picture';
  aElement.href = imgURL;

  aElement.click();
}

// 监听鼠标事件
function listenToMouse(canvas) {
  var usingMouse = false;
  var lastPoint = {
    'x': 0,
    'y': 0
  }

  canvas.onmousedown = function (e) { 
    var e = e || event;
    var x = e.clientX;
    var y = e.clientY;
    usingMouse = true;
    if (eraserEnable) {
      ctx.clearRect(x - 10, y - 10, 20, 20);
    } else {
      lastPoint = {
        'x': x,
        'y': y
      }
    }
  }
  canvas.onmousemove = function (e) { 
    var e = e || event;
    var x = e.clientX;
    var y = e.clientY;
    if (!usingMouse) {
      return;
    }

    if (eraserEnable) {
      ctx.clearRect(x - 10, y - 10, 20, 20);
    } else {
      var newPoint = {
        'x': x,
        'y': y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  }
  canvas.onmouseup = function () {
    usingMouse = false;
  }
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}