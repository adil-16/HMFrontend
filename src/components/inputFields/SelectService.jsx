import React, { useState } from 'react'
import { CheckboxLabel } from '../checkbox/CheckBoxBlue'

const SelectService = ({value}) => {
    const [isChecked, setIsChecked] = useState(value.selected)
  return (
    <div className='w-full flex justify-between items-center bg-white p-2 px-4 shadow-lg my-2.5 rounded-lg'>
      <p className='font-Nunitoo text-14 font-medium text-blue'>{value.name}</p>
      <CheckboxLabel isChecked={isChecked} setIsChecked={setIsChecked} />
    </div>
  )
}

export default SelectService
