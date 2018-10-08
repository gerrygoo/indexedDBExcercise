import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DexieServiceService extends Dexie {

  constructor() {
    super('NGDexie');
    this.version(1).stores({ heroes: '++id, name', cities: 'hero, city'});
  }
}
