import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marker } from './marker.model';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    constructor(private http: HttpClient) { }

    public search(coordinates, distance): Promise<Marker[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const response: any = await this.http
                    .post(`http://localhost:3000`, { coordinates, distance })
                    .toPromise();
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }

}
