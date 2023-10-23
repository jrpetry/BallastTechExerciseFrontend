import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConstants } from '../appConstants';
import { Magazine } from '../_models/magazine';

@Injectable({ providedIn: 'root' })
export class MagazineService {
  uri = AppConstants.API_URI + '/Magazine/';
  constructor(private http: HttpClient) { }

  getAll(applicationUserId: number) {
    return this.http.get<Magazine[]>(this.uri + 'GetByApplicationUserId/' + applicationUserId.toString());
  }

  get(id: number) {
    return this.http.get<Magazine>(this.uri + 'Get/' + id.toString());
  }

  post(magazine: Magazine) {
    return this.http.post(this.uri + 'Post', magazine);
  }

  put(magazine: Magazine) {
    return this.http.put(this.uri + 'Put/' + magazine.id.toString(), magazine);
  }

  delete(id: number) {
    return this.http.delete(this.uri + 'Delete/' + id.toString());
  }
}
