import React from "react"

export interface Alert{
  alert_id:string,
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
            <th className="px-4 py-2 max-w-64">No</th>
            <th className="px-4 py-2 max-w-64">CCTV <br /> Number</th>
            <th className="px-4 py-2 max-w-64">CCTV <br />Location</th>
            <th className="px-4 py-2 max-w-64">Time <br /> Detected</th>
            <th className="px-4 py-2 max-w-64">Status</th>
            <th className="px-4 py-2 max-w-64">Dispatched</th>
            <th className="px-4 py-2 max-w-64">Done</th>

          </tr>
        </thead>
        <tbody>
          {
            alerts.map((alert, index)=>(
              <tr key={alert.alert_id} className="border-b">
                <td className="px-4 py-2 text-center max-w-64">{index + 1}</td>
                <td className="px-4 py-2 text-center max-w-64">{alert.cctv_num}</td>
                <td className="px-4 py-2 text-center max-w-64">{alert.cctv_location}</td>
                <td className="px-4 py-2 text-center max-w-64">
                  <div>{formatTime(alert.time_detected)}</div>
                  <div>{alert.time_detected.toDateString()}</div>
                </td>
                <td className="px-4 py-2 max-w-64">
                  <div className="flex justify-center items-center">
                    <div className={`px-4 py-1 rounded-sm font-bold text-md ${alert.status.toLowerCase() == 'danger'? 'bg-fatomato':'bg-faorange'}`}>
                      <p className="text-center text-fagray max-w-min">{alert.status.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 text-center max-w-64">
                  <input 
                    className="h-5 w-5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox" 
                    checked = {alert.dispatched}
                    onChange={() =>{handleChange(alert, 'dispatched')}}
                  />                  
                </td>
                <td className="px-4 py-2 text-center max-w-64">
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