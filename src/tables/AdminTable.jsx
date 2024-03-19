
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { adminIndex, deactivateAdmin } from '../api';

export const AdminTable = () => {
    const [admins, setAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null); 

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await adminIndex(currentPage);
                setAdmins(response.data.data.data);
                setTotalPages(response.data.data.last_page); // Use last_page field to set totalPages
            } catch (error) {
                console.error('Failed to fetch admins:', error);
            }
        };
    
        fetchAdmins();
    }, [currentPage]);

    const handleDeactivate = async (selectedAdmin) => {  
        const admin_id = selectedAdmin.id;
        try {
            const response = await deactivateAdmin(admin_id);
            console.log(response);
            closeModal();
        } catch (error) {
            console.error('Failed to deactivate admin:', error);
        }
    }
      
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        setCurrentPage(newPage);
    }
    
    const handleDeactivateClick = (admin) => {
        setSelectedAdmin(admin);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return(
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="flex items-center justify-between mb-3">
    <h1 className="py-2 text-2xl font-bold text-gray-800 dark:text-gray-50">Admins</h1>
    <button  className="px-4 py-2 font-bold text-white bg-blue-500 border-blue-700 rounded-3xl hover:bg-blue-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
</button>
</div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            ID
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Admin name
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Admin Email
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            activated at
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Company
        </th>
        <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
            Action
        </th>
    </tr>
</thead>
        <tbody>
        {admins.map((admin, index) => (
            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {admin.id}
                </th>
                <td className="px-6 py-4">
                    {admin.name}
                </td>
                <td className="px-6 py-4">
                    {admin.email}
                </td>
                <td className="px-6 py-4">
                    {admin.activated_at ? admin.activated_at : 'Not activated'}
                </td>
                <td className="px-6 py-4">
                {admin.company.company_name ? admin.company.company_name : 'No Company'}
                </td>
                
                <td className="px-6 py-4">
                <button onClick={() => handleDeactivateClick(admin)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Deactivate</button>
                </td>
            </tr>
           ))}
        </tbody>
    </table>

    
{/* pagination */}
<nav aria-label="" className='flex justify-center mt-3'>
  <ul className="inline-flex -space-x-px text-sm">
    <li>
      <a onClick={() => handlePageChange(currentPage - 1)} className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    {[...Array(totalPages).keys()].map(page => (
          <li key={page}>
            <button onClick={() => handlePageChange(page + 1)} className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight ${currentPage === page + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{page + 1}</button>
          </li>
        ))}
    <li>
      <a onClick={() => handlePageChange(currentPage + 1)} className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>



<Modal
    isOpen={modalIsOpen}
    onRequestClose={() => setIsOpen(false)}
    contentLabel="Company Details"
    className="fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
>                     
    <div id="popup-modal" tabindex="-1" className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to deactivate {selectedAdmin?.name}?
                            The admin will no longer be able to access the system. Company data will not be deleted.
                                </h3>
                            <button onClick={() => handleDeactivate(selectedAdmin)}  type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button onClick={closeModal}  type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
    </Modal>
</div>

    )
}

