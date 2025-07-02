//import { useEffect } from 'react';
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Example: Checking if a user is authenticated based on cookies
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  //const router = useRouter();
/* const tokenString = localStorage.getItem('token');

if (tokenString) {
    const tokenData = JSON.parse(tokenString);
    if (Date.now() > tokenData.expiry) {
      localStorage.removeItem('token');
      //router.push('/auth/login'); // redirect to login if not logged in
      return NextResponse.redirect(new URL('/auth/login', request.url));  // Redirect to login if not authenticated
    }
}else{
    return NextResponse.redirect(new URL('/auth/login', request.url));  // Redirect to login if not authenticated
}
*/
  // If the user is authenticated, allow the request to continue
  return NextResponse.next();
}

// Specify which routes are protected by this middleware
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],  // Apply middleware to these routes
};
