import buildTouristView from './house_page_tourist.js';
import buildOwnerView from './house_page_owner.js';
import { TOURIST, OWNER } from './common.js';

const pageView = localStorage.getItem('page-view');

if (pageView == TOURIST) {
  buildTouristView();
} else {
  buildOwnerView();
}
