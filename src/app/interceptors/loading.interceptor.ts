import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, map, Observable } from 'rxjs';
import { BusyService } from '../spinnerService/busy.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService,
    private spinnerService: NgxSpinnerService
  ) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    this.busyService.busy();

    return next.handle(request).pipe(

       delay(2000),
      finalize(()=>this.busyService.idel())
      );
  }
}
