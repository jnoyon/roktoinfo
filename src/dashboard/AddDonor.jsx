import React from 'react'

export default function AddDonor() {
  return (
    <div className='w-11/12 mx-auto py-5'>
      <h2 className='text-2xl font-bold text-center mb-2 bg-red-100 py-1 rounded-md'> রক্তদাতার প্রোফাইল তৈরি করুন </h2>
      <form className='w-full flex flex-col gap-5 bg-white p-2'>
        <label className="floating-label">
            <span> নাম * </span>
            <input type="text" name='donor_name' placeholder="Your name" className="input input-md w-full" />
        </label>
        <label className="floating-label">
            <span>  পিতার নাম * </span>
            <input type="text" name='donor_name' placeholder="Your name" className="input input-md w-full" />
        </label>
        <label className="floating-label">
            <span>  বর্তমান ঠিকানা * </span>
            <input type="text" name='donor_name' placeholder="Your name" className="input input-md w-full" />
        </label>
        <label className="floating-label">
            <span>  স্থায়ী ঠিকানা </span>
            <input type="text" name='donor_name' placeholder="Your name" className="input input-md w-full" />
        </label>
        <label className="select w-full">
          <span className="label">রক্তের গ্রুপ</span>
          <select>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>O-</option>
            <option>AB-</option>
          </select>
        </label>
        
        <label className="input w-full">
          <span className="label"> সর্বশেষ রক্তদান </span>
          <input type="date" />
        </label>
        
        <label className="floating-label">
            <span> মোবাইল নম্বর * </span>
            <input type="number" name='donor_name' placeholder="Your name" className="input input-md w-full"  required/>
        </label>
        <fieldset className="fieldset">
          <legend className="fieldset-legend"> রক্তদাতার ছবি </legend>
          <input type="file" className="file-input" />
          <label className="fieldset-label">স্কয়ার সাইজের ছবি হলে ভাল হয়</label>
        </fieldset>
        <fieldset className="fieldset p-4 bg-base-100 border border-base-300 flex flex-wrap gap-2 rounded-box">
          <legend className="fieldset-legend"> নিকটস্থ রক্তদান এলাকা</legend>
          <label className="fieldset-label">
            <input type="checkbox" className="checkbox checkbox-sm" /> ভালুকা
          </label>
          <label className="fieldset-label ">
            <input type="checkbox" className="checkbox checkbox-sm" /> ময়মনসিংহ
          </label>
          <label className="fieldset-label ">
            <input type="checkbox" className="checkbox checkbox-sm" /> মাওনা
          </label>
          <label className="fieldset-label">
            <input type="checkbox" className="checkbox checkbox-sm" /> গাজীপুর
          </label>
          <label className="fieldset-label ">
            <input type="checkbox" className="checkbox checkbox-sm" /> গফরগাঁও
          </label>
          <label className="fieldset-label ">
            <input type="checkbox" className="checkbox checkbox-sm" /> ঢাকা
          </label>
      </fieldset>
      <h2 className="divider"> অতিরিক্ত তথ্য </h2>
      <label className="floating-label">
            <span> বিকল্প মোবাইল নম্বর </span>
            <input type="number" name='donor_name' placeholder="Your name" className="input input-md w-full" />
        </label>
        <label className="floating-label">
            <span> রক্তদাতার ওজন </span>
            <input type="number" name='donor_name' placeholder="Your name" className="input input-md w-full" />
        </label>
        <label className="floating-label">
            <span> রক্তদাতার পেশা </span>
            <input type="text" name='donor_name' placeholder="Your name" className="input input-md w-full" />
        </label>
        <label className="input w-full">
          <span className="label"> জন্মতারিখ </span>
          <input type="date" />
        </label>
        <label className="select w-full">
          <span className="label">সংগঠন</span>
          <select>
            <option> প্রযোজ্য নয় </option>
            <option> বিরুনীয়া ব্লাড ডোনার সোসাইটি </option>
            <option> বন্ধু সংগঠন </option>
          </select>
        </label>
      <input type="submit" value="যুক্ত করুন" className='btn btn-accent' />
      </form>
    </div>
  )
}
