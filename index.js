let canvas = document.getElementById('canvas'); //获取到canvas
let ctx = canvas.getContext('2d'); //设置2d
let isTouchDevice = 'ontouchstart' in document.documentElement; // 判断是不是移动端
let painting = false;
let last;
canvas.height = document.documentElement.clientHeight; // 设置canvas的高度
canvas.width = document.documentElement.clientWidth; // 设置canvas的宽度
ctx.fillStyle = 'black'; // 填充颜色
ctx.strokeStyle = 'none'; // 描边颜色
ctx.lineWidth = '10';
ctx.lineCap = 'round';
  function drawLine(x1,y1,x2,y2) { // 创建一个画图的函数
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke()
  }
if (isTouchDevice) { // 判断是不是移动端
  canvas.ontouchstart = (e) => { // 当开始点击的时候初始化last
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    last = [x, y]
  }
  canvas.ontouchmove = (e) => { // 当开始滑动的时候 重置xy输入到画图函数中
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    drawLine(last[0],last[1],x,y)
    ctx.stroke()
    // 最后实时更新最后的位置
    last = [x, y]
  }
}else {
  // 当鼠标按下的时候 让painting为true判断正在绘画
  canvas.onmousedown = (e) => {
    painting = true
    last = [e.clientX, e.clientY];
  }
  // 当鼠标开始绘画的时候判断
  canvas.onmousemove = (e) => {
    // 如果为真的情况下
    if(painting === true) {
    drawLine(last[0],last[1],e.clientX,e.clientY);
    ctx.stroke();
    last = [e.clientX, e.clientY]
    }
  }
  // 当鼠标抬起 让绘画停止
  canvas.onmouseup = function () {
    painting = false
  }
}