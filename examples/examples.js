import React from 'react'
import styled from 'styled-components'
// import ZoomImg from '../src/index'
import ZoomImg from '../dist/react-zoomImg'
import img1 from './images/person.jpeg'

export default class Examples extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scaleW: document.documentElement.clientWidth > 414 ? .6 : 1
        }
    }

    render() {
        return <Container>
            <div className={'title'}>
                <h1>react-zoomImg</h1>
                <p>基于react的一个微信风格图片可缩放控件 | 支持拖拽、放大/缩小</p>
                <h2>普通使用</h2>

                <ZoomImg src={img1}
                         alt={'图片'}
                         className={'demo1'}
                         defaultStyles={{
                             zoom: {},
                             image: {},
                             overlay: {
                                 backgroundColor: 'rgba(0,0,0,.8)'
                             }
                         }}
                >
                </ZoomImg>

                <h1>长图</h1>
                <ZoomImg src={img1}
                         alt={'图片'}
                         className={'demo1'}

                         defaultStyles={{
                             zoom: {},
                             image: {},
                             overlay: {
                                 backgroundColor: 'rgba(0,0,0,.3)'
                             }
                         }}
                         option={{
                             animationTime: 1000
                         }}
                >
                </ZoomImg>
            </div>
        </Container>
    }
}

const Container = styled.div`
   .title {
      h1 {
          font-size: 30px;
      }
      text-align: center;
   }
   img {
      width: 300px;      
   }
`