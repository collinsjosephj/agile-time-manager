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
  //const hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17'] lll

const localeSet = {};
dayjs.locale(localeSet);
// Will wait until the DOM is fully loaded before executing the function
$(function () {
// Function will get the current hour of the day -- referenced from the dayjs library String + Format
const thisHour = dayjs().format('H');
// 'H' denotes a 24 hour clock to be called from the dayjs library
// Function below toggles the ".time-block" based on the "past", "present", and "future" class relative to my thisHour variable. 
function changeColor() {
  $('.time-block').each(function() {
    const timeBlockHour = parseInt(this.id);
    $(this).toggleClass('past', timeBlockHour < thisHour );
    $(this).toggleClass('present', timeBlockHour === thisHour );
    $(this).toggleClass('future', timeBlockHour > thisHour );
  });
}
// eventLister included in bottom function to save user input to localStorage
function saveToLocal() {


}







}); // this one is for the overarching func :)

