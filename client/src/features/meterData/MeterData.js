import React, {useContext} from 'react';
//! UI Components
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from '@material-ui/core';
//! Features
import MeterSearch from '../meterSearch/MeterSearch';
//! Context
import {MeterContext} from '../meterSearch';

const columns = [
  {id: 'ReadingDateTimeUTC', label: 'Date Time', minWidth: 170},
  {
    id: 'WH',
    label: 'WH',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'VARH',
    label: 'VARH',
    minWidth: 170,
    align: 'right',
  },
];

const MeterData = () => {
  //! Style
  const classes = useStyles();
  //! Context
  const {state} = useContext(MeterContext);
  const {details, meter} = state;
  //! State
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="App">
      <MeterSearch />
      {details && (
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${details.serialNum}`}
            </Typography>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{minWidth: column.minWidth}}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {meter
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={meter.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default MeterData;
