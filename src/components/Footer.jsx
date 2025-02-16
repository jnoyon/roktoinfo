import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { MdBloodtype } from "react-icons/md";
import { CgMoreR } from "react-icons/cg";
export default function Footer() {
  return (
    <div className="mt-20">
      <div className="dock bg-red-400 text-white">
      <NavLink to='/request'>
      <MdBloodtype className="text-xl mb-0.5" />
        <span className="dock-label font-bold"> ব্লাড রিকুয়েস্ট </span>
      </NavLink>

        <NavLink to='/'>
        <IoIosHome className="text-xl mb-0.5"  />
          <span className="dock-label font-bold">হোম</span>
        </NavLink>

        <NavLink to='/support'>
        <CgMoreR className="text-xl mb-0.5"  />
        <span className="dock-label font-bold">সাপোর্ট</span>
      </NavLink>
        
      </div>
    </div>
  );
}
