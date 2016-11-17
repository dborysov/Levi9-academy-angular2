import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { cartStore } from '../../services/shopping-cart.service';

interface ICartStateItem {
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public items: Observable<ICartStateItem[]>;

  constructor(private _store: Store<ICartStateItem[]>) {
    this.items = _store;

    _store.dispatch({ type: 'REMOVE_ALL', payload: { id: 1, quantity: 20 } });
  }

  ngOnInit() {
  }

}
