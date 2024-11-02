import React from 'react'

interface ConfirmationModalProps {
  isOpen: boolean,
  onConfirm: () => void,
  onCancel: () => void,
}
const ConfirmationModal = ({isOpen, onConfirm, onCancel}: ConfirmationModalProps) => {
  if (!isOpen) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-md p-4'>
      <h2 className="text-lg font-bold mb-4 text-gray-800">Confirm Action</h2>
        <p className='text-gray-800'>Are you sure you want to change this status?</p>
        <div className="mt-4 flex justify-end">
          <button
                className="bg-white text-blue-500 border-2 border-blue-500 rounded-lg px-8 py-2 mx-2"
                onClick={onCancel}
              >
                No
          </button>
          <button
            className="bg-blue-500 text-white border-2 border-blue-500 rounded-lg px-8 py-2 mx-2"
            onClick={onConfirm}
          >
            Yes
          </button>    
        </div>
      </div>

    </div>
  )
}


export default ConfirmationModal