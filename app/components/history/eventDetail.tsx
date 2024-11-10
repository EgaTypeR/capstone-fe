import React, { useEffect, useState } from 'react'
import { Alert, FormatDate } from './alertTable'
import axios from 'axios'

interface EventDetailProps {
  alert: Alert
  isOpen: boolean
  handleClose: () => void
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>
}

export const EventDetail = ({alert, isOpen, handleClose, setAlerts}: EventDetailProps) => {
  const [thisAlert, setThisAlert] = useState(alert)

  useEffect(() => {
    if (isOpen) {
      setThisAlert(alert);
    }
  }, [alert, isOpen]);

  const updateAlert = async (alertId: string) => {
    const dataToUpdate: Partial<Alert> = {};

    // Only include fields that have changed
    if (alert.verification !== thisAlert.verification) {
      dataToUpdate.verification = thisAlert.verification;
    }
    if (alert.dispatched !== thisAlert.dispatched) {
      dataToUpdate.dispatched = thisAlert.dispatched;
    }
    if (alert.done !== thisAlert.done) {
      dataToUpdate.done = thisAlert.done;
    }

    try {
      if (Object.keys(dataToUpdate).length > 0) {
        setAlerts((prevAlerts) =>
          prevAlerts.map((prevAlert) =>
            prevAlert._id === alertId
              ? { ...prevAlert, ...dataToUpdate }
              : prevAlert
          )
        );
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/client/update-alert/${alertId}`, dataToUpdate);
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
    }
  };

  if (!isOpen) {
    return null
  }
  return (
    <div className='fixed inset-1 flex justify-center items-center z-40'>
      <div className='bg-falightgray rounded-lg p-1 flex flex-col justify-center shadow-lg'>
        <div className='flex flex-row justify-between items-center mb-2 mt-1'>
          <div className='text-center pl-4 text-fablue font-bold'>Event Details</div>
          <div className="text-fablue cursor-pointer font-bold text-center w-8 h-8 p-1 mx-1 
              rounded-full hover:bg-fablue hover:bg-opacity-20"
              onClick={handleClose}
          >✖</div>
        </div>
        <div className='flex flex-row justify-center gap-4'>
          <div className='pb-1 pl-1'>
              <video width="800" controls autoPlay loop>
                <source src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${thisAlert.footage_path}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
          </div>
          <div className='flex flex-col text-fablue max-w-80 gap-4 pr-8'>
            <div className='mb-5 flex justify-center items-center'>
              {
                thisAlert?.danger
                ? <div className='bg-fatomato font-bold text-center text-falightgray py-1 px-4 rounded-lg'>DANGER</div> 
                : <div className='bg-faorange font-bold text-center text-falightgray py-1 px-4 rounded-lg'>WARNING</div>
              }
            </div>
            <div>
              <div>Lokasi: </div> 
              <p className='font-semibold'>{thisAlert?.camera_info.location}</p>
            </div>
            <div>
              <div>Waktu Kejadian: </div> 
              <p className='font-semibold'>{`${FormatDate(thisAlert?.detected_at).date} ${FormatDate(thisAlert?.detected_at).time}`}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='font-semibold'>Street Crime </div> 
              <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {thisAlert?.verification}
                    onChange={() => {
                      setThisAlert((prevAlert) =>
                          prevAlert && prevAlert._id === alert._id
                            ? { ...prevAlert, verification: !prevAlert.verification }
                            : prevAlert
                      );
                    }}
                  /> 
            </div>
            <div className='flex flex-row justify-between'>
              <div className='font-semibold'>Dispatched </div> 
              <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {thisAlert?.dispatched}
                    onChange={() => {
                      setThisAlert((prevAlert) =>
                          prevAlert && prevAlert._id === alert._id
                            ? { ...prevAlert, dispatched: !prevAlert.dispatched }
                            : prevAlert
                      );
                    }}
                  /> 
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-semibold">Done</div> 
              <input 
                  className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                  type="checkbox" 
                  checked={thisAlert?.done || false} // Ensure boolean value
                  onChange={() => {
                    setThisAlert((prevAlert) =>
                        prevAlert && prevAlert._id === alert._id
                          ? { ...prevAlert, done: !prevAlert.done }
                          : prevAlert
                    );
                  }}
              /> 
            </div>

            <div className='flex flex-row justify-end gap-4'>
              <button 
                className='border border-fablue text-fablue rounded-lg py-1 px-4 hover:bg-black hover:bg-opacity-5'
                onClick={handleClose}
              >Cancel</button>
              <button 
                className='border border-fatomato bg-fatomato text-falightgray rounded-lg py-1 px-4 hover:bg-red-600 hover:border-red-600'
                onClick={() => {
                  updateAlert(thisAlert._id);
                }}
              >Save</button>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  )
}
