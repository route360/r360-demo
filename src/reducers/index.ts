import {StoreModule, combineReducers} from '@ngrx/store';
import * as regions from './regions';

// const reducer = combineReducers(regions);

export const store = StoreModule.provideStore(regions);
