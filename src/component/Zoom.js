// 弹出层
import React, {Component} from 'react'
import Overlay from './overlay'
import styled from 'styled-components'
import defaultConfig from './config'
import {getScale} from "./utlis";
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
            hdSrc: props.hdSrc
        }
    }

    componentDidMount() {
        this.setState({hasLoaded: true})
    }

    unzoom() {
        const {option} = this.props

        this.setState({ isZoomed: false }, () => {
            setTimeout(() => {
                this.props.onUnzoom()
            }, option.animationTime)
        })
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
        const translateX = viewportX - imageCenterX
        const translateY = viewportY - imageCenterY

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

        const zoomStyle = {
            transform: `translate3d(${translateX}px, ${translateY}px, 0) 
            scale(${scale})`,
            WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0px)
            scale(${scale})`
        }

        return {
            ...defaultStyles.zoomImage,
            ...style,
            ...zoomStyle
        }

    }

    render() {
        const {src} = this.state
        const {image, defaultStyles, option} = this.props
        return (
            <ZoomContainer>
                <Overlay
                    isVisible={this.state.isZoomed}
                    defaultStyles={defaultStyles}
                />
                <ImgContainer
                    className='zoom-img'
                    {...this.props.zoomImage}
                    animationTime={option.animationTime}
                    src={src}
                    style={this._getZoomImageStyle()}
                    alt={image.alt}
                />
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
`

const ImgContainer = styled.img`
  cursor: zoom-out;
  position: absolute;
  transition: transform ${props => props.animationTime}ms;
  transform-origin: center center;
  will-change: transform, top, left;
  transform: translate3d(0, 0, 0) scale(1);
`

