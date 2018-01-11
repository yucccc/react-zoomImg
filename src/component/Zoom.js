// 弹出层
import React, {Component} from 'react'
import Overlay from './overlay'
import styled from 'styled-components'
import defaultConfig from './config'
import {getScale, forbadeScroll} from "./utlis";
import './scrolling'
import './../style/common.css'
import BScroll from 'better-scroll'
const Win  = window
const windowW = Win.innerWidth
const windowH = Win.innerHeight

export default class Zoom extends Component {
    static defaultProps = {
        // 放大信息
        zoomImage: {},
        option: {
            animationTime: defaultConfig.transitionDuration
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            // 加载图片
            hasLoaded: false,
            // 是否放大
            isZoomed: true,
            // 原始src
            src: props.image.currentSrc || props.image.src,
            hdSrc: props.hdSrc,
        }
    }

    componentDidMount() {
        // forbadeScroll()

        setTimeout(()=>{
            this.setState({hasLoaded: true})
        },0)
        let scroll = new BScroll('.wrapper', {
            click: true
        })

    }

    unzoom() {
        const {option} = this.props

        // forbadeScroll(false)

        this.setState({ isZoomed: false }, () => {
            setTimeout(() => {
                this.props.onUnzoom()
            }, option.animationTime)
        })

    }
    componentWillMount () {

    }
    _getH(h) {
        return h
    }
    // 获取放大图片样式
    _getZoomImageStyle() {
        const {image, defaultStyles} = this.props
        // 获取原始图片信息
        const imageOffset = image.getBoundingClientRect()

        // getBoundingClientRect 获取宽高包括border padding
        const {left, top,} = imageOffset
        const {width, height, naturalWidth, naturalHeight} = image

        const style = {left, top, width, height}

        // 中心点
        const viewportX = window.innerWidth  / 2
        const viewportY = window.innerHeight / 2

        // 图片中心
        const imageCenterX = left + width  / 2
        const imageCenterY = top  + height / 2

        // 偏移位置
        let translateX = viewportX - imageCenterX
        let translateY = viewportY - imageCenterY

        const scale = getScale({
            width,
            height,
            naturalWidth,
            naturalHeight
        })

        // 在加载中
        if (!this.state.hasLoaded || !this.state.isZoomed) {
            return {
                ...defaultStyles.zoomImage,
                ...style
            }
        }
        // 长图
        const scaleHeight = scale * height
        let scrollHeight = '100%'
        if (scaleHeight > windowH) {
            const beyondH = (scaleHeight - windowH) / 2
            translateY = beyondH + translateY
            scrollHeight = scaleHeight
        }

        const zoomStyle = {
            transform: `translate3d(${translateX}px, ${translateY}px, 0) 
            scale(${scale})`,
            WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0px)
            scale(${scale})`
        }

        return {
            ...defaultStyles.zoomImage,
            ...style,
            ...zoomStyle,
            scrollHeight
        }


    }

    render() {
        const {src} = this.state
        const {image, defaultStyles, option} = this.props
        const zoomStyle = this._getZoomImageStyle()
        return (
            <ZoomContainer  >
                <Overlay
                    isVisible={this.state.isZoomed}
                    defaultStyles={defaultStyles}
                />
                <div className={'wrapper'} >
                    <div style={{height: zoomStyle.scrollHeight}}>
                        <ImgContainer
                            className='zoom-img'
                            {...this.props.zoomImage}
                            animationTime={option.animationTime}
                            src={src}
                            style={zoomStyle}
                            alt={image.alt}
                        />
                    </div>
                </div>
            </ZoomContainer>
        )
    }
}


const ZoomContainer = styled.div`
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   overflow: hidden;
`

const ImgContainer = styled.img`
  cursor: zoom-out;
  position: absolute;
  transition: transform ${props => props.animationTime}ms;
  transform-origin: center center;
  will-change: transform, top, left;
  transform: translate3d(0, 0, 0) scale(1);
`

