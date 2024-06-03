import { Button } from '@material-tailwind/react'
import React from 'react'

const OrangeButton = ({text}) => {
  return (
    <Button className='bg-orange flex justify-center items-center h-10 focus:outline-none w-auto p-2 m-2' >
    
    <p className="font-Nunitoo font-medium text-12 text-white">{text}</p>
    </Button>
  )
}

export default OrangeButton
