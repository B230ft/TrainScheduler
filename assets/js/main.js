
	
	// 1. Initialize Firebase
    var config = {
        apiKey: "AIzaSyAZl9Bs6fu2qTXaqz0G43CcEy5pVoSgNyY",
        authDomain: "trainscheduler-cdcbb.firebaseapp.com",
        databaseURL: "https://trainscheduler-cdcbb.firebaseio.com",
        projectId: "trainscheduler-cdcbb",
        storageBucket: "",
        messagingSenderId: "209640736802"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

	// 2. Button for adding Trains
	$("#addTrainBtn").on("click", function(event){
        event.preventDefault();
        console.log("button clicked")
		// Grabs user input and assign to variables
		var trainName = $("#trainNameInput").val().trim();
		
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(1, "minutes").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();

		// Test for variables entered
		console.log(trainName);
		
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

        // Creates local object for holding train data
        var trains = {
            trainName: trainName,
            
            destination: destination,
            trainTimeInput: trainTimeInput,
            frequencyInput: frequencyInput
          };

          database.ref().push(trains);
          console.log(trains.trainName);
		
          console.log(trains.destination);
          console.log(trains.trainTimeInput);
          console.log(trains.frequencyInput)

		// clear text-boxes
		$("#trainNameInput").val("");
		$("#trainTimeInput").val("");
		$("#destinationInput").val("");
		
		$("#frequencyInput").val("");

		
	});

	database.ref().on("child_added", function(childSnapshot){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var firebaseName = childSnapshot.val().trainName;
		
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTimeInput;
		var firebaseFrequency = childSnapshot.val().frequencyInput;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm a"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm a"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
