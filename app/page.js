"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard'); // redirect to login if not logged in
  }, []);

  return null; // or a loading spinner if you want

  /*const tokenString = localStorage.getItem('token');

  useEffect(() => {

    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      if (Date.now() > tokenData.expiry) {
        localStorage.removeItem('token');
        router.push('/auth/login'); // redirect to login if not logged in
      }else{ 
        router.push('/dashboard'); // replace with your path
      }
  }else{
    router.push('/auth/login'); // redirect to login if not logged in
  }
    
  }, []);
  */

}
