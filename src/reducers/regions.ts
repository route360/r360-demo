
import { NEXT_REGION, PREVIOUS_REGION, REGION_BY_ID } from '../constants/RegionActionTypes';

const _regionList = [
  {
    'id': 'australia',
    'name': 'Australia and New Zealand',
    'url': '/assets/images/regions/australia.jpg'
  }, {
    'id': 'germany',
    'name': 'Germany',
    'url': '/assets/images/regions/germany.jpg'
  }, {
    'id': 'netherlands',
    'name': 'Netherlands',
    'url': '/assets/images/regions/amsterdam.jpg'
  }, {
    'id': 'malaysia_singapore',
    'name': 'Malaysia, Singapore, Brunei',
    'url': '/assets/images/regions/singapore.jpg'
  }, {
    'id': 'norway',
    'name': 'Norway',
    'url': '/assets/images/regions/oslo.jpg'
  }, {
    'id': 'france',
    'name': 'France & Belgium',
    'url': '/assets/images/regions/paris.jpg'
  }, {
    'id': 'britishcolumbia',
    'name': 'British Columbia',
    'url': '/assets/images/regions/vancouver.jpg'
  }, {
    'id': 'denmark',
    'name': 'Denmark',
    'url': '/assets/images/regions/copenhagen.jpg'
  }, {
    'id': 'britishisles',
    'name': 'British Isles',
    'url': '/assets/images/regions/london.jpg'
  }, {
    'id': 'switzerland',
    'name': 'Switzerland',
    'url': '/assets/images/regions/zurich.jpg'
  }, {
    'id': 'austria',
    'name': 'Austria',
    'url': '/assets/images/regions/vienna.jpg'
  }, {
    'id': 'hungary',
    'name': 'Hungary',
    'url': '/assets/images/regions/budapest.jpg'
  }, {
    'id': 'poland',
    'name': 'Poland',
    'url': '/assets/images/regions/warsaw.jpg'
  }, {
    'id': 'slovakia',
    'name': 'Slovakia',
    'url': '/assets/images/regions/bratislava.jpg'
  }, {
    'id': 'newyork',
    'name': 'USA and Mexico',
    'url': '/assets/images/regions/newyork.jpg'
  }, {
    'id': 'italy',
    'name': 'Italy',
    'url': '/assets/images/regions/italy.jpg'
  }, {
    'id': 'spain',
    'name': 'Spain',
    'url': '/assets/images/regions/spain.jpg'
  }, {
    'id': 'portugal',
    'name': 'Portugal',
    'url': '/assets/images/regions/portugal.jpg'
  }, {
    'id': 'czech_republic',
    'name': 'Czech Republic',
    'url': '/assets/images/regions/prague.jpg'
  }, {
    'id': 'sweden',
    'name': 'Sweden',
    'url': '/assets/images/regions/sweden.jpg'
  }, {
    'id': 'south_america',
    'name': 'South America',
    'url': '/assets/images/regions/rio.jpg'
  }, {
    'id': 'quebec',
    'name': 'Quebec',
    'url': '/assets/images/regions/quebec.jpg'
  }
];

const _initialRegion = {
    'id': 'germany',
    'name': 'Germany',
    'url': '/assets/images/regions/germany.jpg'
};

export const currentRegion = (state: any = _initialRegion, action: any) => {
  switch (action.type) {
    case NEXT_REGION:
      return _regionList[(_regionList.findIndex( region => region.id === state.id) + 1) % _regionList.length];
    case PREVIOUS_REGION:
      return _regionList[((_regionList.findIndex( region => region.id === state.id) - 1) < 0 ) ? (_regionList.length - 1) : ((_regionList.findIndex( region => region.id === state.id) - 1) % _regionList.length)];
    case REGION_BY_ID:
      return _regionList.find( region => region.id === action.id );
    default:
      return state;
  }
};

export const regionList = (state: any[] = _regionList, action: any) => {
  return state;
};