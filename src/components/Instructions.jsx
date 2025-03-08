import React from "react";

export default function Instructions() {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div className="text-center bg-white mb-5 shadow-sm rounded-md p-2">
        <p className="text-sm mb-2"> একজন রক্তদাতা শুধু রক্তই দেন না, তিনি তার মূল্যবান সময়, শ্রম এবং ভালোবাসা দিয়ে আপনার জীবন বাঁচান। তাই, রক্তগ্রহীতার জন্য আমাদের পক্ষ থেকে কিছু অনুরোধ রয়েছে। </p>
        <button
          className="btn btn-sm btn-error text-white"
          onClick={() => document.getElementById("instructions").showModal()}
        > এখানে ক্লিক করুন </button>
      </div>
      <dialog id="instructions" className="modal">
        <div className="modal-box px-2 py-3">
          <h3 className="font-bold text-lg border-b text-center border-gray-300 mb-2 text-gray-600">রক্তগ্রহীতার প্রতি কিছু কথা</h3>
          <ul className="timeline timeline-vertical">
            <li>
              <div className="timeline-start text-sm">রক্তদাতার সময়কে মূল্য দিন</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-success"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box text-justify">
              রক্তদাতার সময় অত্যন্ত মূল্যবান। তিনি হয়তো কাজ থেকে ছুটি নিয়ে অথবা অন্য কোনো গুরুত্বপূর্ণ কাজ ফেলে এসেছেন। তাই তার সময় নষ্ট না করে দ্রুত এবং সুষ্ঠুভাবে রক্ত গ্রহণের ব্যবস্থা করুন।
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start text-sm">
              প্রয়োজনে যোগাযোগ করুন</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-success"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box text-justify"> অনেক সময় দেখা যায়, রক্তদাতা রক্ত দিতে আসার পর জানতে পারেন যে, বর্তমানে সেই রক্তের প্রয়োজন নেই। এমন পরিস্থিতিতে, রক্তদাতাকে আগে থেকেই বিষয়টি জানিয়ে দিন। এতে তিনি হয়রানি থেকে বাঁচবেন।</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start text-sm">রক্তদানের পর যত্ন নিন</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-success"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box text-justify"> রক্তদানের পর রক্তদাতা কিছুটা দুর্বল বোধ করতে পারেন। তাই তার জন্য পর্যাপ্ত বিশ্রাম ও পানীয়ের ব্যবস্থা করুন। রক্তদানের পর তিনি সুস্থভাবে বাড়ি ফিরেছেন কিনা, সে বিষয়ে খোঁজ নেওয়া আপনার নৈতিক দায়িত্ব।</div>
              <hr />
            </li>
            
            
          </ul>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">ঠিক আছে</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
