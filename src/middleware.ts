import { NextResponse,type MiddlewareConfig, type NextRequest } from "next/server";

const publicRoutes = [
    {path:'/login', whenAuthenticated: 'redirect'},
    {path:'/register', whenAuthenticated: 'redirect'}
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTES = '/login';

export default function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path === path);
    const authToken = request.cookies.get('authToken');

    if(!authToken && publicRoute){
        return NextResponse.next();
    }

    if(!authToken && !publicRoute){
        const redirectURL = request.nextUrl.clone();
        redirectURL.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTES;
        return NextResponse.redirect(redirectURL);
    }

    if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
        const redirectURL = request.nextUrl.clone();
        redirectURL.pathname = '/'
        return NextResponse.redirect(redirectURL);
    }

    if(authToken && !publicRoute){
        //TODO: checar se o token esta expirado
        return NextResponse.next();
    }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }