import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
busyReqCount = 0;
  constructor( private spinnerService: NgxSpinnerService) { }

  busy(){
    this.busyReqCount++;
    this.spinnerService.show(undefined,
      {
        type: 'ball-scale-multiple',
        bdColor: 'rgba(0,0,0,0,8)',
        color:'#fff',
        size: 'large'
      }
    )
  }

  idel(){
    this.busyReqCount--;
    if(this.busyReqCount <= 0){
      this.busyReqCount=0;
      this.spinnerService.hide();
    }
  }
}
