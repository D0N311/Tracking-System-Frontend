import React from 'react';
import { UserCards } from '../../cards';
export const Users = () => {

    return(
        <>
        <h2 class="text-4xl font-extrabold dark:text-white">Users Management</h2>
         
        <div className="flex mt-5 space-x-4 overflow-auto">
            <UserCards />
            <UserCards />
            <UserCards />
            <UserCards />
            <UserCards />
            <UserCards />
            <UserCards />
        </div>

        
        </>
        
    );
}