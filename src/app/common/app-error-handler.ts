import { Injectable ,ErrorHandler } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn:"root"
})
export class AppErrorHandler implements ErrorHandler{
    constructor(private toastr: ToastrService){

    }

    handleError(error: any): void {
        this.toastr.error("An error has occurred");
        console.log(error);
    }
}