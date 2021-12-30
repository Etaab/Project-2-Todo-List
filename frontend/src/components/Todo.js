import React from 'react'

export default function Todo(props) {
    const {_id, title, isCompleted} = props.task;
    return (
        
        <div className='Todo ms-1 me-3 text-center'>
            <label className="list-group-item">
            <input 
             className="form-check-input me-1"
             type="checkbox"
             defaultChecked={isCompleted} 
             onClick={() => {
              props.toggleTodo(_id, !isCompleted)
            }}/>
                <span id='t1' style={{ textDecoration:isCompleted? 'line-through':"none"}} > {title}</span>
            </label>

            
            
          { /*<button
               className="m-1 btn btn-light"
               id= 't1' onClick={() => {
               props.deleteTodo(_id)
           }}></button>*/}
        </div>
    )
}
