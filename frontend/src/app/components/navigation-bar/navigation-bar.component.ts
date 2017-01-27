import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
    @Input() cartItemsCount: number;
    @Input() userIsSignedIn: boolean;
    @Input() userEmail: string;
    @Output() logout = new EventEmitter<void>();
}
