import React from 'react'

const InfoMessage = ({message} : {message:string}) => {
  return (
    <div className='text-left p-3 border bg-gray-100 text-sm border-gray-400 rounded'>
      {message}
    </div>
  )
}

export default InfoMessage