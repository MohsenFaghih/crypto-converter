import React from 'react'
import Spinner from 'react-spinner-material';


const Loading = () => {
  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Spinner /></div>
  )
}

export default Loading