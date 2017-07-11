
angular.module('TimeLogApp', ['moment-picker'])
	.controller('addProjectCrtl', ['$scope', '$location','$http', function($scope, $location, $http){
		$scope.successmsg = false;
		$scope.errormsg = false;
		$scope.update = function() {
		  var email = $scope.selectedItem;
		  if(email != ""){
		    var arr = [];
				//get request
				$http({
				  method: 'GET',
				  url: '/admin/getprojectdetails?email='+email
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
		  } 
		}

		//get request
		$http({
		  method: 'GET',
		  url: '/admin/getallusers',
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    var resData = response.data.message;
		    var userArr = []
		    userArr.push({"first_name": "Select a user", "email":""})
		    for (var i = 0; i < resData.length; i++) {
		    	var userObj = {};
			    angular.forEach(response.data.message[i], function(value, key) {
			    	if(key != '$$hashKey'){
					  	userObj[key] = value;
					  	userObj['sid'] = i;
						}
					}, userArr);
					userArr.push(userObj);
		    }
				$scope.users = userArr;
		    //console.log('scope '+JSON.stringify($scope.users))
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
	}])