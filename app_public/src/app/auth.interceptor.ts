import { HttpRequest, HttpHandler, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token'); 

  let authReq = req;
  if (authToken) {
    authReq = req.clone({
		headers: req.headers.set('Authorization', authToken),
    });
  }

  return next(authReq);
};