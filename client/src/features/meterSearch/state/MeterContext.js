import {API, createDataContext} from '../../../utils';
//! Types
import {FETCH_METER} from './MeterTypes';
//! Reducer
import {meterReducer, INITIAL_STATE} from './MeterReducer';

const fetchMeter = (dispatch) => async (serialNum) => {
  try {
    dispatch({type: FETCH_METER.PENDING});
    const res = await API.get(`/meters/${serialNum}`);
    dispatch({type: FETCH_METER.SUCCESS, payload: res.data});
  } catch (error) {
    dispatch({
      type: FETCH_METER.FAILURE,
      payload: error,
    });
  }
};

export const {Provider, Context} = createDataContext(
  meterReducer,
  {
    fetchMeter,
  },
  INITIAL_STATE,
);
