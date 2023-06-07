import React, { useState } from 'react';
import SearchBox from './userSearchBox';
import Dropdown from './userDropdown';
import { useNavigate } from 'react-router-dom';
const FilterComponent = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFactor, setSelectedFactor] = useState('');
    const navigate=useNavigate();
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFactorChange = (e) => {
    setSelectedFactor(e.target.value);
  };
  const handleFilterSubmit = () => {
    // Perform the filtering logic here based on searchValue and selectedFactor
    // console.log('Search Value:', searchValue);
    // console.log('Selected Factor:', selectedFactor);
    if(selectedFactor=="None"){  
      props.setValue("None");
      props.setFactor("None"); 
    }
    else{
      props.setValue(searchValue);
      props.setFactor(selectedFactor); 
    }
    // navigate("/events/userList",{state:{eventId:props.eventId}});

  };
  const factors = [
    { value: "None", label: "None" },
    { value: 'Community', label: 'Community' },
    { value: 'name', label: 'Name' }
  ];

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Filter</h1>
      <div className="flex space-x-4">
        <SearchBox value={searchValue} onChange={handleSearchChange} />
        <Dropdown options={factors} value={selectedFactor} onChange={handleFactorChange} />
        <button
          onClick={handleFilterSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
