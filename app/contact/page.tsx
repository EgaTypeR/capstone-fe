import Image from "next/image"

const contactData = {
  address: 'Jl. XX, Kec. XX, Sleman, DIY 51234',
  phone:'(0274) 123456',
  email:'polisi123@polri.go.id',
}
const Page: React.FC = () =>{
  return(
    <div className="bg-fagray">
      <div className="flex flex-col justify-start items-center min-h-screen px-10 py-10">
        <div className="w-4/5 h-64 bg-white opacity-30 rounded-lg text-blue-600 text-center">Peta</div>
        <p className="text-falightgray text-2xl font-bold m-10">Contact Information</p>
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col justify-center items-center mx-10 gap-2">
            <Image
              src={'/assets/home.svg'}
              alt="address-logo"
              width={48}
              height={48}
              className="mb-2"
            />
            <p>ADDRESS</p>
            <p>{contactData.address}</p>
          </div>
          <div className="flex flex-col justify-center items-center mx-10 gap-2">
          <Image
              src={'/assets/phone.svg'}
              alt="address-logo"
              width={48}
              height={48}
              className="mb-2"
            />
          <p>PHONE</p>
          <p>{contactData.phone}</p>
          </div>
          <div className="flex flex-col justify-center items-center mx-10 gap-2">
          <Image
              src={'/assets/mail.svg'}
              alt="address-logo"
              width={48}
              height={48}
              className="mb-2"
            />
          <p>EMAIL</p>
          <p>{contactData.email}</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Page