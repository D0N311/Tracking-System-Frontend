import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { noRoleIndexAPI, activeUsers, deactivateUser } from '../api';
import { ToastContainer, toast } from 'react-toastify';
export const CurrentUsers = () => {

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 


    const fetchUsers = async () => {
        try {
            const response = await activeUsers(currentPage);
            setUsers(response.data.data.data);
            setTotalUsers(response.data.data.total);
            setTotalPages(response.data.data.last_page);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    }

    const deactUser = async (selectedUser) => {
        const user_id = selectedUser?.id;
        try {
            const response = await deactivateUser(user_id);
            // toast.error(response.data.message, {
            //     position: "top-center",
            //     autoClose: 1000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            // });
            fetchUsers();
            closeModal();
        } catch (error) {
            console.error('Failed to deactivate user:', error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const handleRemoveClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }
    
    const handlePageChange = (pageNumber) => {
        if(pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

        return(
        <>
        <div className='mt-3 overflow-auto md:w-3/5 md:mb-5'>
        <div class="flex items-center justify-between">
            <div className='flex'>
            <h2 class="text-xl font-bold dark:text-white">Current Users</h2>
            <h2 class="text-xl font-bold text-green-500 ml-4">{totalUsers}</h2>
            </div>
            <button onClick={fetchUsers} className="justify-end px-4 py-2 font-bold text-white bg-blue-500 border-blue-700 rounded-3xl hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
                 name
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
                Email
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
                activated at
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3 bg-white">
                Action
            </th>
        </tr>
    </thead>
            <tbody>
            
            {users.map(user => (
                <tr  className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                    <th className="px-6 py-4">
                        {user.name}  
                    </th>
                    <td className="px-6 py-4">
                       {user.email}
                    </td>
                    <td className="px-6 py-4">
                        {user.activated_at}
                    </td>
                    <td className="px-6 py-4">
                    <button onClick={() => handleRemoveClick(user)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Remove</button> 
                    </td>
                </tr>
            ))}
            
            </tbody>
        </table>
          {/* pagination */}
          <nav aria-label="" className='flex justify-end mt-3'>
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

        <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            contentLabel="Remove User"
            ariaHideApp={false}
            className="fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
            >
        <div tabIndex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to remove {selectedUser?.name} to the company?</h3>
                        <button onClick={() => deactUser(selectedUser)} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure
                        </button>
                        <button onClick={closeModal} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
        </Modal>
        <ToastContainer />
    </>
    )
}