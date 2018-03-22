$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdq7ZChhmgsNz6DcFLI9rkRtTJcKPICPI",
    authDomain: "traindata-6f8de.firebaseapp.com",
    databaseURL: "https://traindata-6f8de.firebaseio.com",
    projectId: "traindata-6f8de",
    storageBucket: "traindata-6f8de.appspot.com",
    messagingSenderId: "129156198385"
  };
  firebase.initializeApp(config);

  //set database variable
  var database = firebase.database()

  //set initial variables needed
  var trainName = ""
  var destination = ""
  var trainTime = 0
  var frequency = 0

  //set variable to keep track of row entry number- used for delete function 
  var rowCount = 0

  //set element/vaules to store in firebase?
  var trainRef = database.ref("/trains")
  var newTrainRef = trainRef.push()

  //write function for submit button click
  $("#submitBtn").on("click", function () {
    //stop button from actually trying to submit
    event.preventDefault()

    //grab values from user input and store in variable to be pushed to firebase
    trainName = $("#trainName").val()
    destination = $("#destination").val()
    trainTime = $("#trainTime").val()
    frequency = $("#frequency").val()

    //clear input boxes 
    $("#trainName").val("")
    $("#destination").val("")
    $("#trainTime").val("")
    $("#frequency").val("")

    //create child:values and store data in firebase? 
    newTrainRef.set({
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency

    })
  })//closes submit button click

  database.ref().on("value", function (snapshot) {
    $("#trainData").empty()
    //store snapshot in variable
    var trains = snapshot.val().trains;
    for (key in trains) {
      //increase rowCount var
      rowCount++
      //add new train input to fire base and display "snapshot value "in table
      //store info you want in firebase in variable
      trainName = trains[key].trainName
      destination = trains[key].destination
      trainTime = trains[key].trainTime
      frequency = trains[key].frequency

      //moment js time stuff
      //store current time in variable
      var currentTime = moment();

      // // Difference between the times
      var diffTime = moment().diff(moment(trainTime, "HH:mm"), "minutes");

      //calculate remainer to determine minutes
      var remainder = Math.abs(diffTime) % parseInt(frequency);

      //calculate minutes untill next train 
      var minNextTrain = parseInt(frequency) - remainder

      //caluclate the time next train arrives 
      var timeNextTrain = moment(currentTime, "HH:mm").add(minNextTrain, "minutes").format("HH:mm");
      
      //create new tr in table for each set of train data 
      var newEntry = $("<tr>")
      //give id to be used in delete function 
      newEntry.attr("id", "entry"+ rowCount)
      newEntry.addClass("text-center")
      //append tr to table in html
      $("#trainData").append(newEntry)

      //create new column for each item
      //display snapshot var in each td 
      //append td to tr

      // train name column
      var trainTd = $("<td>")
      trainTd.text(trainName)
      newEntry.append(trainTd)

      // destination column
      var destinationTd = $("<td>")
      destinationTd.text(destination)
      newEntry.append(destinationTd)

      // start time column- not displayed just store the data

      //frequency  column -
      var frequencyTd = $("<td>")
      frequencyTd.text("Every " +frequency+ " mins")
      newEntry.append(frequencyTd)

      //arrival minutes column
      var minutesTd = $("<td>")
      minutesTd.text(minNextTrain + " mins")
      newEntry.append(minutesTd)

      //next Arrival time  rate column
      var timeTd = $("<td>")
      timeTd.text(timeNextTrain)
      newEntry.append(timeTd)

      //create remove button store in var
      var removeBtn = $("<button>")
      //create column to hold remove button
      var btnTd = $("<td>")
      //style button
      removeBtn.addClass("btn text-light pt-0 pb-0 remove")
      removeBtn.text("x")
      //add attribute to be used for delete function 
      removeBtn.attr("rowNumber", rowCount);
      btnTd.append(removeBtn)
      newEntry.append(btnTd)

    }//closes for in statement

  })//closes display function 

  //remove train row on button click  
  $(".table").on("click", ".remove", function () {
    var rowNum = $(this).attr("rowNumber")
    $("#entry" + rowNum).remove()
  });

})//closes document ready 