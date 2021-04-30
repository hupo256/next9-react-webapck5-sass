import React, { Component } from 'react'
import ReactCardCarousel from 'react-card-carousel'
import _ from 'lodash'

const listData = [
  { text: 'Bob', imgUrl: '/img/home_cases/img_1.png' },
  { text: 'Bob2', imgUrl: '/img/home_cases/img_2.png' },
  { text: 'Bob3', imgUrl: '/img/home_cases/img_3.png' },
  { text: 'Bob4', imgUrl: '/img/home_cases/img_4.png' },
  { text: 'Bob5', imgUrl: '/img/home_cases/img_5.png' },
]

class MyCarousel extends Component {
  constructor(props) {
    super(props)
    this.Carousel = React.createRef()
    this.state = { currentIndex: 0 }
  }
  static get CONTAINER_STYLE() {
    return {
      position: 'relative',
      width: '100%',
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'middle',
      height: '400px',
    }
  }

  static get CARD_STYLE() {
    return {
      height: '400px',
      width: '733px',
      paddingTop: '80px',
      textAlign: 'center',
      background: '#52C0F5',
      color: '#FFF',
      fontFamily: 'sans-serif',
      fontSize: '12px',
      textTransform: 'uppercase',
      borderRadius: '10px',
      boxSizing: 'border-box',
    }
  }

  static get DESIGNER() {
    return {
      height: '221px',
      width: '358px',
      position: 'absolute',
      backgroundColor: '#fff',
      right: '-94px',
      bottom: '42px',
      color: '#000',
      borderRadius: '8px',
    }
  }

  refreshIndex() {
    const currentIndex = this.Carousel.current.getCurrentIndex()
    this.setState({ currentIndex })
  }

  render() {
    return (
      <div style={MyCarousel.CONTAINER_STYLE}>
        <ReactCardCarousel
          autoplay={false}
          autoplay_speed={10000}
          ref={this.Carousel}
          afterChange={() => this.refreshIndex()}
        >
          {_.map(listData, (value, index) => (
            <div
              style={{
                ...MyCarousel.CARD_STYLE,
                background: `url(${value.imgUrl}) no-repeat center center`,
              }}
              key={index}
            >
              {index === this.state.currentIndex && (
                <div style={MyCarousel.DESIGNER}>{value.text}</div>
              )}
            </div>
          ))}
        </ReactCardCarousel>
      </div>
    )
  }
}

export default MyCarousel
