import { SearchInput } from '../api';
import React, { useState } from 'react';
import Modal from 'react-modal';

export const ActivateAdmin = () => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

    const fetchSearchResults = async () => {
        if (search) { // Only fetch if search is not empty
            const response = await SearchInput(search);
            console.log(response.data.data.name);
            setSearchResults(response.data);
            setIsOpen(true); // Open the modal after fetching the results
        }
    }

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission
        fetchSearchResults();
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return(
        <>
        <form className="max-w-md mx-auto" onSubmit={handleSearch}>   
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    id="default-search" 
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Admin's email or ID to activate" 
                    required 
                />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

            </div>
        </form>


        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Search Results"
            className="fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
        >                  
    <div id="popup-modal" tabindex="-1" className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-md max-h-full p-4">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        
                        <div className="p-4 text-center md:p-5">
                            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to activate {searchResults && searchResults.data ? searchResults.data.name : 'this user'} ?
                                The admin will no longer be able to access the system. Company data will not be deleted.
                            </h3>
                            
                            <button  type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button onClick={closeModal}  type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
    </Modal>

        </>
    )
}