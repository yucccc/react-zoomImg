import React from 'react'
import styled from 'styled-components'
import {string, bool, object, shape, number, arrayOf } from 'prop-types'
import ReactDOM from 'react-dom'
import EventsWrapper from './EventsWrapper'
import Zoom from './Zoom'

// 1. 长图 可超出屏幕
// 2. 宽  最大不超过屏幕B并且不超过原图宽度 默认到屏幕大小
// 3. 使用

export default class ZoomImg extends React.Component {

    static propTypes = {
        // 图片路径
        src: string.isRequired,
        // 图片描述
        alt: string,
        // 高清图地址 不传使用src
        hdSrc: string,
        // 默认样式
        defaultStyles: object,
        // 配置
        option : shape({
            // 进入与离开的时间
            animateTime: number,
            // 离开风格 未实现
            leaveStyle: string
        }),
        // 图片组
        imageSet: arrayOf(object),
        // 懒加载  未实现 暂不使用
        lazy: shape({
            // 是否懒加载
            isLazy: bool,
            // 懒加载封面图
            loading: string
        }),
        // ------是否放大----- 暂不使用
        isZoomed: bool
    }

    static defaultProps = {
        alt: '图像',
        defaultStyles: {
            image: {},
            zoomImage: {},
            overlay: {}
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            src: props.src,
            alt: props.alt,
            hdSrc: props.hdSrc ? props.hdSrc : props.src,
            isZoomed: false
        }

        this._handleZoom    = this._handleZoom.bind(this)
        this._handleUnzoom  = this._handleUnzoom.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // 将要关闭
        if (this.props.isZoomed && !nextProps.isZoomed) {
            this.isClosing = true
        }
    }

    componentWillUnmount() {

    }
    // 还原
    _handleUnzoom () {
        this.setState({
            isZoomed : false
        })
    }

    // 放大
    _handleZoom () {
        this.setState({ isZoomed : true })
    }

    componentDidMount() {

    }

    render() {
        const {isZoomed, hdSrc} = this.state
        const {src, alt, defaultStyles, option} = this.props
        return [
            <img key='image'
                 src={src}
                 alt={alt}
                 onClick={this._handleZoom}
                 ref={image => this.image = image}/>,
            (isZoomed || this.isClosing) &&
            <EventsWrapper
                key="portal"
                ref={p => this.portalInstance = p}
            >
                <Zoom
                    image={this.image}
                    hdSrc={hdSrc}
                    onUnzoom={this._handleUnzoom}
                    defaultStyles={defaultStyles}
                    option={option}
                >
                </Zoom>
            </EventsWrapper>
        ]
    }
}
