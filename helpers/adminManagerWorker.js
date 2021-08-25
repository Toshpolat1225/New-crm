module.exports = {
  ifst(a, b, c, options){
    if(  a || b || c){
      return options.fn(this)
    }
    return options.inverse(this)
          
  } 
}
  
  