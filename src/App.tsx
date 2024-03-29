import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserData from './Interface/UserInterface';
import { log } from 'console';
function App() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api');
        const { name, email ,picture } = response.data.results?.[0];
        const fullName = `${name?.title} ${name?.first} ${name?.last}`;
        const pictureNew= `${picture?.thumbnail}`
        setUserData({ name: fullName, email , picture: pictureNew  });
        localStorage.setItem('userData', JSON.stringify({ name: fullName, email ,picture: pictureNew  }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const refreshUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const { name, email,picture } = response.data.results?.[0];
      const fullName = `${name?.title} ${name?.first} ${name?.last}`;
      const pictureNew= `${picture?.thumbnail}`
      setUserData({ name: fullName, email,picture: pictureNew  });
      localStorage.setItem('userData', JSON.stringify({ name: fullName, email, picture: pictureNew  }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleClick = () => {
    refreshUserData();
  };
  
  return (
    <div>
       <div>
      
      {userData ? (
      
        <div>
          <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" >
  <div className="rounded-xl  lg:w-2/5 bg-gray-800 bg-opacity-50 lg:px-16 lg:py-10 shadow-lg backdrop-blur-md max-sm:px-8">
    <div className="text-white">
      <div className="mb-8 flex flex-col items-center">
        <img src="https://eastvantage.com/wp-content/uploads/2023/10/EV_LOGO-GREEN-GREY-e1697656723953-300x63.png" width="150" alt=""  />
        <br/>
        <span className="text-gray-300">USER DETAILS</span>
      </div>
      <form action="#">
        <div className="mb-4 text-lg">
          <div className="flex items-center gap-6 rounded-xl border-none bg-gray-900 p-4  text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" > 
          <div >
            <div>
            <img height={40} width={40} className="rounded-3xl " src={userData.picture}/>
            </div>
           
          

            </div>
            <div className="font-light tracking-widest">{userData.name}</div>
          </div>
        </div>

        <div className="mb-4 text-lg">
        <div className="flex items-center gap-6 rounded-xl border-none bg-gray-900 p-4  text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" > 
          <div >
            <div>
            <img  width={40} className="rounded-3xl " src={"data:image/png;base64,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"}/>
            </div>
           
            </div>
            <div className="font-light tracking-widest">{userData.email}</div><div>

            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center text-lg text-black">
          <div onClick={handleClick}  className="rounded-3xl cursor-pointer bg-lime-500  px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-lime-700">Refresh</div>
        </div>
      </form>
    </div>
  </div>
</div>
         
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    </div>
      )}
     
    </div>
    </div>
  )
}

export default App