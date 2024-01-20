//Display the current day at the top of the calender when a user opens the planner.
//Present timeblocks for standard business hours when the user scrolls down.
//Color-code each timeblock based on past, present, and future when the timeblock is viewed.
//Allow a user to enter an event when they click a timeblock
//Save the event in local storage when the save button is clicked in that timeblock.
//Persist events between refreshes of a page

// Use a flag to check if the script has already run
var scriptExecuted = false;

// Use a flag to check if the script has already run
var scriptExecuted = false;

// Check if the script has already run
if (!scriptExecuted) {
    $(document).ready(function () {
        // Set the flag to true to indicate that the script has been executed
        scriptExecuted = true;

        // Display the current day
        $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

        // Generate timeblocks 
        var timeblocksContainer = $(".container");

        // Clear existing content inside the container
        timeblocksContainer.empty();

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
            }

            var saveBtnCol = $("<button>")
                .addClass("col-1 saveBtn")
                .html('<i class="fas fa-save"></i>');
            
            var doneBtnCol = $("<button>")
                .addClass("col-1 doneBtn")
                .text("Done");

            timeblock.append(hourCol, textAreaCol, saveBtnCol, doneBtnCol);
            timeblocksContainer.append(timeblock);

            // Color-code timeblocks based on whether they are before, at, or after the present time
            updateColors(timeblock, i);
        }

        // Attach event listener to save buttons for entering events
        $(".saveBtn").on("click", function () {
            var hour = $(this).parent().attr("data-hour");
            var eventText = $(this).siblings(".description").val();
            // Save the event in local storage
            localStorage.setItem(`event-${hour}`, eventText);
            // Update colors after saving event
            updateColors($(this).parent(), hour);
        });

        // Attach event listener to completed buttons for clearing textarea content
        $(".doneBtn").on("click", function () {
          $(this).siblings(".description").val("");
          var hour = $(this).parent().attr("data-hour");
          // Clear the event in local storage
          localStorage.setItem(`event-${hour}`, "");
      });

        // Set colors based on the information stored in local storage
        for (var i = 9; i <= 19; i++) {
            updateColors($(`[data-hour=${i}]`), i);
        }

        // Update time every 60 minutes
        setInterval(function () {
            $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
            for (var i = 9; i <= 19; i++) {
                updateColors($(`[data-hour=${i}]`), i);
            }
        }, 60 * 60 * 1000);

        function updateColors(timeblock, hour) {
          var currentHour = dayjs().hour();
      
          if (hour < currentHour) {
              timeblock.removeClass("present future").addClass("past").css(".past");
              // Save the color information to local storage
              localStorage.setItem(`color-${hour}`, "past");
          } else if (hour === currentHour) {
              timeblock.removeClass("past future").addClass("present");
              // Save the color information to local storage
              localStorage.setItem(`color-${hour}`, "present");
          } else {
              timeblock.removeClass("past present").addClass("future");
              // Save the color information to local storage
              localStorage.setItem(`color-${hour}`, "future");
          }
      }
       
    });
}
