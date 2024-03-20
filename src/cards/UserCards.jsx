// export const UserCard = ({ user }) => {
//     return( 
//         <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//             <div className="flex flex-col items-center pt-10 pb-10">
//             <div className="flex items-center justify-center w-24 h-24 mb-3 text-2xl font-bold text-white bg-blue-500 rounded-full shadow-lg">
//                 {user.name.charAt(0).toUpperCase()}
//             </div>
//                 <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
//                 <h5 className="mb-1 font-medium text-gray-500 text-l dark:text-white">{user.email}</h5>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">{user.role}</span>
//                 <div className="flex mt-4 md:mt-6">
//                     <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                     Add to company
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }


import React from 'react';

export const UserCards = () => {
    const dummyUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Software Engineer'
    };
    return( 
        <div className="max-w-sm px-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pt-10 pb-10">
            <div className="flex items-center justify-center w-24 h-24 mb-3 text-2xl font-bold text-white bg-blue-500 rounded-full shadow-lg">
                {dummyUser.name.charAt(0).toUpperCase()}
            </div>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{dummyUser.name}</h5>
                <h5 className="mb-1 font-medium text-gray-500 text-l dark:text-white">{dummyUser.email}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{dummyUser.role}</span>
                <div className="flex mt-4 md:mt-6">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add as Company User
                    </a>
                </div>
            </div>
        </div>
    )
}
