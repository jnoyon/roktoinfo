import AddNewRequest from '../components/bloodrequest/AddNewRequest'
import BloodRequests from '../components/bloodrequest/BloodRequests'
import Instructions from '../components/Instructions'

export default function BloodRequest() {
  return (
    <div className='container mx-auto w-11/12 py-5'>


        
        <AddNewRequest></AddNewRequest>
        <Instructions></Instructions>
        <BloodRequests></BloodRequests>
    </div>
  )
}
