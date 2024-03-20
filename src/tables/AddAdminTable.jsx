import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { noRoleIndexAPI, ActivateAdminAPI } from '../api';
import { ToastContainer, toast } from 'react-toastify';

export const AddAdminTable = () => {
    const [admins, setAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);

    const fetchAdmins = async () => {
        try {
            const response = await noRoleIndexAPI(currentPage);
            setAdmins(response.data.data.data);
            setTotalPages(response.data.data.last_page); // Use last_page field to set totalPages
        } catch (error) {
            console.error('Failed to fetch admins:', error);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, [currentPage]);
      
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        setCurrentPage(newPage);
    }

    const handleActivateClick = async (admin) => {
        
      
        try {
            const response = await ActivateAdminAPI(admin);
            closeModal();
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
           
        } catch (error) {
            console.error('Failed to activate admin:', error);
        }
        setIsOpen(false);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return(

        <>
        <button onClick={() => setShowAddAdminModal(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Add Admin
        </button>
        <Modal
            isOpen={showAddAdminModal}
            onRequestClose={() => setShowAddAdminModal(false)}
            contentLabel="Add Admin"
            className="fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
        >
        <div className="relative p-10 overflow-x-auto bg-gray-300 shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between mb-3">
            <h1 className="py-2 text-2xl font-bold text-gray-800 dark:text-gray-50">Add Admin</h1>
            <div className="flex justify-end space-x-2">
                <button onClick={fetchAdmins} className="px-4 py-2 font-bold text-white bg-blue-500 border-blue-700 rounded-3xl hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
                <button onClick={() => setShowAddAdminModal(false)}>
                    <svg  className="w-6 h-6 ml-auto text-gray-700 cursor-pointer fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                        <path d="M18 1.3L16.7 0 9 7.7 1.3 0 0 1.3 7.7 9 0 16.7 1.3 18 9 10.3l7.7 7.7 1.3-1.3L10.3 9z"/>
                    </svg>
                </button>
            </div>
        </div>
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
                    Name
                </th>
                <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
                    Email
                </th>
                <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
                    Action
                </th>
            </tr>
        </thead>
                <tbody>
                {admins.map((admin) => (
                    <tr key={admin.id} className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                        <th className="px-6 py-4">
                        {admin.name}
                        </th>
                        <td className="px-6 py-4">
                        {admin.email}
                        </td>                       
                        <td className="px-6 py-4">                        
                        <button onClick={() => handleActivateClick(admin)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Activate</button>
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
        
        
        
      
        </div>
        <ToastContainer />
        </Modal>
        </>
            )
}
