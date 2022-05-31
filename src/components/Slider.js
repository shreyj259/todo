import React from 'react'
import './style/slider.css'

const Slider = (props) => {
  
    
  return (
    <div className="slider-container">
        <input onInput={props.sliderHandler} disabled={props.disable} type="range" min="0" max="100" value={props.value} className="slider"/>
        <div className={`selector`} style={{left:props.value+"%"}}>
          <div className="select-btn"></div>
        </div>
        <div className="progress-bar" style={{width:props.value+"%"}}></div>
      </div>
  )
}

export default Slider;
