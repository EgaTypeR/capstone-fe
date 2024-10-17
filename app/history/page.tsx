'use client'
import React, { useState } from 'react'
import SideBar from '../components/history/sideBar'
import AlertTable, {Alert} from '../components/history/alertTable'


const sampleAlert:Alert[] = [
  {alert_id:'0001',cctv_num: 1, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'DANGER', dispatched: false, done: false},
  {alert_id:'0002',cctv_num: 2, cctv_location: 'Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', time_detected:new Date("2024-10-16T14:30:00Z"), status:'WARNING', dispatched: false, done: false}
]



const  Page: React.FC = () =>{
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [alerts, setAlerts] = useState<Alert[]>(
    sampleAlert
  )

  const updateAlert = (updatedAlert: Alert) =>{
    console.log('Update Alert')
    setAlerts((prevAlert) => (
      prevAlert.map((alert) => (
        alert.cctv_num === updatedAlert.cctv_num? updatedAlert: alert
      ))
    ))

  }
  return (
    <div className='flex gap-1 bg-falightgray h-full min-h-svh'>
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        ></SideBar>
        <AlertTable alerts={alerts} onUpdate={updateAlert}></AlertTable>
    </div>
  )
}

export default Page
