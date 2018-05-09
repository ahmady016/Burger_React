import React, { Component } from 'react'
import M from 'materialize-css';
import './MdForm.css';
import Template from './../Template'

export default class MdForm extends Component {

  domElements = {};

  inputs  = Object.keys(this.props)
                  .map(key => ({ fieldName: key, ...this.props[key] } ));

  state = this.inputs
              .filter(input => !['submit','button'].includes(input.fieldName) )
              .reduce( (obj, input) => {
                obj[input.fieldName] = {
                  value: input.value || '',
                  valid: false,
                  touched: false,
                  errors: {}
                };
                return obj;
              }, {valid: false, touched: false});

  formFields = this.inputs
    .map( input => {
      let key = input.fieldName;
      switch (input.type) {
        case 'checkbox':
        case 'radio':
          return (
            <div key={key} className="input-field">
              <i class="material-icons prefix">{input.icon || 'input'}</i>
              <label className="radio-check-label" htmlFor={key}>{input.label || input.placeholder || key}</label>
              <div className="radio-check-items">
                {input.options.map(opt => (
                  <label className="radio-check-item">
                    <input type={input.type} className={input.className || ''}
                            id={opt.value}
                            name={key}
                            value={this.state.key}
                            onChange={ (e) => this.setState((prevState) => {
                              let value = prevState[key].value;
                              if (this.domElements[key][opt.value].checked) {
                                value = (input.type === 'checkbox' && value)
                                              ? value + ',' + opt.value
                                              : opt.value;
                              }
                              return {
                                [key]: {
                                  ...prevState[key],
                                  value: value
                                }
                              }
                            }) }
                            onBlur={ (e) => this.setState( (prevState) =>  {
                              return {
                                [key]: {
                                  ...prevState[key],
                                  touched: true
                                }
                              }
                            }) } />
                    <span>{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          )
        case 'switch':
          return (
            <div key={key} className="input-field">
              <i class="material-icons prefix">{input.icon || 'input'}</i>
              <div className="switch">
                  <label className="switch-label">
                    <input type="checkbox"
                          id={key}
                          name={key}
                          value={this.state.key}
                          onChange={ (e) => this.setState( (prevState) =>  {
                            return {
                              [key]: {
                                ...prevState[key],
                                value: this.domElements[key].checked
                              }
                            }
                          }) }
                          onBlur={ (e) => this.setState( (prevState) =>  {
                            return {
                              [key]: {
                                ...prevState[key],
                                touched: true
                              }
                            }
                          }) } />
                    <span class="lever"></span>
                  </label>
                  <label className="input-label" htmlFor={key}>{input.label || input.placeholder || key}</label>
              </div>
            </div>
          )
        case 'range':
          return (
            <div key={key} className="input-field">
              <i className="material-icons prefix">{input.icon || 'input'}</i>
              <label className="range-label" htmlFor={key}>{input.label || input.placeholder || key}</label>
              <input className="range-input"
                    type="range"
                    id={key}
                    name={key}
                    min={input.min || 0}
                    max={input.max || 100}
                    value={this.state.key}
                    onChange={ (e) => this.setState( (prevState) =>  {
                      return {
                        [key]: {
                          ...prevState[key],
                          value: this.domElements[key].value
                        }
                      }
                    }) }
                    onBlur={ (e) => this.setState( (prevState) =>  {
                      return {
                        [key]: {
                          ...prevState[key],
                          touched: true
                        }
                      }
                    }) } />
            </div>
          )
        case 'textarea':
          return (
            <div key={key} className="input-field">
              <i class="material-icons prefix">{input.icon || 'input'}</i>
              <textarea className="materialize-textarea"
                        id={key}
                        name={key}
                        value={this.state.key}
                        onChange={ (e) => this.setState( (prevState) =>  {
                          return {
                            [key]: {
                              ...prevState[key],
                              value: this.domElements[key].value
                            }
                          }
                        }) }
                        onBlur={ (e) => this.setState( (prevState) =>  {
                          return {
                            [key]: {
                              ...prevState[key],
                              touched: true
                            }
                          }
                        }) }>
              </textarea>
              <label htmlFor={key}>{input.label || input.placeholder || input.name}</label>
            </div>
          )
        case 'datepicker':
        case 'timepicker':
          const className = (input.type === 'datepicker')? input.type + ' no-autoinit' : input.type;
          return (
            <div key={key} className="input-field">
              <i class="material-icons prefix">{input.icon || 'input'}</i>
              <input type="text"
                    id={key}
                    name={key}
                    className={className}
                    value={this.state.key}
                    onBlur={ (e) => this.setState( (prevState) =>  {
                      return {
                        [key]: {
                          ...prevState[key],
                          value: this.domElements[key].value,
                          touched: true
                        }
                      }
                    }) } />
              <label htmlFor={key}>{input.label || input.placeholder || key}</label>
            </div>
          )
        case 'select':
          return (
            <div class="input-field">
              <i class="material-icons prefix">{input.icon || 'input'}</i>
              <select id={key}
                      name={key}
                      value={this.state.key}
                      onChange={ (e) => this.setState( (prevState) =>  {
                        return {
                          [key]: {
                            ...prevState[key],
                            value: this.domElements[key].value,
                            touched: true
                          }
                        }
                      }) }
                      onBlur={ (e) => this.setState( (prevState) =>  {
                        return {
                          [key]: {
                            ...prevState[key],
                            touched: true
                          }
                        }
                      }) }>
                <option value=''>Choose {input.label || input.placeholder || key}</option>
                {input.options.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
              </select>
              <label htmlFor={key}>{input.label || input.placeholder || key}</label>
            </div>
          )
        case 'submit':
        case 'button':
          return (
            <Template>
              <br />
              <button className={"btn waves-effect waves-light "+input.className}
                      id={input.key}
                      name={input.key}
                      onClick={(e)=> {
                          e.preventDefault();
                          console.log(this.state);
                        }}>
                  Submit
                <i class="material-icons right">{input.icon || 'send'}</i>
              </button>
            </Template>
          )
        default:
          return (
            <div key={key} className="input-field">
              <i class="material-icons prefix">{input.icon || 'input'}</i>
              <input id={key}
                    name={key}
                    type={input.type || 'text'}
                    value={this.state.key}
                    onChange={ (e) => this.setState( (prevState) =>  {
                      return {
                        [key]: {
                          ...prevState[key],
                          value: this.domElements[key].value
                        }
                      }
                    }) }
                    onBlur={ (e) => this.setState( (prevState) =>  {
                      return {
                        [key]: {
                          ...prevState[key],
                          touched: true
                        }
                      }
                    }) } />
              <label htmlFor={key}>{input.label || input.placeholder || key}</label>
            </div>
          )
      }
    });

  initDatePickers = () => {
    const currentYear = +(new Date()).getFullYear();
    const pickers = document.querySelectorAll('.datepicker');
    pickers.forEach(picker => {
      const options = {
        format: 'dd/mm/yyyy',
        yearRange: [currentYear-70,currentYear],
        firstDay: 6,
        onSelect: (selectedDate) => {
          this.setState({ [picker.id]: { value: selectedDate } });
        }
      }
      M.Datepicker.init(picker, options);
    });
  }

  componentDidMount () {
    // init the datepicker with options
    this.initDatePickers();
    // get all the needed dom element to be used element events
    this.domElements = this.inputs
        .filter(input => !['submit','button'].includes(input.fieldName) )
        .reduce( (obj, input) => {
          if (input.type === 'checkbox' || input.type === 'radio')
            obj[input.fieldName] = input.options.reduce( (obj, opt) => {
              obj[opt.value] = document.getElementById(opt.value);
              return obj;
            }, {});
          else
            obj[input.fieldName] = document.getElementById(input.fieldName);
          return obj;
        }, {});
  }

  render() {
    return (
      <form className={this.props.className}>
        {this.formFields}
      </form>
    )
  }
}