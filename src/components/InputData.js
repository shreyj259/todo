import React,{useRef} from 'react'

const InputData = (props) => {
    const taskInputRef=useRef();

  return (
    <div>
        <div>
            <input ref={taskInputRef}/>
        </div>
        <div>
            <button onClick={(e)=>props.addHandler(e,taskInputRef)}>+</button>
        </div>
    </div>
  )
}

export default InputData;
