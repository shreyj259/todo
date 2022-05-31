import React from 'react'
import { ButtonStrip } from './ButtonStrip'
import Slider from './Slider'
import './style/card.css'

const Card = (props) => {
  let conditionalStyles="";
  if(props.value<=20){
      conditionalStyles="red"
  }else if(props.value>20 && props.value<=60){
      conditionalStyles="orange"
  }else if(props.value>60 && props.value<90){
      conditionalStyles="yellow"
  }else{
      conditionalStyles="green";
  }
  
  return (
    <div className={`card-container ${conditionalStyles}`}>
        <div className='card-header'>{props.name}</div>
        <Slider disable={props.disable.save} sliderHandler={props.sliderHandler} value={props.value}/>
        <div className='card-bottom'>
            <div className='value-container'>{props.value}</div>
            <ButtonStrip index={props.index} btnHandler={props.btnHandler} disable={props.disable}/>
        </div>
    </div>
  )
}


export default Card;