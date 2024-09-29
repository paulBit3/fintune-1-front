import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuth } from './context/AuthentContext';

//import { Dropdown } from 'flowbite-react'


const openTab = (url) => {
  window.open(url, "_self", "noreferrer");
};


const Navbar = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const {getUser, signout } = useAuth()

  const userIsAuthenticated = () =>{
    let storedUser = localStorage.getItem('user');
    if (!storedUser) {
        return false;
    }
    storedUser = JSON.parse(storedUser);

    //if token expired, logout user
    if (Date.now() > storedUser.data.exp * 1000) {
        signout();
        return false;
    }
    return true;
}

//logout user method
const logout = () => {
  signout()
}

//authenticated menu style method
const signoutMenuStyle = () => {
  return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
}

const isUserAuthenticated = () => {
  return userIsAuthenticated()
}

//get the username of the authenticated user
const getUsername = () => {
  const user = getUser()
  return user ? user.data.username : ''
}

  return (
    <div className="bg-gray-800 mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-6" >
      <div className='h-16 px-8 flex items-center'>
        <p className='text-white font-bold'><a href='/'>FinTune - Stock Monitoring</a></p>
      </div>
      
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
  
      <div class="text-gray-500 order-3 w-full md:w-auto md:order-2" id='navbars'>
			  <ul class="flex font-semibold justify-between">

          <li class="md:px-4 md:py-2 text-indigo-500">
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-indigo-500 md:text-indigo-400 md:p-0 font-medium flex items-center justify-between">Investing <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
            <div id="dropdown" class="hidden bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44">
                <ul class="py-1" aria-labelledby="dropdownLargeButton">
                  <li>
                      <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Dashboard</a>
                  </li>
                </ul>
                <div class="py-1">
                  <a href="#stock" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Stocks</a>
                </div>
            </div>

          </li>
				  <li class="nav-item md:px-4 md:py-2 hover:text-indigo-400"><a href="#product">Product</a></li>
				  <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#platform">Platforms</a></li>
          <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#pricing">Pricing</a></li>
				  <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#about">About</a></li>
				  <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#support">Support</a></li>
			  </ul>
		  </div>
        
        <div class="flex justify-between lg:justify-start">
          {!isUserAuthenticated() ? (
          <>
            <button
              class="inline-flex items-center justify-between 
              rounded-full bg-indigo-600 px-3 py-2 
              text-sm font-semibold text-white shadow-sm 
              hover:bg-indigo-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600 lg:ml-6 lg:justify-start"
              role="link"
              onClick={() => navigate("/register")}
            >Sign up</button>
            <button
              class="inline-flex items-center rounded-full
            bg-white px-3 py-2 text-sm font-semibold
              text-gray-900 hover:bg-gray-50 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-white ml-2"
              role="link"
              onClick={() => openTab("/signin")}
            >Sign In
            <span aria-hidden="true" class="ml-1">→</span>
            </button>
          </>
          ):(
            <>
              <div className='' style={signoutMenuStyle()}> {`${getUsername()}`}
              <button
                class="inline-flex items-center justify-between 
                rounded-full bg-indigo-600 px-3 py-2 
                text-sm font-semibold text-white shadow-sm 
                hover:bg-indigo-500 focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600 lg:ml-6 lg:justify-start"
                role="link"
                onClick={logout}
              >
              Logout</button> </div>
            </>
          )}
        </div> 
      
      </div>
     
    </div>
  );
};

export default Navbar;