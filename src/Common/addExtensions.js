export default () => {
  //create a function that will shuffle an array:
  // based on a function will generate random integer between min and max values
  Number.between = function(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  Array.prototype.shuffle = function(count) {
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
  String.prototype.toTitleCase = function() {
    let str = this.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}