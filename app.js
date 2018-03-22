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

  //set variable to keep track of row entry number
  var rowNum = 0


  //set element/vaules to store in firebase?

  var trainRef = database.ref("/trains")
  var newTrainRef = trainRef.push()

  //set var to store math/ train time data
  //calculate next train arrival time and minutes... needs to be based on current time in current timezone? 
  //store in variable
  //get current time


  //write function for submit button click
  $("#submitBtn").on("click", function () {
    //stop button from actually trying to submit
    event.preventDefault()
    //increase rowNum var
    rowNum++

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

    // Alert user train was added succesfully?
    // alert("");

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
    //increase rowNum var
    // rowNum++
    var trains = snapshot.val().trains;
    for (key in trains) {
      //add new train input to fire base and display "snapshot value "in table
      //store info you want in firebase in variable
      trainName = trains[key].trainName
      destination = trains[key].destination
      trainTime = trains[key].trainTime
      frequency = trains[key].frequency
      console.log("name " + trainName)
      console.log("start time " + trainTime)

      // //convert trainTime 
      // var trainTimeconv = moment(trainTime, "HH:mm");
      // console.log((trainTimeconv).format("HH:mm"))

      var currentTime = moment();
      console.log("CURRENT TIME: " + currentTime.format("HH:mm"));

      // // Difference between the times
      var diffTime = moment().diff(moment(trainTime, "HH:mm"), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      var remainder = Math.abs(diffTime) % parseInt(frequency);


      var minNextTrain = parseInt(frequency) - remainder
      console.log("MINUTES TILL TRAIN: " + minNextTrain);

      var timeNextTrain = moment(currentTime, "HH:mm").add(minNextTrain, "minutes").format("HH:mm");
      //.add(minNextTrain, "minutes").format("HH:mm")


      //create new tr in table for each set of train data 
      //create new td for each item
      //display snapshot var in each td 
      //append td to tr
      //append tr to table in html

      var newEntry = $("<tr>")
      newEntry.addClass("entry")
      newEntry.attr("id", "entryNum" + rowNum);
      $("#trainData").append(newEntry)

      // train name column
      var trainTd = $("<td>")
      trainTd.text(trainName)
      newEntry.append(trainTd)

      // destination column
      var destinationTd = $("<td>")
      destinationTd.text(destination)
      newEntry.append(destinationTd)

      // start time column- not displayed just shown

      //frequency  column -
      var frequencyTd = $("<td>")
      frequencyTd.text(frequency)
      newEntry.append(frequencyTd)

      //arrival minutes
      var minutesTd = $("<td>")
      minutesTd.text(minNextTrain + " mins")
      newEntry.append(minutesTd)

      //next Arrival time  rate column
      var timeTd = $("<td>")
      timeTd.text(timeNextTrain)
      newEntry.append(timeTd)

      //add remove button to each row 
      var removeBtn = $("<button>")
      var btnTd = $("<td>")
      removeBtn.addClass("btn btn-dark text-light pt-0 pb-0 remove")
      removeBtn.attr("id", "remove")
      removeBtn.text("x")
      btnTd.append(removeBtn)
      newEntry.append(btnTd)

    }//closes for in statement

  })//closes display function 

  //remove train on button click function 
  $(".table").on("click", ".remove", function () {
    console.log("delete me")
    $(".entry").remove()

  });

})//closes document ready 