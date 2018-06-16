// base function to test regular expressions
const regex = (pattern,value) => pattern.test(value);
// test for numeric values
const numeric = (value) => regex(/^[0-9]+$/,value);
// test for e-mail address
const email = (value) => regex(/^([A-Za-z0-9_\-\.]{3,})+\@([A-Za-z0-9_\-\.{2,}])+\.([A-Za-z]{2,4})$/, value);
// test on alphabet characters - and take lang to allow en or ar otherwise allow both
const alpha = (value, lang) => {
  const ar_alpha = /^([\u0600-\u06ff ]|[\u0750-\u077f ]|[\ufb50-\ufbc1 ]|[\ufbd3-\ufd3f ]|[\ufd50-\ufd8f ]|[\ufd92-\ufdc7 ]|[\ufe70-\ufefc ]|[\ufdf0-\ufdfd ])*$/g,
        en_alpha = /^[a-zA-Z ]+$/;
  switch(lang) {
    case 'en':
      return regex(en_alpha,value);
    case 'ar':
      return regex(ar_alpha,value);
    default:
      return ( regex(en_alpha,value) || regex(ar_alpha,value) );
  }
}
// test for a web url
const url = function(value) {
  const __url = new RegExp("^" +
      // protocol identifier
      "(?:(?:https?|ftp)://)" +
      // user:pass authentication
      "(?:\\S+(?::\\S*)?@)?" + "(?:" +
      // IP address exclusion - private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0 // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
      // host name
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
      // domain name
      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
      // TLD identifier
      "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
      // TLD may end with dot
      "\\.?" + ")" +
      // port number
      "(?::\\d{2,5})?" +
      // resource path
      "(?:[/?#]\\S*)?" + "$", "i");
  return regex(__url, value);
}
// test for a password strength
const password = (value, strong = true) => {
  const strong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const medium = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  if(strong)
    return regex(strong, value);
  return regex(medium, value);
}
// test for required value
const required = (value) => (value != "" && value != null);
// test for confirm the seed value is equal the value
const confirmed = (value, seedValue) => (value === seedValue);
// test the value to be exists on the given list
// the list must be [Array of String] Or [Array of object and supplay the key field ]
const inList = (value, list, key) => {
  if (list && list instanceof Array)
    return list.some(item => (key)? (value === item[key]) : (value === item) );
  return "not a list ...";
}
const between = ({ type, value, min, max }) => {
  switch (type) {
    case 'string':
      return (value.length >= min && value.length <= max);
    case 'number':
      value = +value;
      min = +min;
      max = +max;
      return (value >= min && value <= max);
    case 'date':
      value = value.toDate();
      min = min.toDate();
      max = max.toDate();
      return (value >= min && value <= max);
    default:
      return 'not a valid type !!!';
  }
}

export {
  alpha,
  numeric,
  email,
  url,
  password,
  required,
  confirmed,
  inList,
  between
}