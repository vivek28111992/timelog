'use strict'
var _ = require('lodash');
//var uid = require('rand-token').uid;
//var errorStack = require('./errorStack');

     

var sendJsonResponse = function (res, status, msgCode, message) {
  res.contentType('application/json')
  //  res.status(status)
  //  res.json(content)

  res.status(status).send({
    msgCode: msgCode,
    message: message
  })
}

function sendResultMessage(res, status, msgCode, message, result){
   res.contentType('application/json')
  //  res.status(status)
  //  res.json(content)

  res.status(status).send({
    msgCode: msgCode,
    message: message,
    result:result
  })
}

var sendResponse = function (res, status, obj) {
  res.contentType('application/json')
  //  res.status(status)
  //  res.json(content)

  res.status(status).send(obj);
}

var sanitizeInput = function(str){
  return str.trim();
}

var sanityField = (function () {

  function isEmpty (str) {
    return !str;
  }

  function isValidEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  function isValidDate (datestr,formatstr) {
    if (!(datestr && formatstr)) {return false;}
    var splitter = formatstr.match(/\-|\/|\s/) || ['-']
       ,df       = formatstr.split(splitter[0])
       ,ds       = datestr.split(splitter[0])
       ,ymd      = [0,0,0]
       ,dat;
    for (var i=0;i<df.length;i++){
            if (/yyyy/i.test(df[i])) {ymd[0] = ds[i];}
       else if (/mm/i.test(df[i]))   {ymd[1] = ds[i];}
       else if (/dd/i.test(df[i]))   {ymd[2] = ds[i];}
    }
    dat = new Date(ymd.join('/'));
    return !isNaN(dat) && Number(ymd[1])<=12 && dat.getDate()===Number(ymd[2]);
  }

  function checkMethods(signup_method){
    if(signup_method == 'email' || signup_method == "username" || signup_method == "contact_no"){
      return true;
    }
    return false;
  }


  return {
    isEmpty : isEmpty,
    isValidEmail : isValidEmail,
    isNumeric:isNumeric,
    hasNumber : hasNumber,
    isValidDate : isValidDate,
    checkMethods : checkMethods
  }
})();

function isEmptyObj (obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}


module.exports = {
  sendJsonResponse: sendJsonResponse,
  sendResponse:sendResponse,
  sanityField : sanityField,
  isEmptyObj:isEmptyObj,
  sendResultMessage:sendResultMessage
}