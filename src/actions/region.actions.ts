import * as types from '../constants/RegionActionTypes';

export function nextRegion() {
  return {type: types.NEXT_REGION};
}

export function prevoiusRegion() {
  return {type: types.PREVIOUS_REGION};
}

export function getById(id: string) {
  return {type: types.REGION_BY_ID, id};
}
