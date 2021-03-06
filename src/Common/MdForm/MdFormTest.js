import React from 'react';
import MdForm from './MdForm';

const formFields = {
  name: {
    type: 'text',
    label: 'name'
  },
  email: {
    type: 'email',
    label: 'email',
    icon:'account_circle'
  },
  password: {
    type: 'password',
    label: 'password',
    icon:'vpn_key'
  },
  description: {
    type: 'textarea',
    label: 'description',
    icon: 'mode_edit'
  },
  gender: {
    type: 'radio',
    label: 'Gender',
    options: [
        "Male",
        "Female"
      ].map(opt => ({text: opt, value: opt}) )
  },
  hoppies: {
    type: 'checkbox',
    label: 'Hoppies',
    options: [
        "Travelling",
        "Reading",
        "Running",
        "Swimming",
        "Bicycle"
      ].map(opt => ({text: opt, value: opt}) )
  },
  maritalStatus: {
    type: 'select',
    label: 'Marital Status',
    icon: 'people',
    options: [
        "Single",
        "Married",
        "Divorced",
        "Widowed"
      ].map(opt => ({text: opt, value: opt}) )
  },
  birthDate: {
    type: 'datepicker',
    label: 'Date Of Birth',
    icon: 'date_range'
  },
  birthTime: {
    type: 'timepicker',
    label: 'Time Of Birth',
    icon: 'hourglass_empty'
  },
  rate: {
    type: 'range',
    label: 'your rate'
  },
  isAdmin: {
    type: 'switch',
    label: 'Are you Admin'
  },
  submit: {
    type: 'submit',
    label: 'submit',
    className: 'btn-large'
  }
}

export default () => {
    return (
      <div className="container">
        <div className="row" style={ { width: '100%' } }>
          <MdForm className="col s6 push-s3" {...formFields} />
        </div>
      </div>
    );
}