import React from 'react'
import { Alert, FormatDate } from './alertTable'

interface EventDetailProps {
  alert: Alert
  isOpen: boolean
  handleClose: () => void
}

export const EventDetail = ({alert, isOpen, handleClose}: EventDetailProps) => {

  if (!isOpen) {
    return null
  }
  return (
    <div className='absolute inset-0 flex justify-center items-center z-50'>
      <div className='bg-falightgray rounded-lg p-1 flex flex-col justify-center shadow-lg'>
        <div className='flex flex-row justify-between items-center mb-2 mt-1'>
          <div className='text-center pl-4 text-fablue font-bold'>Event Details</div>
          <div className="text-fablue cursor-pointer font-bold text-center w-8 h-8 p-1 mx-1 
              rounded-full hover:bg-fablue hover:bg-opacity-20"
              onClick={handleClose}
          >✖</div>
        </div>
        <div className='flex flex-row justify-center gap-4'>
          <div className=''>
            <iframe 
              width="1000" 
              height="600"
              src="https://www.youtube.com/embed/XcQb07nwle4?si=dtrW9a80KEangToL" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen></iframe>
          </div>
          <div className='flex flex-col text-fablue max-w-80 gap-4 pr-8'>
            <div className='mb-5 flex justify-center items-center'>
              {
                alert?.danger
                ? <div className='bg-fatomato font-bold text-center text-falightgray py-1 px-4 rounded-lg'>DANGER</div> 
                : <div className='bg-faorange font-bold text-center text-falightgray py-1 px-4 rounded-lg'>WARNING</div>
              }
            </div>
            <div>
              <div>Lokasi: </div> 
              <p className='font-semibold'>{alert?.camera_info.location}</p>
            </div>
            <div>
              <div>Waktu Kejadian: </div> 
              <p className='font-semibold'>{`${FormatDate(alert?.detected_at).date} ${FormatDate(alert?.detected_at).time}`}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='font-semibold'>Street Crime </div> 
              <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {alert?.verification}
                    onChange={() =>{}}
                  /> 
            </div>
            <div className='flex flex-row justify-between'>
              <div className='font-semibold'>Dispatched </div> 
              <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {alert?.dispatched}
                    onChange={() =>{}}
                  /> 
            </div>
            <div className='flex flex-row justify-between'>
              <div className='font-semibold'>Done </div> 
              <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {alert?.done}
                    onChange={() =>{}}
                  /> 
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  )
}
