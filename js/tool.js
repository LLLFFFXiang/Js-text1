let getStyle = function(obj, styleName){
    return parseInt(window.getComputedStyle && window.getComputedStyle(obj, null)
        [styleName] || obj.currentStyle[styleName]);
};

let move = function(obj, endPoint, speed, dir, callback){ // 对象、位置、速度、方向，回调函数
    switch(dir){
        case 1:
            dir = "left";
            break;
        case 2:
            dir = "top";
            break;
        default:
            dir = "left";
            break;
    }

    clearInterval(obj.time);// 关闭定时器，防止同一对象多次调用叠加速度
    let objdir = getStyle(obj, dir); // 获取开始时元素位置
    if(objdir > endPoint){ // 判断速度，如果目标值比开始小则速度为负值
        speed = -speed;
    }

    obj.time = setInterval(function(){ // 为元素添加time属性且开启定时器
        objdir = getStyle(obj, dir);
        obj.style[dir] = objdir + speed + "px";
        if(speed < 0){
            if(objdir <= endPoint){ // 判断是否到达目标位置
                obj.style[dir] = endPoint + "px";  // 改变坐标
                clearInterval(obj.time);
                callback && callback(); // 判断是否有回调函数，有则执行
            }
        }else{
            if(objdir >= endPoint){
                obj.style[dir] = endPoint + "px";
                clearInterval(obj.time);
                callback && callback();
            }
        }
    }, 30);
};
