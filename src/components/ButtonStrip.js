import React from 'react'
import './style/buttonStrip.css'

export const ButtonStrip = (props) => {
  return (
    <div className='btn-container' >
        <button disabled={props.disable.save} onClick={()=>props.btnHandler(props.index,"save")}  className='save-container'><img src="https://i.ibb.co/QdzY2WT/save.png" alt="save" /></button>
        <button disabled={props.disable.update} onClick={()=>props.btnHandler(props.index,"update")} className='update-container'><img src="https://i.ibb.co/tPchBN4/edit.png" alt="edit"/></button>
        <button disabled={props.disable.delete} onClick={()=>props.btnHandler(props.index,"delete")}  className='delete-container'><img src="https://i.ibb.co/0ntF1Hd/delete.png" alt="delete"/></button>
    </div>
  )
}
