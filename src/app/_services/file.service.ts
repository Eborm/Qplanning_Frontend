import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  downloadExcelFile(url: string): Observable<any> {
    return this.http.get(this.createCompleteRoute(url, environment.urlAddress), {responseType: 'blob'});
  }

  private createCompleteRoute = (url: string, envAddress: string) => {
    return `${envAddress}/${url}`;
  }

}
