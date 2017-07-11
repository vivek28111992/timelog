angular.module('TimeLogApp', ['moment-picker'])
	.controller('addProjectCrtl', ['$scope', '$location','$http', function($scope, $location, $http){
		$scope.successmsg = false;
		$scope.errormsg = false;
		$scope.items = [ { projectname: '', starttime: '', endtime: ''}];

		$scope.addProject = function (){
			var errorvalid = angular.element( document.querySelector( '#errormsg' ) );
			errorvalid.text("");
			$scope.errormsg = false;

			if ($scope.addProjectForm.$valid) {
				var projectname = $scope.items[0].projectname;
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!

				var yyyy = today.getFullYear();
				if(dd<10){
				    dd='0'+dd;
				} 
				if(mm<10){
				    mm='0'+mm;
				}

				var today = yyyy+'-'+mm+'-'+dd;
				var starttime = $scope.items[0].starttime;
				var endtime = $scope.items[0].endtime;

				function getHoursMinutes(time){
					var time = time;
					var hours = Number(time.match(/^(\d+)/)[1]);
					var minutes = Number(time.match(/:(\d+)/)[1]);
					var AMPM = time.match(/\s(.*)$/)[1];
					if(AMPM == "PM" && hours<12) hours = hours+12;
					if(AMPM == "AM" && hours==12) hours = hours-12;
					var sHours = hours.toString();
					var sMinutes = minutes.toString();
					if(hours<10) sHours = "0" + sHours;
					if(minutes<10) sMinutes = "0" + sMinutes;
					return sHours+":"+sMinutes;
				}

				var st = today+"T"+getHoursMinutes(starttime);
				var et = today+"T"+getHoursMinutes(endtime);
				var startEpoch = ((new Date(st)).getTime()) /1000;
				var endEpoch = ((new Date(et))).getTime() /1000;
				var email = "<%= userdata.email %>";
				
				//console.log(startEpoch, endEpoch);

				if(startEpoch >= endEpoch){
					//console.log("Start time cannot be greater than end time");
					var error = angular.element( document.querySelector( '#errormsg' ) );
					error.text("Start time cannot be greater than End time");
					$scope.errormsg = true;
				}
				else{
					// Post request:
					$http({
					  method: 'POST',
					  url: $location.protocol() + "://" + location.host+'/user/addprojects',
					  data: {
					  	projectname: projectname,
					  	starttime: startEpoch,
					  	endtime: endEpoch,
					  	email: email
					  }
					}).then(function successCallback(response) {
					    // this callback will be called asynchronously
					    // when the response is available
					    //console.log(response.data)
					    var successres = angular.element( document.querySelector( '#successmsg' ) );
							successres.text(response.data.message);
							$scope.items[0].projectname = null;
							$scope.items[0].starttime = null;
							$scope.items[0].endtime = null;
					    $scope.successmsg = true;
					  }, function errorCallback(response) {
					    // called asynchronously if an error occurs
					    // or server returns response with an error status.
					    var errorres = angular.element( document.querySelector( '#errormsg' ) );
							errorres.text(response.data.message);
							$scope.items[0].projectname = null;
							$scope.items[0].starttime = null;
							$scope.items[0].endtime = null;
					    $scope.errormsg = true;
					})
				}
		}
		else{
			var errorval = angular.element( document.querySelector( '#errormsg' ) );
			errorval.text("Mandatory fields are missing");
			$scope.errormsg = true;
		}
		}
	}])