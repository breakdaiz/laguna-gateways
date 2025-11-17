import React from 'react'

const PageTitle = ({ title} : {title :string}) => {
  return (
    <h1 className='font-bold text-xl text-primary'> {title}</h1>
  )
}

export default PageTitle