var parittaApp = angular.module('parittaApp' , []);


parittaApp.controller('parittaCtrl' , function($scope,$http){

	$scope.parittaList =[{'number' : 1 , 'nama' : 'Vandana' },
						{'number' : 2 ,'nama' :'Tisarana'},
						{'number' : 3 , 'nama' : 'Pancasila' },
						{'number' : 4 ,'nama' :''}];
	$scope.parittaNumber = 1;

	$scope.update = function ($pNumber){
		$http.get("paritta.json").success(function(response) {
			$scope.nama = response.paritta[$pNumber].nama;
			$scope.pali = response.paritta[$pNumber].pali;
			$scope.indo = response.paritta[$pNumber].indo;

			$scope.parittaNumber = $pNumber;
		});
	}

	$scope.updatePrev = function ($pNumber){
		$pNumber -= 1;
		$scope.update($pNumber);
	}

	$scope.updateNext = function ($pNumber){
		$pNumber += 1;
		
		$scope.update($pNumber);
	}

	$scope.goToParitta = function($pNumber) {
		$('#paritta-list').addClass('hidden');
		$('#paritta').removeClass('hidden');

		$scope.update($pNumber);
	}

	$http.get("paritta.json").success(function(response) {
		$scope.nama = response.paritta[$pNumber].nama;
		$scope.pali = response.paritta[$pNumber].pali;
		$scope.indo = response.paritta[$pNumber].indo;

		$scope.parittaNumber = $pNumber;
	});
});
