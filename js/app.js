var app = angular.module('app', ['ui.router', 'ngMeta', 'firebase']);

app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', 'ngMetaProvider', function($stateProvider, $urlRouterProvider, $compileProvider, ngMetaProvider) {

    // $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp):/);
    // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp|https?|ftp|mailto|chrome-extension):/);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('create', {
            url: "/create",
            templateUrl: "partials/home.html",
            controller: "HomeCtrl"
        })
        .state('about', {
            url: "/",
            templateUrl: "partials/about.html"
        })
        .state('newyear', {
            url: "/newyear/:adv/:from/:to",
            templateUrl: "partials/newyear.html",
            controller: "NewYearCtrl",
            data: {
                meta: {
                    'og:title': 'Home page',
                    'og:description': 'This is the description shown in Google search results'
                }
            }
        })
        .state('pongal', {
            url: "/pongal/:adv/:from/:to",
            templateUrl: "partials/pongal.html",
            controller: "PongalCtrl"
        })
        .state('bday', {
            url: "/bday/:adv/:from/:to",
            templateUrl: "partials/birthday.html",
            controller: "BdayCtrl"
        })
        .state('valentine', {
            url: "/valentine/:adv/:from/:to",
            templateUrl: "partials/valentine.html",
            controller: "ValentineCtrl"
        })
}]);
app.run(['ngMeta', function(ngMeta) {
    ngMeta.init();
}]);

function init1() {
  var w = window.innerWidth,
    h = window.innerHeight,
    canvas = document.getElementById('snow'),
    ctx = canvas.getContext('2d'),
    rate = 50,
    arc = 500,
    time,
    count,
    size = 2,
    speed = 10,
    lights = new Array,
    colors = ['#eee'];

canvas.setAttribute('width',w);
canvas.setAttribute('height',h);

function init() {
  time = 0;
  count = 0;

  for(var i = 0; i < arc; i++) {
    lights[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      toX: Math.random() * 5 + 1,
      toY: Math.random() * 5 + 1,
      c: colors[Math.floor(Math.random()*colors.length)],
      size: Math.random() * size
    }
  }
}

function bubble() {
  ctx.clearRect(0,0,w,h);

  for(var i = 0; i < arc; i++) {
    var li = lights[i];

    ctx.beginPath();
    ctx.arc(li.x,li.y,li.size,0,Math.PI*2,false);
    ctx.fillStyle = li.c;
    ctx.fill();

    li.x = li.x + li.toX * (time * 0.05);
    li.y = li.y + li.toY * (time * 0.05);

    if(li.x > w) { li.x = 0; }
    if(li.y > h) { li.y = 0; }
    if(li.x < 0) { li.x = w; }
    if(li.y < 0) { li.y = h; }
  }
  if(time < speed) {
    time++;
  }
  timerID = setTimeout(bubble,1000/rate);
}
init();
bubble();
}

document.addEventListener("DOMContentLoaded", init1, false);
app.controller('BdayCtrl', ['$scope', '$rootScope', '$location', '$stateParams', function($scope, $rootScope, $location, $stateParams) {
    $rootScope.wishes = {
        from: $stateParams.from,
        to: $stateParams.to,
        adv: $stateParams.adv,
        event: 'Happy Birth Day',
        wishing: 'Wishing you a',
        quotes: 'On your special day, I wish you good luck. I hope this wonderful day will fill up your heart with joy and blessings. Have a fantastic birthday, celebrate the happiness on every day of your life.',
        metaOgImage: 'http://updatepedia.com/wp-content/uploads/2016/02/22-happy-birthday-greetings-card.preview-1.jpg',
        metaOgUrl: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };

    if ($stateParams.adv == 1) {
        $scope.txtAdvance = "Advance ";
    } else {
        $scope.txtAdvance = "";
    }

    $scope.share = {
        whatsapp: 'whatsapp://send?text=Hey, %2A' + $stateParams.to + '%2A. Wish you a ' + $scope.txtAdvance + '%2AHappy Birthday%2A.: https://tltapp.github.io/wishes/%23%21' + $location.path(),
        facebook: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };

}]);

app.controller('HomeCtrl', ['$scope', '$state', '$firebaseArray', function($scope, $state, $firebaseArray) {
    var api = new Firebase("https://tlt-apps.firebaseio.com/wishes/users/");
    var fb = $firebaseArray(api);

    $scope.wishes = {
        adv: 0,
        event: 'pongal'
    };

    $scope.create = function(res) {
        if (res.event == "newyear") {
            $state.go("newyear", { adv: res.adv, from: res.from, to: res.to });
            fb.$add({
                from: res.from,
                to: res.to,
                adv: res.adv,
                event: res.event,
                created: Firebase.ServerValue.TIMESTAMP
            });
        } else if (res.event == "pongal") {
            $state.go("pongal", { adv: res.adv, from: res.from, to: res.to });
            fb.$add({
                from: res.from,
                to: res.to,
                adv: res.adv,
                event: res.event,
                created: Firebase.ServerValue.TIMESTAMP
            });
        } else if (res.event == "birthday") {
            $state.go("bday", { adv: res.adv, from: res.from, to: res.to });
            fb.$add({
                from: res.from,
                to: res.to,
                adv: res.adv,
                event: res.event,
                created: Firebase.ServerValue.TIMESTAMP
            });
        } else if (res.event == "valentine") {
            $state.go("valentine", { adv: res.adv, from: res.from, to: res.to });
            fb.$add({
                from: res.from,
                to: res.to,
                adv: res.adv,
                event: res.event,
                created: Firebase.ServerValue.TIMESTAMP
            });
        }
    };
}]);

