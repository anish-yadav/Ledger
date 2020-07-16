
const getRcvrname = (name) => {
  var nameAr = name.split(' ')
  if(nameAr.length > 2){
    return nameAr[1]+' '+nameAr[2]
  } 
  return name
}

export const getCreditCardMsg = (msgs = []) => {
  const creditPattern = {
    debit: /(debited with Rs.)(\d+.\d+\s)/g,
    rcvr: /at(.*)on(\s\d+-\d+-\d+\d)/g
  }
  let response = []
  console.log('in helper')
  msgs.forEach(msg => {
    if (msg.address.match('PNB')) {
      var demo = msg.body.match(creditPattern.debit)
      var amt = creditPattern.debit.exec(msg.body)
      var rcvr = creditPattern.rcvr.exec(msg.body)
      if (amt && rcvr)
        response.push({ debit: true, amt: amt[2], rcvr: getRcvrname(rcvr[1]), date: rcvr[2],key:amt[2]+rcvr[2]})
    }
  })

  return response
}


export const getImgSrc = (name) => {
  if(name.match('bata') != null){
    return require('../assets/bata.png')
  }
  else if(name.match('flipkart') != null){
    return require('../assets/flipkart.jpg')
  }
  else  if(name.match('amazon') != null){
    return require('../assets/amazon.png')
  }
  else if(name.match('myntra') != null){
    return require('../assets/myntra.png')
  }
  else if(name.match('jio') != null){
    return require('../assets/jio.png')
  }
  else  {
    return require('../assets/grocery.png')
  }
}