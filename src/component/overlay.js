// 遮罩层
import React, {Component} from 'react'
import styled from 'styled-components'

import defaultConfig from './config'

export default class Overlay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }

        this._getStyle = this._getStyle.bind(this)
    }

    componentDidMount() {
        this.setState({isVisible: true})
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isVisible) this.setState({isVisible: false})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.isVisible !== this.state.isVisible ||
            nextProps.isVisible !== this.props.isVisible
        )
    }

    _getStyle() {
        // 将透明度转为 0 || 1
        const opacity = this.state.isVisible & 1
        const {overlay} = this.props.defaultStyles
        return {...overlay, opacity}
    }


    render() {
        return <OverlayContainer
            animationTime={defaultConfig.transitionDuration}
            style={this._getStyle()}/>
    }
}

const OverlayContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .3);
    opacity: 0;
    transition: opacity ${props => props.animationTime}ms;
`

