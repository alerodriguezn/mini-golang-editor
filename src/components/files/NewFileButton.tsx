'use client'

import { useFilesStore } from '@/store/files-store';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function NewFileModal() {
  let [isOpen, setIsOpen] = useState(false)
  const [filename, setFilename] = useState('');

  const addNewFile = useFilesStore((state) => state.addFile);

  function closeModal() {
    setIsOpen(false)
  }

  function onCreateFile() {
    addNewFile({ name: filename, content: '' });
    setFilename('');
    closeModal();
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="w-full flex justify-start">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          New File
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    New File
                  </Dialog.Title>
                  <div className="mt-4 flex">
                    <label className='text-black font-bold mr-2' htmlFor="name">Filename</label>
                    <input className='text-black border-2 rounded-md border-slate-400' type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />

                  </div>

                  <div className="mt-4 flex gap-3 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white0 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onCreateFile}
                    >
                      Create
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}