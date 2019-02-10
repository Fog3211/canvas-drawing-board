var canvas = document.getElementById("canvas");
var showMenuFlag = true;


// 画布初始化
function canvasInit() {
  var cW = document.documentElement.clientWidth;
  var cH = document.documentElement.clientHeight;
  canvas.width = cW;
  canvas.height = cH;
}



// 左侧菜单栏
function leftMenu() {
  var menu = document.getElementById("menu");
  var item = menu.getElementsByTagName("li");
  var showMenuBtn = item[item.length - 1].getElementsByTagName('span')[0];
  showMenuBtn.onclick = () => {
    showMenuFlag = !showMenuFlag;
    if (showMenuFlag) {
      menu.style.top = "0";
      menu.style.display = "block";
      showMenuBtn.className = "icon iconfont icon-icon--";
    } else {
      menu.style.top = "-300px";
      menu.style.display = "none";
      showMenuBtn.className = "icon iconfont icon-icon--1";
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

// 清空画板
function emptyBoard() {
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, canvas.width, canvas.height);
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

canvasInit();
leftMenu();
customMenu();