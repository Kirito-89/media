import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex bg-blue-600 justify-between py-3'>
        <div className="logo">
            <span className="font-bold text-xl mx-8">TaskTrack</span>
        </div>
        <ul className="flex gap-6 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
           
        </ul>
    </nav>
  );
}

export default Navbar;