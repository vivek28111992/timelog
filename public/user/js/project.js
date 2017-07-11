angular.module('TimeLogApp', ['moment-picker'])
	.controller('addProjectCrtl', ['$scope', '$location','$http', function($scope, $location, $http){
		$scope.successmsg = false;
		$scope.errormsg = false;
		var arr = [];
		//get request
		$http({
		  method: 'GET',
		  url: $location.protocol() + "://" + location.host+'/user/getprojectdetails',
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    var resData = response.data.message;
		    for (var i = 0; i < resData.length; i++) {
		    	var obj = {};
			    angular.forEach(response.data.message[i], function(value, key) {
					  if(key == 'starttime' || key == 'endtime'){
					  	var getDateTime = gettime(value);
					  	var getTime = getDateTime[0];
					  	var getDate = getDateTime[1];
					  	obj[(key == 'starttime')? 'starttime':'endtime'] = getTime;
					  	obj['date'] = getDate;
					  }
					  else if(key == 'name'){
					  	obj['name'] = value;
					  }
					  else{
					  	obj['id'] = value;
					  }
					  obj['todaydate'] = getTodayDate();
					  obj['sid'] = i;
					}, arr);
					arr.push(obj);
		    }
				$scope.items = arr;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		})

		var gettime =  function (time){
			var time = time * 1000;
			var dateVal ="/Date("+time+")/";
			var date = new Date( parseFloat( dateVal.substr(6 )));
			var restime = date.getHours() + ":" + date.getMinutes();
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
			var yyyy = date.getFullYear();

			if(dd<10) {
			    dd = '0'+dd;
			} 

			if(mm<10) {
			    mm = '0'+mm;
			}
			var resdate = yyyy + "-" + mm + "-" + dd;
			return [restime, resdate];
		}

		var getTodayDate = function(){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd = '0'+dd
			} 

			if(mm<10) {
			    mm = '0'+mm
			} 

			today = yyyy + '-' + mm + '-' + dd;
			return today;
		}

		$scope.editProject = function (rowvalue){
			var errorvalid = angular.element( document.querySelector( '#errormsg' ) );
			errorvalid.text("");
			$scope.errormsg = false;
			var rowid = rowvalue;
			if ($scope.viewProjectForm.$valid) {
				var projectname = $scope.items[rowid].name;

				var today = getTodayDate();
				var starttime = $scope.items[rowid].starttime;
				var endtime = $scope.items[rowid].endtime;

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
				var projectid = $scope.items[rowid].id;

				if(startEpoch >= endEpoch){
					console.log("Start time cannot be greater than end time");
					var error = angular.element( document.querySelector( '#errormsg' ) );
					error.text("Start time cannot be greater than End time");
					$scope.errormsg = true;
				}
				else{
					// Post request:
					$http({
					  method: 'POST',
					  url: $location.protocol() + "://" + location.host+'/user/updateproject',
					  data: {
					  	projectname: projectname,
					  	starttime: startEpoch,
					  	endtime: endEpoch,
					  	projectid: projectid
					  }
					}).then(function successCallback(response) {
					    // this callback will be called asynchronously
					    // when the response is available
					    //console.log(response.data)
					    var successres = angular.element( document.querySelector( '#successmsg' ) );
							successres.text(response.data.message);
					    $scope.successmsg = true;
					  }, function errorCallback(response) {
					    // called asynchronously if an error occurs
					    // or server returns response with an error status.
					    var errorres = angular.element( document.querySelector( '#errormsg' ) );
							errorres.text(response.data.message);
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