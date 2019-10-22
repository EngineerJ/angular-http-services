import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AppError } from '../common/error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: Http, private url: string) { }

  getAll(){
    return this.http.get(this.url).pipe(
        map(response=>response.json()),
        catchError(this.handleError)
    );
  }

  create(resource){
    // return throwError(new AppError());
    return this.http.post(this.url,JSON.stringify(resource)).pipe(
        map(response=>response.json()),
        catchError(this.handleError)
    );
  }

  update(resource){
    return this.http.put(this.url+'/'+resource.id,JSON.stringify(resource)).pipe(
        map(response=>response.json()),
        catchError(this.handleError)
    );
  }

  delete(id){
    // return throwError(new AppError());
    return this.http.delete(this.url+"/"+id).pipe(
        map(response=>response.json()),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response){
    if(error.status === 404)
      return throwError(new NotFoundError());
    if(error.status === 400)
      return throwError(new BadInput(error.json()));
    return throwError(new AppError(error));
  }
}
