import { useEffect, useState } from 'react';
import { noRoleIndexAPI, activateUser } from '../api';
import { ToastContainer, toast } from 'react-toastify';

export const ActivateUsersTable = () => {

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [reload, setReload] = useState(false);
    const [count, setCount] = useState(0);

    const fetchUsers = async () => {
        try {
            const response = await noRoleIndexAPI(currentPage);
            setUsers(response.data.data.data);
            setTotalPages(response.data.data.last_page); 
            setCount(response.data.count);
        } catch (error) {
            console.error('Failed to fetch admins:', error);
        }
    }
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [currentPage, reload]);

    const handleSubmit = async (user) => {
        try {
            const user_id = user.id;
            const response = await activateUser(user_id);
            
            if (response.data.success) {
                setReload(!reload);
                toast.success(`${user.name} added successfully`, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                console.error('Failed to activate users:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to activate users:', error);
        }
    }

    return(
        

<div class="relative overflow-x-auto shadow-md sm:mt-0 mt-5 sm:rounded-lg">    
    <div className='flex justify-between'>
    <div className='flex'>
            <h2 class="text-xl font-bold dark:text-white">Available Users</h2>
            <h2 class="text-xl font-bold text-green-500 ml-4">{count}</h2>
            </div>
    <button onClick={fetchUsers} className="justify-end px-4 py-2 font-bold text-white bg-blue-500 border-blue-700 rounded-3xl hover:bg-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    </button>
    {/* <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search" class="block  pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
        </div>
    </div> */}
    </div>
    
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                   name
                </th>
                <th scope="col" class="px-6 py-3">
                    email
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                </th>
                
                <td class="px-6 py-4">
                    {user.email}
                </td>
                <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={(e) => {e.preventDefault(); handleSubmit(user);}}>Add</a>
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

        <ToastContainer />
</div>

    )
}