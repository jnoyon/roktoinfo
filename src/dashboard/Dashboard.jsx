import React from "react";

export default function Dashboard() {
  return (
    <div className="mx-auto w-11/12 py-5">
      <div className="bg-white">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ডোনার</th>
                <th>একশন</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src="https://rokto.xyz/wp-content/uploads/2024/07/1720365208958-2.jpg" alt="Icon" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold"> জিহাদুর রহমান নয়ন </div>
                    </div>
                  </div>
                </td>

                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
             
            </tbody>
            {/* foot */}

          </table>
        </div>
      </div>
    </div>
  );
}
