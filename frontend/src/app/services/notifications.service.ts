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

    constructor() {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }

    private spawnNotification(body, title) {
        new Notification(title, { body });
    };

    public success(message) {
        this.spawnNotification(message, 'Success');
    }

    public info(message) {
        this.spawnNotification(message, 'Error');
    }

    public warning(message) {
        this.spawnNotification(message, 'Warning');
    }

    public error(message) {
        this.spawnNotification(message, 'Error');
    }
}
