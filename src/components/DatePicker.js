import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { FormGroup, Label, UncontrolledTooltip } from 'reactstrap';
import s from '../styles/Profile.module.scss';
import cx from 'classnames';

function DatePickerField(props) {
  const {
    name,
    values,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
  } = props;
  // const { name } = props.field;

  const handleChange = (date) => {
    setFieldValue(name, date, true); //field,value,shouldValidate
    setFieldTouched(name, true, true); //field,touched,shouldValidate
  };

  return (
    <FormGroup>
      <Label for='last_donated_date'>
        If donated before please select the donation date:
      </Label>
      <div>
        <DatePicker
          className='form-control'
          placeholderText='Click to select a date'
          dateFormat='dd-MMM-yyyy'
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          selected={values.last_donated_date}
          maxDate={new Date()}
          isClearable
          onChange={handleChange}
          // onBlur={handleBlur}
        />
      </div>
      {errors.last_donated_date && touched && (
        <div className='input-feedback'>{errors.last_donated_date}</div>
      )}
    </FormGroup>
  );
}

DatePicker.propTypes = {};

export default DatePickerField;
