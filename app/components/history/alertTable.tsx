'use client'
import React, { useState } from "react"
import ConfirmationModal from "./confirmationModal";

export interface CameraInfo {
  _id: string;
  camera_name: string;
  camera_num: number;
  camera_url: string;
  is_active: boolean;
  location: string;
}

export interface Alert {
  _id: string;
  camera_id: string;
  camera_info: CameraInfo;
  confidence_score: number;
  crime_type: string;
  description: string;
  detected_at: string;
  is_reviewed: boolean;
  danger: boolean;
  notification_sent: boolean;
  dispatched: boolean;
  done: boolean;
}
interface AlertTableProps{
  alerts: Alert[],
  onUpdate: (alertId: string, field: keyof Pick<Alert, 'dispatched' | 'done'>) => void;
}

export default function AlertTable({alerts = [], onUpdate}: AlertTableProps){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAlertId, setCurrentAlertId] = useState<string | null>(null);
  const [fieldToUpdate, setFieldToUpdate] = useState<keyof Pick<Alert, 'dispatched' | 'done'> | null>(null);

  const handleCheckboxClick = (alertId: string, field: keyof Pick<Alert, 'dispatched' | 'done'>) => {
    console.log({
      alertId: alertId,
      field: field
    })
      setCurrentAlertId(alertId);
      setFieldToUpdate(field);
      setIsModalOpen(true);
  };

  const handleConfirm = () => {
      if (currentAlertId && fieldToUpdate) {
          onUpdate(currentAlertId, fieldToUpdate); // Pass the ID and field to the parent
      }
      setIsModalOpen(false);
      setCurrentAlertId(null);
      setFieldToUpdate(null);
  };

  const handleCancel = () => {
      setIsModalOpen(false);
      setCurrentAlertId(null);
      setFieldToUpdate(null);
  };

  // const handleChange = (alert: Alert, field: keyof Pick<Alert, 'dispatched' | 'done'>) => {
  //   onUpdate(alert, field); // Pass the alert and the field to the parent for API call
  // };

  const formatDate = (dateStr: string) => {
    const dateTime = new Date(dateStr)
    const date = dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const time = dateTime.toLocaleDateString()
    const dt = {
      time: time,
      date: date
    } 
    return dt
  };
  return(
    <div className="w-full bg-fagray overflow-y-scroll max-h-[600px] scrollbar-custom">
      <table className="table-auto w-full p-0 border-0">
        <thead className="sticky top-0 bg-falightgray border-0">
          <tr>
            <th className="px-4 py-2 max-w-64 text-fagray border-0">No</th>
            <th className="px-4 py-2 max-w-64 text-fagray border-0">CCTV <br /> Number</th>
            <th className="px-4 py-2 max-w-64 text-fagray ">CCTV <br />Location</th>
            <th className="px-4 py-2 max-w-64 text-fagray ">Time <br /> Detected</th>
            <th className="px-4 py-2 max-w-64 text-fagray ">Status</th>
            <th className="px-4 py-2 max-w-64 text-fagray ">Dispatched</th>
            <th className="px-4 py-2 max-w-64 text-fagray ">Done</th>
          </tr>
        </thead>
        <tbody>
          {
            alerts && alerts.length >0 ?(
            alerts.map((alert, index)=>(
              <tr key={alert._id} className="border-b">
                <td className="px-4 py-2 text-center max-w-64">{index + 1}</td>
                <td className="px-4 py-2 text-center max-w-64">{alert.camera_info.camera_num}</td>
                <td className="px-4 py-2 text-center max-w-64">{alert.camera_info.location}</td>
                <td className="px-4 py-2 text-center max-w-64">
                  <div>{formatDate(alert.detected_at).date}</div>
                  <div>{formatDate(alert.detected_at).time}</div>
                </td>
                <td className="px-4 py-2 max-w-64">
                  <div className="flex justify-center items-center">
                    <div className={`px-4 py-1 rounded-sm font-bold text-md ${alert.danger? 'bg-fatomato':'bg-faorange'}`}>
                      <p className="text-center text-fagray max-w-min">{alert.danger? 'DANGER' : 'WARNING'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 text-center max-w-64">
                  <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {alert.dispatched}
                    onChange={() =>{handleCheckboxClick(alert._id, 'dispatched')}}
                  />                  
                </td>
                <td className="px-4 py-2 text-center max-w-64">
                  <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {alert.done}
                    onChange={() =>{handleCheckboxClick(alert._id, 'done')}}
                  />
                </td>
              </tr>
            )))
            :(
              <tr>
                <td colSpan={7} className="text-center text-falightgray py-4">
                  No Data Available
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <ConfirmationModal
        isOpen = {isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  )
}