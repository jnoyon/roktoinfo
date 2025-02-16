import { MdAddIcCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function About() {
  return (
    <div className='w-11/12 bg-white mx-auto my-5 p-2 rounded-md text-sm shadow-sm'>
        <p className='mb-2 text-justify'>  এটি আমার একটি পরীক্ষামূলক প্রজেক্ট। এটির কাজ এখনো শেষ হয়নি। প্রতিদিন নতুন ফিচার যুক্ত হচ্ছে। আবার কিছু কিছু ফিচার পরীক্ষামূলক ভাবে দেওয়া হয়েছে। এই প্রজেক্টটি একটি দীর্ঘ সময় অতিবাহিত হলে সীমাবদ্ধতা এবং মানুষের চাহিদা অনুযায়ী পূর্ণাঙ্গ করা যেতে পারে।  </p>
        <p className='mb-2 text-justify'> জরুরী রক্ত প্রয়োজন হয় কিন্ত কোথাও রক্তের সন্ধান মিলছে না অথচ আমাদের আশেপাশেই কাঙ্খিত রক্তের গ্রুপের ব্যক্তি রয়েছে – এরকম ঘটনা প্রায়ই ঘটে। এই সমস্যা দূর করার প্রচেষ্টা চালাচ্ছে রক্ত ডট ইনফো। রক্ত.ইনফো একটি ব্লাড ডিরেক্টরি ওয়েবসাইট যার মাধ্যমে রক্তদাতাকে খুঁজে বের করা যাবে। এটি একটি রক্তদাতার তথ্য সংবলিত ওয়েবসাইট। এই ওয়েবসাইটটি অ্যাপ আকারেও ব্যবহার করা যাবে। এই ওয়েবসাইটের মূল উদ্দেশ্য হচ্ছে বিনামূল্যে রক্তদান কর্মসূচী বাস্তবায়নে কাজ করা। ওয়েবসাইটটির মাধ্যমে যেকোনো ব্যক্তি সহজেই রক্ত খুঁজে বের করতে পারবেন। </p>
        <p> এই ওয়েবসাইটে থাকছে:- প্রতিটি রক্তদাতার ছবিসহ পরিচয়, মোট রক্তদানের সংখ্যা, সর্বশেষ রক্তদানের তারিখ, গ্রুপ এর উপর ফিল্টারিং করে রক্ত খুঁজে বের করা যাবে এবং রক্তদাতাকে নম্বর না ডায়াল করেই এক ক্লিকে ফোন করা যাবে, রক্তদানের সংখ্যার উপর ভিত্তি করে প্রোফাইলে পদমর্যাদার ব্যাচ থাকবে </p>

        <div className="card bg-base-100 w-full">
        <figure className="px-5 pt-5">
            <img
            src="https://rokto.xyz/wp-content/uploads/2024/07/1720365208958-2.jpg"
            className="rounded-xl" />
        </figure>
        <div className="card-body p-2 items-center text-center">
            <h2 className="font-bold text-base"> জিহাদুর রহমান নয়ন </h2>
            <p className='text-gray-700'>এডমিন <br /> রক্ত ডট ইনফো </p>
            <div className="card-actions">
            <a className="btn btn-primary text-white btn-sm" href={`tel:01619756262`}> <MdAddIcCall className="text-lg" /> </a>
             <a className="btn btn-success btn-sm text-white" href={`https://wa.me/01619756262`} target="_blank" rel="noopener noreferrer"> <FaWhatsapp className="text-lg" /> </a>
            </div>
        </div>
        </div>

    </div>
  )
}