app.controller('LoveCtrl', ['$scope', '$rootScope', '$location', '$stateParams', function($scope, $rootScope, $location, $stateParams) {
    $rootScope.wishes = {
        from: $stateParams.from,
        to: $stateParams.to,
        quotes: 'That’s what it feels like when you touch me. Like millions of tiny universes being born and then dying in the space between your finger and my skin. Sometimes I forget.'
    };

    $scope.share = {
        whatsapp: 'whatsapp://send?text=Hey, %2A' + $stateParams.to + '%2A. I Love Your%2A.: https://tltapp.github.io/wishes/%23%21' + $location.path(),
        facebook: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };
}]);

app.controller('NewYearCtrl', ['$scope', '$rootScope', '$location', '$stateParams', function($scope, $rootScope, $location, $stateParams) {
    $rootScope.wishes = {
        from: $stateParams.from,
        to: $stateParams.to,
        adv: $stateParams.adv,
        event: "Happy New Year",
        wishing: "wishing you and your family a",
        quotes: 'Even though life presented to you various obstacles and hurdles, be proud that you managed to overcome all and cross the bridge to another new year. May you continue to be this firm and win over all shortcomings!',
        metaOgImage: 'http://321happynewyear.com/wp-content/uploads/2016/11/Happy-New-Year-Images-1.jpg',
        metaOgUrl: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };

    if ($stateParams.adv == 1) {
        $scope.txtAdvance = "Advance ";
    } else {
        $scope.txtAdvance = "";
    }

    $scope.share = {
        whatsapp: 'whatsapp://send?text=Hey, %2A' + $stateParams.to + '%2A. Wish you a ' + $scope.txtAdvance + '%2AHappy New Year%2A.: https://tltapp.github.io/wishes/%23%21' + $location.path(),
        facebook: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };
}]);

app.controller('PongalCtrl', ['$scope', '$rootScope', '$location', '$stateParams', function($scope, $rootScope, $location, $stateParams) {
    $rootScope.wishes = {
        from: $stateParams.from,
        to: $stateParams.to,
        adv: $stateParams.adv,
        event: 'Happy Pongal',
        wishing: 'wishing you and your family a',
        quotes: 'As you joyfully celebrate the festival of Pongal and welcome the harvest season, this greeting is being sent your way, to wish you everything, that the occasion is meant to bring. Pongalo Pongal!',
        metaOgImage: 'http://www.techicy.com/wp-content/uploads/2016/01/Happy-Pongal-Wallpapers-3.jpg',
        metaOgUrl: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };

    if ($stateParams.adv == 1) {
        $scope.txtAdvance = "Advance ";
    } else {
        $scope.txtAdvance = "";
    }

    $scope.share = {
        whatsapp: 'whatsapp://send?text=Hey, %2A' + $stateParams.to + '%2A. Wish you a ' + $scope.txtAdvance + '%2AHappy Pongal%2A.: https://tltapp.github.io/wishes/%23%21' + $location.path(),
        facebook: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };
}]);

app.controller('ValentineCtrl', ['$scope', '$rootScope', '$location', '$stateParams', function($scope, $rootScope, $location, $stateParams) {
    $rootScope.wishes = {
        from: $stateParams.from,
        to: $stateParams.to,
        adv: $stateParams.adv,
        event: 'Happy Valentines Day',
        wishing: 'wishing you a',
        quotes: 'That’s what it feels like when you touch me. Like millions of tiny universes being born and then dying in the space between your finger and my skin. Sometimes I forget.',
        metaOgImage: 'https://valentinesdaywishes.org/wp-content/uploads/2016/01/happy-valentines-day-hd-wallpapers.jpg',
        metaOgUrl: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };

    if ($stateParams.adv == 1) {
        $scope.txtAdvance = "Advance ";
    } else {
        $scope.txtAdvance = "";
    }

    $scope.share = {
        whatsapp: 'whatsapp://send?text=Hey, %2A' + $stateParams.to + '%2A.Wish you a ' + $scope.txtAdvance + '%2AHappy Valentines Day%2A.: https://tltapp.github.io/wishes/%23%21' + $location.path(),
        facebook: 'https://tltapp.github.io/wishes/%23%21' + $location.path()
    };
}]);

app.directive('restrictField', function() {
    return {
        restrict: 'AE',
        scope: {
            restrictField: '='
        },
        link: function(scope) {
            var noNum = /\d/g;
            var noSpace = /\s/g;
            var noSpecChar = /\W/g;

            scope.$watch('restrictField', function(newValue, oldValue) {
                if (newValue != oldValue && noSpace.test(newValue)) {
                    scope.restrictField = newValue.replace(noSpace, '');
                }
                if (newValue != oldValue && noNum.test(newValue)) {
                    scope.restrictField = newValue.replace(noNum, '');
                }
                if (newValue != oldValue && noSpecChar.test(newValue)) {
                    scope.restrictField = newValue.replace(noSpecChar, '');
                }
            });
        }
    };
});
