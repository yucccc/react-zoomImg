// 事件盒子
import React, { Component } from 'react';
import {createPortal}       from 'react-dom'
import { createPortalContainer, removePortalContainer } from "./utlis";

export default class PortalImg extends Component {

    constructor(props) {
        super(props)
        this.portal = createPortalContainer('div')
        this.unzoom = this.unzoom.bind(this)
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        removePortalContainer(this.portal)
    }

    _cloneChild() {
        return React.cloneElement(
            React.Children.only(
                this.props.children
            ), {
                ref: child => this.child = child
            }
        )
    }

    touchstart() {
        console.log('touchstart')
    }
    touchmove() {
        console.log('move')
    }
    touchend() {
        console.log('end')
    }
    unzoom() {
        return this.child.unzoom()
    }

    render() {
        return this.portal ?
            createPortal(
            <div onClick={this.unzoom}
                 onTouchStart={this.touchstart}
                 onTouchMove={this.touchmove}
                 onTouchEnd={this.touchend}
            >{this._cloneChild()}</div>,
            this.portal
        ) : null
    }
}