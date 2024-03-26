/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export const AddItem = () => {
  return (
    <form>
      <div className="space-y-12">
        <div className="">
          <h2 className="text-3xl font-semibold leading-7 text-gray-900 dark:text-white">
            Add Item
          </h2>
          <p class="mt-1 text-sm leading-6 dark:text-white text-gray-600">
            Please note that this item will be visible to the administrators.
            Exercise discretion when adding an item.
          </p>

          <div className="flex flex-col mt-5 sm:grid sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Item Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Item name"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="item_type"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Item Type
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="item_type"
                    id="item_type"
                    autoComplete="item_type"
                    className="block w-40 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Item type"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-1 border-b border-gray-900/10">
          <div className="flex flex-col mt-5 sm:grid sm:grid-cols-2">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    placeholder="Stock"
                    className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="model_number"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Model Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="model_number"
                    id="model_number"
                    autoComplete="model-number"
                    placeholder="Model number"
                    className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Item photo
              </label>
              <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG or JPG
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="comapany"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Comapany Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="company"
                  placeholder="Company name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="owner"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Owner Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="owner"
                  id="owner"
                  autoComplete="owner"
                  placeholder="Owner name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <button
          type="button"
          className="px-3 py-1 text-sm font-semibold leading-6 text-gray-900 rounded dark:bg-gray-500 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
