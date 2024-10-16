import React from "react"

interface Alert{
  cctv_num: number,
  cctv_location: string,
  time_detected: Date,
  status: string,
  dispatched:boolean,
  done: boolean
}
interface AlertTableProps{
  alerts: Alert[],
  onUpdate: (updatedAlert: Alert) => void
}

export default function AlertTable({alerts, onUpdate}: AlertTableProps){

  const handleChange = (alert: Alert ,field: keyof Pick<Alert, 'dispatched' | 'done'>) => {
    const updatedAlert: Alert = { ...alert, [field]: !alert[field] };
    onUpdate(updatedAlert);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };
  return(
    <div className="p-8 w-full bg-fagray">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-y-2">
            <th className="px-4 py-2 ">No</th>
            <th className="px-4 py-2 ">CCTV <br /> Number</th>
            <th className="px-4 py-2 ">CCTV <br />Location</th>
            <th className="px-4 py-2 ">Time <br /> Detected</th>
            <th className="px-4 py-2 ">Status</th>
            <th className="px-4 py-2 ">Dispatched</th>
            <th className="px-4 py-2 ">Done</th>

          </tr>
        </thead>
        <tbody>
          {
            alerts.map((alert, index)=>(
              <tr key={alert.cctv_num} className="border-b">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{alert.cctv_num}</td>
                <td className="px-4 py-2 text-center">{alert.cctv_location}</td>
                <td className="px-4 py-2 text-center">
                  <div>{formatTime(alert.time_detected)}</div>
                  <div>{alert.time_detected.toDateString()}</div>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className={`text-fagray px-4 py-1 rounded-sm font-bold text-md ${alert.status.toLowerCase() == 'danger'? 'bg-fatomato':'bg-faorange'}`}>
                    {alert.status.toUpperCase()}
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {alert.dispatched}
                    onChange={() =>{handleChange(alert, 'dispatched')}}
                  />                  
                </td>
                <td className="px-4 py-2 text-center">
                  <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {alert.done}
                    // onChange={handleChange('done')}
                    onChange={() =>{handleChange(alert, 'done')}}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
}