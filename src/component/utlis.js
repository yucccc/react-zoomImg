// 创建容器
const body = document.body
const Win  = window
const windowW = Win.innerWidth
const windowH = Win.innerHeight

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
    return (scaleWidth / width).toFixed(4)
}

// 禁止滚动
export const forbadeScroll = () => {
    let overflowH = Win.getComputedStyle(html).overflow
    let overflowB = Win.getComputedStyle(body).overflow
    // let posB      = Win.getComputedStyle(body).position
    this.setState({
        htmlOverflow: overflowH,
        bodyOverflow: overflowB
    })

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    // body.style.position = 'fixed'
}