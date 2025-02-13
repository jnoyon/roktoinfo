import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mt-20">
      <div className="dock bg-neutral text-neutral-content">
        <NavLink to='/'>
        
          <span className="dock-label">হোম</span>
        </NavLink>

        <NavLink to='/find'>
        
          <span className="dock-label">রক্ত খুঁজুন</span>
        </NavLink>

        <NavLink to='/request'>
        
          <span className="dock-label"> ব্লাড রিকুয়েক্ট </span>
        </NavLink>
      </div>
    </div>
  );
}
