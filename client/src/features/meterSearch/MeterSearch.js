import React, {useState, useContext} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
//! Material UI Components
import {makeStyles} from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Modal,
  CircularProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';
//! Context
import {Context} from './state/MeterContext';

const MeterSearch = () => {
  //! Style
  const classes = useStyles();
  //! Context
  const {state, fetchMeter} = useContext(Context);
  const {loading, error, details} = state;
  //! State
  const [modal, setModal] = useState(false);
  const [serialNum] = useState(details?.serialNum);

  const {values, errors, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      serialNum,
    },
    validationSchema,
    onSubmit: async (values) => {
      await fetchMeter(values.serialNum);
      //! Open modal if there is error
      if (error) setModal(true);
    },
  });

  return (
    <>
      <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
        <InputBase
          className={classes.input}
          name="serialNum"
          placeholder="Meter Serial Number"
          value={values.serialNum}
          inputProps={{'aria-label': 'search meter by serial number'}}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <br />
      {errors?.serialNum && <Alert severity="error">{errors.serialNum}</Alert>}
      {loading && (
        <Modal
          open={loading}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 300,
            }}>
            <CircularProgress color="secondary" />
          </div>
        </Modal>
      )}
      {error && (
        <Dialog
          open={modal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}>
          <DialogTitle id="alert-dialog-title">{'Meter Search'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {error?.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModal(false)} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

const validationSchema = Yup.object({
  serialNum: Yup.string().required('Meter serial number is required!'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default MeterSearch;
