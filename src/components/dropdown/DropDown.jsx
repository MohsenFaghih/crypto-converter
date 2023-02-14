import React from 'react'
import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css';

const DropDown = ({fxData, dropdownHandler, defaultValue}) => {
    return (
        <SimpleDropdown
            options={fxData}
            labels={{selectedPrefix: 'Convert to', notSelected: 'Changing'}}
            onChange={(value) => dropdownHandler(value)}
            defaultValue={defaultValue}
            searchable
            configs={ { position: { y: 'bottom', x: 'center' } } }
        />
  )
}

export default DropDown