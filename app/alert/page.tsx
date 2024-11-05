'use client'
import axios from "axios"
import { useEffect, useState } from "react"


export interface Notification {
_id :string,
event_id: string,
user_id: string,
danger: boolean,
message: string,
read: boolean,
sent_at: string,
}


const Page: React.FC = () =>{
  const [alerts, setAlerts] = useState<Notification[]>([])
  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client/notification`)
    .then((response) => {
      const {data} = response.data
      setAlerts(data)
  })
  .catch(
    (err) => {
      console.log(err)
    }
  )
  }, [])
  return(
    <div className="bg-falightgray min-h-screen pt-14">
      <div className="flex flex-col gap-2 justify-center items-center pt-1">
        {
          alerts.map((alert)=>(
            <div key={alert._id}>
              <div className="flex justify-center items-center w-fit bg-fablue rounded-lg p-2 text-center">
              <p className="text-center">{alert._id + "\t" + alert.sent_at}</p>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )

}

export default Page