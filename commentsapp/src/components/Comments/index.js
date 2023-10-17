import React from 'react'
import CommentItem from '../CommentItem'
import { useState} from 'react'
import{v4} from 'uuid'
import './index.css'


const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]


export default function Comments(props) {
  const[nameInput,setNameInput]=useState('');
  const[commentInput,setCommentInput]=useState('');
  const[commentsList,setCommentsList]=useState([]);



const onChangeNameInput=(searchValue)=>{
  setNameInput(searchValue)
}

const onChangeCommentInput=(searchValue)=>{
  setCommentInput(searchValue)
}


const deleteComment=commentId=>{
  setCommentsList(commentsList.filter(
    comment=>comment.id!==commentId
  ))
}

const toggleIsLiked=id=>{
  setCommentsList(commentsList.map(eachComment=>{
    if(id===eachComment.id){
      return {...eachComment,isLiked:!eachComment.isLiked}
    }
    return eachComment
  }))
}

const renderCommentsList=()=>{
  return commentsList.map(eachComment=>(
    <CommentItem
    key={eachComment.id}
    commentDetails={eachComment}
    toggleIsLiked={toggleIsLiked}
    deleteComment={deleteComment}/>
  ))
}


const onAddComment=event=>{
  event.preventDefault()
  const initialBackgroundColorCalssName=`intial-container ${
    initialContainerBackgroundClassNames[
      Math.ceil(
        Math.random()*initialContainerBackgroundClassNames.length-1,
      )
    ]
  }`

 
const newComment={
  id:v4(),
  name:nameInput,
  comment:commentInput,
  date:new Date(),
  isLiked:false,
  intialClassName:initialBackgroundColorCalssName,
}
setCommentsList([...commentsList, newComment])
setNameInput('')
setCommentInput('')
console.log(newComment)
}

  return (
    <div className='main-container'>
    <div className='comments-app-container'>
<h1 className='app-heading'>Comments</h1>
<div className='comments-inputs'>
  <form className='form' onSubmit={onAddComment}>
    <p className='form-description'>
      Say something about 4.0 Technologies
    </p>
    <input 
    type='text'
    className='name-input'
    placeholder='Your Name'
    value={nameInput}
    onChange={(e)=>onChangeNameInput(e.target.value)}/>
    <textarea 
    className='comment-input'
    value={commentInput}
    placeholder='Your Comment'
    rows="6"
    onChange={(e)=>onChangeCommentInput(e.target.value)}/>
    <button 
    type="submit" 
    className='add-button'>
      Add Button
    </button>
  </form>
  <img 
  src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
  alt="comments"
  className='image'/>
</div>
<hr className='line'/>
<p className='heading'>
  <span className='comments-count'>{commentsList.length}</span> Comments
</p>
<ul className='comments-list'>
  {
   renderCommentsList()
  }
</ul>
    </div>  
    </div>
  )
}
