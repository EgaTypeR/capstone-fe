'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../components/history/sideBar'
import AlertTable, {Alert} from '../components/history/alertTable'
import axios from 'axios'


// const sampleAlert:Alert[] = [
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'DANGER', dispatched: false, done: false},
//   {alert_id:'0002',cctv_num: 2, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'WARNING', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'DANGER', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'WARNING', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'DANGER', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'WARNING', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'DANGER', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'WARNING', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'DANGER', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'WARNING', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'DANGER', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'WARNING', dispatched: false, done: false},
//   {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'DANGER', dispatched: false, done: false},
// ]



const  Page: React.FC = () =>{

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client/alert-history?filter=${selectedCategory}`)
    .then((response) => {
      const {data} = response.data
      setAlerts(data)
    })
    .catch((err) =>{
      console.log(err)
    })
  }, [selectedCategory])

  const updateAlert = async (alertId: string, field: keyof Pick<Alert, 'dispatched' | 'done'| 'verification'>) => {
    const alertToUpdate = alerts.find(alert => alert._id === alertId);
    if (!alertToUpdate) return; 

    const updatedValue = !alertToUpdate[field]; 
    const updatedData = { [field]: updatedValue };

    try {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/client/update-alert/${alertId}`, updatedData);

        setAlerts(prevAlerts =>
            prevAlerts.map(prevAlert =>
                prevAlert._id === alertId ? { ...prevAlert, [field]: updatedValue } : prevAlert
            )
        );
    } catch (error) {
        console.error(error);
    }
};
  return (
    <div className='flex-col min-h-screen'>
      <div className='flex gap-1 bg-falightgray'>
        <div className='w-1/5 sticky top-0 pt-14 bg-fagray h-screen'>
          <SideBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          ></SideBar>
        </div>
        <div className='w-4/5 h-screen overflow-auto bg-fagray px-4'>
          <div className='h-20 bg-fagray'></div>
          <AlertTable alerts={alerts} onUpdate={updateAlert} verification={selectedCategory == "unverif"}></AlertTable>
        </div>
      </div>
      
    </div>
  )
}

export default Page
