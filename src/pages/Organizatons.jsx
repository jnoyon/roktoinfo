import donorIcon from '../assets/images/donor-icon.png'
import { FaEye } from "react-icons/fa";
export default function Organizatons() {
  return (
    <div className='mx-auto w-11/12 bg-white my-5 shadow rounded-md'>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>সংগঠন</th>
        <th> তালিকা </th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={donorIcon} alt="Icon" />
              </div>
            </div>
            <div>
              <div className="font-bold"> বিরুনীয়া ব্লাড ডোনার সোসাইটি </div>
              <div className="text-xs opacity-50">  বিরুনীয়া, ভালুকা (রক্তদাতা: ৯০ জন) </div>
            </div>
          </div>
        </td>
        <th>
          <button className="btn btn-error text-white btn-xs"><FaEye className='text-lg' /></button>
        </th>
      </tr>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={donorIcon} alt="Icon" />
              </div>
            </div>
            <div>
              <div className="font-bold"> বন্ধু ফাউন্ডেশন </div>
              <div className="text-xs opacity-50">  ভালুকা, ময়মনসিংহ (রক্তদাতা: ০৫ জন) </div>
            </div>
          </div>
        </td>
        <th>
          <button className="btn btn-error text-white btn-xs"><FaEye className='text-lg' /></button>
        </th>
      </tr>

    </tbody>
    {/* foot */}
  </table>
</div>
    </div>
  )
}
