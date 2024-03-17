import React, { useState } from 'react';

export const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    companyName: '',
    adminName: '',
    description: '',
    location: ''
  });

  const [originalValues, setOriginalValues] = useState({ ...formValues });

  const toggleEdit = () => {
    if (isEditing) {
      setFormValues(originalValues);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.id]: event.target.value
    });
  };
  return (
    <div>
      <button onClick={toggleEdit} 
      className="block float-right w-auto px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:border-gray-500">
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
    <form className="w-full max-w-lg mx-auto mt-5">
      <div className="flex flex-wrap mb-6 -mx-3">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="company_name">
            Company Name
          </label>
          <input readOnly={!isEditing} value={formValues.companyName} onChange={handleChange}
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white" id="company_name" type="text" placeholder="Company Name"/>
        </div>
        <div className="w-full px-3">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="admin_name">
            Admin Name
          </label>
          <input readOnly={!isEditing} value={formValues.adminName} onChange={handleChange}
           className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="admin_name" type="text" placeholder="Admin Name"/>
        </div>
      </div>
      <div className="flex flex-wrap mb-6 -mx-3">
        <div className="w-full px-3">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="description">
            Description
          </label>
          <textarea readOnly={!isEditing} value={formValues.description} onChange={handleChange}
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder="Company Description"/>
        </div>
      </div>
      <div className="flex flex-wrap mb-2 -mx-3">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="location">
            Location
          </label>
          <input readOnly={!isEditing} value={formValues.location} onChange={handleChange}
           className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="location" type="text" placeholder="City"/>
        </div>
        <div className="w-full px-3 mt-6 md:mb-0">
        <button style={{display: isEditing ? 'block' : 'none'}} className="block w-full px-4 py-3 leading-tight border border-gray-200 rounded appearance-none dark:text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:border-gray-500" type="submit">Update</button>
        </div>
      </div>
    </form>
    </div>
  )
}