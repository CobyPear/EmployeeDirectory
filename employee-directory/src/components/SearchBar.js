import React from 'react';
import Button from './Buttton';

function SearchBar(props) {
    return (
        <form className='form mb-3'>
            <label htmlFor='search'>Search: </label>
            <input 
                onChange={props.handleInputChange}
                value={props.value}
                name='search'
                type='search'
                className='form-control col'
                placeholder='Filter Employees by first, last, username, and location'
                id='search'
                />
        <Button 
        handleFormSubmit={props.handleFormSubmit}
        name={props.name}
        className='btn-success'
         />
        </form>
    )
}

export default SearchBar;