import { OpaqueToken, Injectable } from '@angular/core';

export const INotificationsService = new OpaqueToken('INotificationsService');
export interface INotificationsService {
    success(message): void;
    info(message): void;
    warning(message): void;
    error(message): void;
}

@Injectable()
export class NotificationsService implements INotificationsService {

    private _spawnNotification(body, title) {
        new Notification(title, { body });
    };


    public success(message) {
        this._spawnNotification(message, 'Success');
    }

    public info(message) {
        this._spawnNotification(message, 'Error');
    }

    public warning(message) {
        this._spawnNotification(message, 'Warning');
    }

    public error(message) {
        this._spawnNotification(message, 'Error');
    }

    constructor() {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }
}
