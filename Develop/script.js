// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

//const dayjs = require("dayjs");


const localeSet = {}; // redundant, maybe comment this out!!!!!!!!
dayjs.locale(localeSet);
// Will wait until the DOM is fully loaded before executing the function
$(function() {
  // Function will get the current hour of the day -- referenced from the dayjs library String + Format
  // 'H' denotes a 24 hour clock to be called from the dayjs library 
  const thisHour = dayjs().format('H'); 
  // Function below toggles the ".time-block" based on the "past", "present", and "future" class relative to my thisHour variable.
  // .addClass & .removeClass didnt make conceptual sense to me here, so I found .toggleClass on https://htmlcheatsheet.com/jquery/
  function hourColor() {
    $('.time-block').each(function() {
      const hourBlock = parseInt(this.id);
      $(this).toggleClass('past', hourBlock < thisHour );
      $(this).toggleClass('present', hourBlock === thisHour );
      $(this).toggleClass('future', hourBlock > thisHour );
    });
  }
  // eventLister included in bottom function to save user input to localStorage
  function saveToLocal() {
    $('.saveBtn').on('click', function() {
      const keyInput = $(this).parent().attr('id');
      const valueInput = $(this).siblings('.description').val();
      localStorage.setItem(keyInput, valueInput);
    });
  }
  // Function below will refresh each ".time-block" relative to the thisHour variable whether it is past= gray, present=red, or the future=green. 
  
  function changeColor() {
    $('.time-block').each(function() {
      const hourBlock = parseInt(this.id);
      if ( hourBlock == thisHour ) {
        $(this).removeClass('past', 'future').addClass('present');
      } else if ( hourBlock < thisHour ) {
        $(this).removeClass('present', 'future').addClass('past');
      } else ( hourBlock > thisHour )
        $(this).removeClass('past', 'present').addClass('future');
    });
  // Function will also be built to pull user input from localStorage and set the textarea values for each corresponding ".time-block"
    $('.time-block').each(function() {
      const keyInput = $(this).attr('id');
      const valueInput = localStorage.getItem(keyInput);
      console.log(keyInput);
      console.log(valueInput);
      $(this).children('.description').val(valueInput || ''); // This will set the textarea value to an empty string if no value is found in localStorage for a time-block
    });
  }

  // Function below will display the time at the top of the application. 
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const dateNow = dayjs().format('MMM D, YYYY A');
    const timeNow = dayjs().format('hh:mm:ss');
    dateElement.text(dateNow);
    timeElement.text(timeNow);
  }
  /*$(document).ready(function() {
    const container = $('.container-lg');
    const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17']; //24 hour time clock

    hours.forEach(hour => {
      const hourId = 

    });*/
  
  hourColor();
  saveToLocal();
  changeColor();
  newRow();
  setInterval(updateTime, 1000); 
}); // this one is for the overarching func

