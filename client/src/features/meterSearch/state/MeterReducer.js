import {FETCH_METER} from './MeterTypes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  details: '',
  meter: [],
  data: '',
  whData: '',
  varhData: '',
};

const setData = (state, payload) => {
  let labels = [];
  let wh = [];
  let varh = [];

  payload.forEach((element) => {
    //! Lets get the data labels
    const date = element.ReadingDateTimeUTC.split(' ');
    labels.push(element.ReadingDateTimeUTC);

    wh.push(element.WH);
    varh.push(element.VARH);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'WH',
        data: wh,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'VARH',
        data: varh,
        fill: false,
        borderColor: '#742774',
      },
    ],
  };

  const whData = {
    labels,
    datasets: [
      {
        label: 'WH',
        data: wh,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const varhData = {
    labels,
    datasets: [
      {
        label: 'VARH',
        data: varh,
        fill: false,
        borderColor: '#742774',
      },
    ],
  };

  const date = payload[0].ReadingDateTimeUTC.split(' ');
  const details = {serialNum: payload[0].Serial, date: date[0]};

  return {
    ...state,
    loading: false,
    details,
    meter: payload,
    data,
    whData,
    varhData,
  };
};

const meterReducer = (state, action) => {
  switch (action.type) {
    //! Pending
    case FETCH_METER.PENDING:
      return {...state, error: false, loading: true};
    //! Success
    case FETCH_METER.SUCCESS:
      return setData(state, action.payload);
    //! Failure
    case FETCH_METER.FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export {meterReducer, INITIAL_STATE};
