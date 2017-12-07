﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    private apiurl = environment.apiurl;
    
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.apiurl+'/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.apiurl+'/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        //default role assigned
        user.role = "BASE";
        return this.http.post(this.apiurl+'/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.apiurl+'/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.apiurl+'/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    //append jwt token to protected resources calls
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}