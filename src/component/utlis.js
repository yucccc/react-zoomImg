// 创建容器
const body = document.body
const html = document.documentElement

const Win  = window
const windowW = Win.innerWidth
const windowH = Win.innerHeight
const htmlOverflow = 'visible';
const bodyOverflow = 'visible';

export const createPortalContainer = tag => {
    const portal = document.createElement(tag)
    body.appendChild(portal)
    return portal
}

// 移除dom
export const removePortalContainer = portal => {
    body.removeChild(portal)
}

// 计算最大缩放宽
export const computedMaxWidth = ({naturalWidth}) => {
    // 原始尺寸不足屏幕宽
    if (naturalWidth <= windowW) return naturalWidth
    return windowW
}

// 获取缩放比例
export const getScale = ({width, height, naturalWidth, naturalHeight}) => {
    // 要缩放的宽度
    const scaleWidth = computedMaxWidth({naturalWidth})
    return (scaleWidth / width).toFixed(6)
}

let overflowHtml = Win.getComputedStyle(html).overflow
let overflowBody = Win.getComputedStyle(body).overflow

// 禁止滚动
export const forbadeScroll = (flag = true) => {
    flag ?  ModalHelper.afterOpen() : ModalHelper.beforeClose()
}

var ModalHelper = (function(bodyCls) {
    var scrollTop;
    return {
        afterOpen: function() {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function() {
            document.body.classList.remove(bodyCls);
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})('modal-open');

