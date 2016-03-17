/**
 * Created by liekkas on 16/1/8.
 */
import { loadingStyles } from './constants/Consts';

export const VERSION = 'v1.0.0';
export const BASE_URL = 'http://' + window.location.host + '/';
//export const BASE_URL = 'http://' + window.location.host + '/parabird/index.html';
export const REST_API_BASE_URL = 'http://localhost:8080/gags/';
//export const REST_API_BASE_URL = 'http://192.168.1.100:8080/gags/';
//export const REST_API_BASE_URL = 'http://192.168.18.90:8080/gags/';
//export const MAPDATA_API_BASE_URL = 'http://192.168.1.100:4000/api/v1/map/'
export const MAPDATA_API_BASE_URL = 'http://192.168.18.90:4000/api/v1/map/'
//export const REST_API_BASE_URL = 'http://192.168.18.202:4000/api/v1/parabirds/';

//加载效果
export const LOADING_STYLE = loadingStyles.lineScalePulseOut;

export const theme = {
  CHART_PANEL_HEIGHT: 400,
}

