import React,{useState} from 'react'

export default function Add(props) {
    const [newTitle, setNewTitle] = useState('')

    const createNewTodo = () => {
       
        console.log('createNewTodo from ADD');
        props.createFunc({title: newTitle, isCompleted:false});
    };
    return (
        <div className='Add'>
            <input type='text' placeholder='Write new title here ...' onChange={(e) => {
             setNewTitle(e.target.value)
            }} />
            <button id='t1' onClick={createNewTodo}>Create New Todo</button>
        </div>
    )
}
