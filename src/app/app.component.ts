import { Component } from '@angular/core';
import { GeolocationService } from './geolocation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    lat = 42.3340383;
    lng = -83.0528225;
    zoom = 10;
    distance = 50;
    markers: any;
    timer: any;

    constructor(private geolocation: GeolocationService) {
        this.init();
    }

    init () {
        this.markers = [];
        this.search({ lat: this.lat, lng: this.lng });
    }

    centerChange($event) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => this.search($event), 250);
    }

    async search($event) {
        const response = await this.geolocation.search([$event.lat, $event.lng], this.distance);
        console.log(response);
        this.markers = response.map(marker => {
            return [marker.latitude, marker.longitude];
        });
    }
}
