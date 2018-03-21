$(document).ready(function () {


  console.log("i am here")

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

  //set element/vaules to store in firebase?

  var trainRef = database.ref("/trains")
  var newTrainRef = trainRef.push()

  //write function for submit button click
  $("#submitBtn").on("click", function () {
    //stop button from actually trying to submit
    event.preventDefault()
    console.log("buttonclicked")
    //grab values from user input and store in variable to be pushed to firebase
    trainName = $("#trainName").val()
    console.log(trainName)
    destination = $("#destination").val()
    console.log(destination)
    trainTime = $("#trainTime").val()
    console.log(trainTime)
    frequency = $("#frequency").val()
    console.log(frequency)
    //clear input boxes 
    $("#trainName").val()
    $("#destination").val()
    $("#trainTime").val()
    $("#frequency").val()

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
    console.log(snapshot.val())

    var trains = snapshot.val().trains;
    for (key in trains) {
      //log variables...make sure it is pulling correct info
      // console.log("key", key);
      console.log("value", trains[key]);
      console.log(trains[key].trainName)
      console.log(trains[key].destination)
      console.log(trains[key].trainTime)
      console.log(trains[key].frequency)

      //add new train input to fire base and display "snapshot value "in table
      //store info you want in firebase in variable
      trainName = trains[key].trainName
      destination = trains[key].destination
      trainTime = trains[key].trainTime
      frequency = trains[key].frequency

      //calculate next train arrival time and minutes... needs to be based on current time in current timezone? 
      //store in variable
      var timeNextTrain = 0
      var minNextTrain = 0
      //display on Dom


      //create new tr in table for each set of train data 
      //create new td for each child?
      //display snapshot of elements in each td 
      //append td to tr
      //append tr to table in html

      var newEntry = $("<tr>")
      $("#trainData").append(newEntry)

      // train name column
      var trainTd = $("<td>")
      trainTd.text(trainName)
      newEntry.append(trainTd)


      // destination column
      var destinationTd = $("<td>")
      destinationTd.text(destination)
      newEntry.append(destinationTd)

      // start time column
      var timeTd = $("<td>")
      timeTd.text(trainName)
      newEntry.append(timeTd)


      //frequency  column - not displayed... just stored
      // var frequencyTd = $("<td>")
      // frequencyTd.text(frequency)
      // newEntry.append(frequencyTd)

       //arrival minutes
       var minutesTd = $("<td>")
       minutesTd.text(minNextTrain + " mins")
       newEntry.append(minutesTd)
      
      //next Arrival time  rate column
      var timeTd = $("<td>")
      timeTd.text(timeNextTrain)
      newEntry.append(timeTd)

     


    }//closes for in statement

  })//closes display function 


})//closes document ready 