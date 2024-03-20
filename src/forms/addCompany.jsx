import { addCompany } from '../api';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';

export const CompanyForm = () =>{

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      company_name: '',
      description: '',
      location: '',
      admin_id: '',
    },
    validationSchema: Yup.object({
      company_name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
      admin_id: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await addCompany(values.company_name, values.description, values.location, values.admin_id);
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
        toast.error("Adding company failed.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
  });

    return(

               <div className="mx-auto lg:ms-auto ">
               <div className='flex justify-start w-screen'>
                  <button onClick={openModal} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Add Company</button>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Company"
                className="fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
          
              >
                   <div className="py-16 bg-white rounded-md px-7">                                                      
                    <form onSubmit={formik.handleSubmit}>
                    
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                        <div className="flex items-center justify-between w-full">
    <label for="subject" className="text-lg font-bold text-black">Add Company</label>
    <svg onClick={closeModal} className="w-6 h-6 text-gray-700 cursor-pointer fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path d="M18 1.3L16.7 0 9 7.7 1.3 0 0 1.3 7.7 9 0 16.7 1.3 18 9 10.3l7.7 7.7 1.3-1.3L10.3 9z"/>
    </svg>
</div>
                     </div>
                                       <div className="md:col-span-2">
                                        
                                        <input type='text'
                                        name='company_name' required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        placeholder="Company Name" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-700 "/>
                                     
                                      </div>
                                      <div className="md:col-span-2">
                                        
                                        <input type='text'
                                        name='description' required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        placeholder="Description" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-700 "/>
                                     
                                      </div>
                                        <div className="md:col-span-2">
                                            
                                       <input type="text" id="location" name="location" 
                                       required
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.email}
                                       placeholder="Address" 
                                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-700"/>
                                     
                                       </div>
                                       <div className="md:col-span-2">
                                       <input type="text" id="admin_id" name="admin_id" placeholder="Admin" 
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.email}className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-700 "/>
                                     </div>
                                      {/* <div className="md:col-span-2">
                                        <label for="subject" className="block float-left text-lg font-normal text-gray-400">Company Logo</label>
                                        <input type="file" id="file" name="file" placeholder="Charger votre fichier" className="peer block w-full appearance-none border-none   bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"/>
                                    </div> */}
                                    
                                      <div className="md:col-span-2">
                                        <button type='submit'
                                        className="w-full py-3 text-base font-medium text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-700">Add Company</button>
                                      </div>
                                    </div>
                                  </form>
                                  
                            </div>
                            </Modal> 
                            <ToastContainer />
                        </div>
    );

}