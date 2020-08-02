const HttpStatus = require('http-status-codes');
const csv = require('csvtojson');
//! Redis Cache
const {setCache, getCache} = require('../services/cache');
//! Path to CSV File
const csvFilePath = 'metering_data.csv';

module.exports.readMeterData = async (req, res, next) => {
  try {
    const {serialNum} = req.params;

    //! Lets check if the data is available in the cache
    //const data = await getCache(serialNum); //! Lets check the reading in the cache
    //! We not using caching, REDIS will need to be installed on Test Machine
    let data = null;

    if (!data) {
      // Async / await usage
      const jsonArray = await csv().fromFile(csvFilePath);
      let filtered = jsonArray.filter((meter) => meter.Serial === serialNum);
      if (!filtered.length) {
        const message = `The meter with serial number ${serialNum} was not found`;
        return res.status(HttpStatus.NOT_FOUND).send({
          error: {
            message,
          },
        });
      }

      //! Lets cache the data for the next reading
      //setCache(serialNum, filtered);
      return res.send(filtered);
    }

    return res.send(data);
  } catch (err) {
    next(err);
  }
};
