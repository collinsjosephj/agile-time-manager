// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function() {
  // Function will get the current hour of the day -- referenced from the dayjs library String + Format
  // 'H' denotes a 24 hour clock to be called from the dayjs library 
  const thisHour = dayjs().format('H'); 
  //const thisHour = "14";

  // Function below toggles the ".time-block" based on the "past", "present", and "future" class relative to my thisHour variable.
  // .addClass & .removeClass didnt make conceptual sense to me here, so I found .toggleClass on https://htmlcheatsheet.com/jquery/
  function toggleHourClass() {
    $('.time-block').each(function() {
      const hourBlock = parseInt(this.id);
      //console.log("hourBlock: " + hourBlock + "thisHour dayJS: " + thisHour);
      $(this.id).toggleClass('past', hourBlock < thisHour );
      $(this.id).toggleClass('present', hourBlock == thisHour );
      $(this.id).toggleClass('future', hourBlock > thisHour );
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
      const hourBlock = (this.id);
      if (hourBlock == thisHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (hourBlock < thisHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (hourBlock > thisHour) {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  // Function will also be built to pull user input from localStorage and set the textarea values for each corresponding ".time-block"
    $('.time-block').each(function() {
      const keyInput = $(this).attr('id');
      const valueInput = localStorage.getItem(keyInput);
      //console.log(keyInput);
      //console.log(valueInput);
      $(this).children('.description').val(valueInput || ''); // This will set the textarea value to an empty string if no value is found in localStorage for a time-block
    });

  // Function below will display the time/date at the top of the application. 
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const dateNow = dayjs().format('MMM D, YYYY A');
    const timeNow = dayjs().format('hh:mm:ss');
    dateElement.text(dateNow);
    timeElement.text(timeNow);
  }

  toggleHourClass();
  saveToLocal();
  changeColor();
  updateTime();
  setInterval(updateTime, 1000); 

  });
// this one is for the overarching func


