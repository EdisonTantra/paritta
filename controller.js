var parittaApp = angular.module('parittaApp' , []);


parittaApp.controller('parittaCtrl' , function($scope,$http){

	var isFinishedLoad   = false;
	$scope.paritta;
	$scope.parittaTitle  = 'Paritta';
	$scope.parittaPrev	 = '';
	$scope.parittaNext	 = '';
	$scope.parittaNumber = -1;
	$scope.parittaList   = [];

	$scope.init = function() {
		$http.get("paritta.json").success(function(response) {
			$scope.paritta 		= response.paritta;
			var number = 0;

			angular.forEach($scope.paritta, function(paritta) {
				$scope.parittaList.push({'number' : number++, 'name' : paritta.name});
			});

			isFinishedLoad = true;
		});
	} 

	$scope.update = function ($pNumber){
		if (isFinishedLoad && $pNumber >= 0 && $pNumber < $scope.paritta.length) {
			$scope.name 		= $scope.paritta[$pNumber].name;
			$scope.parittaTitle = $scope.name;
			$scope.pali 		= $scope.paritta[$pNumber].pali;
			$scope.indo 		= $scope.paritta[$pNumber].indo;

			$scope.parittaPrev	 = ($pNumber > 0 ? $scope.paritta[$pNumber - 1].name : '');
			$scope.parittaNext	 = ($pNumber < $scope.paritta.length - 1 ? $scope.paritta[$pNumber + 1].name : '');

			$scope.parittaNumber = $pNumber;	
		}
	}

	$scope.updatePrev = function ($pNumber){
		if (isFinishedLoad && $scope.parittaNumber >= 0) {		// disable navigation button when no paritta has been selected
			$pNumber -= 1;
			$scope.update($pNumber);
		}
	}

	$scope.updateNext = function ($pNumber){
		if (isFinishedLoad && $scope.parittaNumber >= 0) {		// disable navigation button when no paritta has been selected
			$pNumber += 1;
			$scope.update($pNumber);
		}
	}

	$scope.goToParitta = function($pNumber) {
		if (isFinishedLoad) {
			$('#paritta-list').addClass('hidden');
			$('#paritta').removeClass('hidden');
			$scope.update($pNumber);
		}
	}

	$scope.init();
});
