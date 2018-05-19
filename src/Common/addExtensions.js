export default () => {
  // return full datetime string
  Date.prototype.toString = function(format = 'dd/mm/yyyy 00:00:00 AM') {
    let separator = '/', day, month
    switch (format) {
      case 'dd/mm/yyyy 00:00:00 AM':
        let parts = this.toLocaleString()
                        .split(',')
                        .join('')
                        .split('/');
        day = (+parts[1]>9 ? '' : '0') + parts[1];
        month = (+parts[0]>9 ? '' : '0') + parts[0];
        return [day,month,parts[2]].join('/');
      case 'dd-mm-yyyy':
        separator = '-';
      case 'dd/mm/yyyy':
        day = this.getDate();
        day = (day>9 ? '' : '0') + day;
        month = this.getMonth()+1;
        month = (month>9 ? '' : '0') + month;
        return [
            day,
            month,
            this.getFullYear()
          ].join(separator);
      case 'yyyy-mm-dd':
          separator = '-';
      case 'yyyy/mm/dd':
        day = this.getDate();
        day = (day>9 ? '' : '0') + day;
        month = this.getMonth()+1;
        month = (month>9 ? '' : '0') + month;
        return [
            this.getFullYear(),
            month,
            day
          ].join(separator);
    }
  }
  // return the duration from now till that date in [years days hours minutes seconds] format
  Date.prototype.duration = function(format = 'd') {
    // each time unit relavant to seconds used to do units calc
    const readaleFormat  = (val,unit) => val += (val>1)? ' ' + unit + 's' : ' ' + unit,
          shortFormat    = (val,unit) => val += ' ' + unit + '(s)',
          leadingZero    = (val) => (val<10)? '0'+val : val,
          time = {
            year:   31536000,
            day:    86400,
            hour:   3600,
            minute: 60,
            second: 1
            };
    // get the diffs between target date and now in seconds then add two hours [Cairo time]
    let seconds = ( this.getTime()/1000 - (new Date()).getTime()/1000 ) + (time.hour*2),
        val = '',
        lastUnit = '',
        result = [];
    // return the default format [numbers only]
    if (format === 'd') {
      return Object.keys(time).map(unit => {
              if (seconds >= time[unit]) {
                val = Math.floor(seconds/time[unit]);
                seconds = seconds % time[unit];
                return leadingZero(val);
              } else {
                return '00';
              }
            }).join(':');
    } else {
      for ( let unit of Object.keys(time) ) {
        if (seconds >= time[unit]) {
          val = Math.floor(seconds/time[unit]);
          seconds = seconds % time[unit];
          result.push((format === 'r')? readaleFormat(val,unit) : shortFormat(val,unit));
        }
      }
      // get the last unit
      lastUnit = result.pop();
      // build the result string from the result array and lastUnit
      return (result.length)? result.join(', ') + ' and ' + lastUnit : lastUnit;
    }
  }
  //create a function that will shuffle an array:
  // based on a function will generate random integer between min and max values
  Number.between = function(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // randomize sort an array
  Array.prototype.randomize = function(count) {
    if(this.length <= 1)
      return this;
    let index,
        indexes = [],
        len = (count)? count : this.length;
    // generate random index
    // if not in the indexes add it
    // do this till the indexes length equal to array length
    do {
      index = Number.between(0,this.length-1);
      if(!indexes.includes(index))
        indexes.push(index);
    } while (indexes.length < len);
    // do the shuffle
    return indexes.map( index => this[index] );
  }
  Array.prototype.flatten = function() {
    this.reduce( (a, b) => a.concat(Array.isArray(b) ? flattenArr(b) : b), []);
  }
  // randomize sort an array
  Array.prototype.shuffle = function() {
    if(this.length < 2)
      return this;
    this.sort(() => Math.random() - 0.5);
  }
  // split an array to group of chunks of fixed length
  Array.prototype.chunks = function(chunkSize) {
    if(chunkSize >= this.length)
      return this;
    let result = [],
        len = this.length;
    for (let i = 0; i<len; i +=chunkSize)
      result.push(this.slice(i, i+chunkSize));
    return result;
  }
  // remove any duplicated values from array
  Array.prototype.unique = function() {
    let result = [];
    this.forEach( item => {
        if ( !result.includes(item) )
          result.push(item);
    });
    this.length = 0;
    this.push(...result);
    return this;
  }
  // title case a string
  String.prototype.toTitleCase = function() {
    let str = this.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  String.prototype.chunks = function(chunkLength) {
    if(chunkLength >= this.length)
      return this;
    let result = [],
        len = this.length;
    for (var i=0; i<len; i+=chunkLength)
      result.push(this.substring(i, i+chunkLength));
    return result;
  }
  // convert the date string to date object - it assume date string in dd/mm/yyyy
  // if format is false then assume string in yyyy/mm/dd or mm/dd/yyyy
  String.prototype.toDate = function(format = true) {
    let str = this;
    if (format){
      let parts = this.split('/');
      str = [parts[1],parts[0],parts[2]].join('/')
    }
    return new Date(str);
  }
}