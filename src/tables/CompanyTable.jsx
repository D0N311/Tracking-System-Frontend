import { CompanyIndex } from '../api';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

export const CompanyTable = () => {

    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCompanies = async (page = 1) => {
        const response = await CompanyIndex(page);
        if (Array.isArray(response.data.data.data)) {
            setCompanies(response.data.data.data);
            setCurrentPage(response.data.data.current_page);
            setTotalPages(response.data.data.last_page);
        } else {
            console.error('CompanyIndex did not return an array');
        }
    };

    useEffect(() => {
      fetchCompanies();
    }, []);

    const openModal = (company) => {
        setSelectedCompany(company);
        setIsOpen(true);
      };
    
      const closeModal = () => {
        setIsOpen(false);
      };
    
      const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) {
            return;
        }
        fetchCompanies(page);
    };    
    return(
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="flex items-center justify-between mb-3">
    <h1 className="py-2 text-2xl font-bold text-gray-800 dark:text-gray-50">Companies</h1>
    <button onClick={fetchCompanies} className="px-4 py-2 font-bold text-white bg-blue-500 border-blue-700 rounded-3xl hover:bg-blue-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
</button>
</div>
    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Company name
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Company Admin
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Location
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Users
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Action
        </th>
    </tr>
</thead>
        <tbody>
            {companies.map((company) => (
            <tr key={company.id} className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {company.company_name}
                </th>
                <td className="px-6 py-4">
                {company.admin_name ? company.admin_name : 'No Admin'}
                </td>
                <td className="px-6 py-4">
                {company.location ? company.location : 'No Location'}
                </td>
                <td className="px-6 py-4">
                {company.user_count ? company.user_count : 'No User'}
                </td>
                <td className="px-6 py-4">
                <button onClick={() => openModal(company)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    {/* pagination */}
<nav aria-label="" className='flex justify-center mt-3'>
  <ul className="inline-flex -space-x-px text-sm">
    <li>
      <a onClick={() => handlePageChange(currentPage - 1)} className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 cursor-pointer ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    {[...Array(totalPages).keys()].map(page => (
          <li key={page}>
            <button onClick={() => handlePageChange(page + 1)} className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight ${currentPage === page + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{page + 1}</button>
          </li>
        ))}
    <li>
      <a onClick={() => handlePageChange(currentPage + 1)} className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Company Details"
        className="fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
    >
        <div className="w-1/2 bg-white rounded-lg">
    <div className="flex flex-col items-start p-4">
        <div className="flex items-center w-full">
            <div className="text-lg font-medium text-gray-900">{selectedCompany?.company_name}</div>
            
            <svg onClick={closeModal} className="w-6 h-6 ml-auto text-gray-700 cursor-pointer fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path d="M18 1.3L16.7 0 9 7.7 1.3 0 0 1.3 7.7 9 0 16.7 1.3 18 9 10.3l7.7 7.7 1.3-1.3L10.3 9z"/>
            </svg>
        </div>
        <hr className="w-full"/>
        {isEditing ? (
            <div className="flex items-center justify-center w-full ">
            <form className='w-full'>
                <label className="block mt-2">
                    <span className="text-gray-700">Admin</span>
                    <input type="text" className="block w-full mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0" defaultValue={selectedCompany?.admin_name} />
                </label>
                <label className="block mt-2">
                    <span className="text-gray-700">Location</span>
                    <input type="text" className="block w-full mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0" defaultValue={selectedCompany?.location} />
                </label>
                <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-400">Update</button>
            </form>
        </div>
        ) : (
            <>
                <p className="mt-2 text-gray-600">Admin: {selectedCompany?.admin_name}</p>
                <p className="mt-2 text-gray-600">Location: {selectedCompany?.location}</p>
            </>
        )}
        <div className="flex justify-end w-full mt-4">
          <button onClick={toggleEdit} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-400">
          {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        </div>
</div>
    </Modal>
</div>

    )
}