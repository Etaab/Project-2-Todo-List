import React,{useState} from 'react'

export default function Add(props) {
    const [newTitle, setNewTitle] = useState('')

    const createNewTodo = () => {
       
        console.log('createNewTodo from ADD');
        props.createFunc({title: newTitle, isCompleted:false});
    };
    return (
        <div className='Add'>
            <input type='text' 
            className="btn btn-light"
            placeholder='اكتب هنا ...' onChange={(e) => {
             setNewTitle(e.target.value)
            }} />
            <button
            id='t1' onClick={createNewTodo} 
            className="m-1 btn btn-outline-light"
            > إضافة مهمة جديده</button>
        </div>
    )
}
