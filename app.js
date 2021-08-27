function reverseString(str) {
    var listOfChars = str.split('');
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join('');
    return reversedString;
  }
  
  function checkPalindrome(str) {
    var reversedString = reverseString(str);
    return str === reversedString;
  }
  
  function dateToStrings(date) {
    var dateTostr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateTostr.day = '0' + date.day;
    }
    else {
      dateTostr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateTostr.month = '0' + date.month;
    }
    else {
      dateTostr.month = date.month.toString();
    }
  
    dateTostr.year = date.year.toString();
    return dateTostr;
  }
  
  function getAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }
  
  function checkPalindromeForAllDateFormats(date) {
    var dateFormatList = getAllFormats(date);
    var palindromeList = [];
  
    for (var i = 0; i < dateFormatList.length; i++) {
      var result = checkPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
  }
  
  function isLeapYear(year) {
  
    if (year % 400 === 0 || year %4===0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    else{
      return false;

    }
  

  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  function getNextPalindromeDate(date) {
  
    var nextDate = getNextDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = dateToStrings(nextDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  
  function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      }
      else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        }
        else {
          day = 28;
        }
      }
      else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  function getPreviousPalindromeDate(date) {
  
    var previousDate = getPreviousDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = dateToStrings(previousDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
  }
  
  var dob = document.querySelector('#input-date');
  var checkBtn = document.querySelector('#btn-check');
  var output = document.querySelector('#show-output');
  
  function clickHandler(e) {
    var bdayString = dob.value;
  
    if (bdayString !== '') {
      var date = bdayString.split('-');
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];
  
      var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
      }};

      var dateStr = dateToStrings(date);
      var list = checkPalindromeForAllDateFormats(dateStr);
      var isPalindrome = false;
  
      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
        }
      }
  
      if (!isPalindrome) {
        const [ctr1, nextDate] = getNextPalindromeDate(date);
        const [ctr2, prevDate] = getPreviousPalindromeDate(date);
  
        if (ctr1 > ctr2) {
          output.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
        } else {
          output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
        }
  
      } else {
        output.innerText = 'Your birthday is a  palindrome';
      }
    }
  
  
  checkBtn.addEventListener('click', clickHandler);