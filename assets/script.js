//Display the current day at the top of the calender when a user opens the planner.
//Present timeblocks for standard business hours when the user scrolls down.
//Color-code each timeblock based on past, present, and future when the timeblock is viewed.
//Allow a user to enter an event when they click a timeblock
//Save the event in local storage when the save button is clicked in that timeblock.
//Persist events between refreshes of a page

$(document).ready(function () {
    // Display the current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
    // Generate timeblocks 
   var timeblocksContainer = $(".container");
  
    for (var i = 9; i <= 19; i++) {
      var timeblock = $("<div>")
        .addClass("row time-block")
        .attr("data-hour", i);
  
      var hourCol = $("<div>").addClass("col-1 hour").text(`${i}:00`);
      var textAreaCol = $("<textarea>").addClass("col-10 description");
  
      // Load events from local storage on page load
      var savedEvent = localStorage.getItem(`event-${i}`);
      if (savedEvent) {
        textAreaCol.val(savedEvent);
        console.log(savedEvent)
      }

    }})
