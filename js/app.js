var app = angular.module('app', ['ui.router', 'firebase']);

app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', function($stateProvider, $urlRouterProvider, $compileProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp):/);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "partials/home.html",
            controller: "HomeCtrl"
        })
        .state('newyear', {
            url: "/newyear/:name",
            templateUrl: "partials/newyear.html",
            controller: "NewYearCtrl"
        })
        .state('pongal', {
            url: "/pongal/:name",
            templateUrl: "partials/pongal.html",
            controller: "PongalCtrl"
        })
        .state('bday', {
            url: "/bday/:name/:toname",
            templateUrl: "partials/birthday.html",
            controller: "BdayCtrl"
        })
        .state('love', {
            url: "/love/:name/:toname",
            templateUrl: "partials/love.html",
            controller: "LoveCtrl"
        })
}]);

app.controller('BdayCtrl', ['$scope', '$stateParams', '$firebaseArray', function($scope, $stateParams, $firebaseArray) {
    // var audio = new Audio('https://tltapp.github.io/wishes/tune/newyear.mp3');
    // audio.play();

    var api = new Firebase("https://tlt-apps.firebaseio.com/wishes/share/");
    var fb = $firebaseArray(api);

    $scope.wishes = {
        'name': $stateParams.name,
        'toname': $stateParams.toname,
        'event': 'Happy Birth Day',
        'wishing': 'I wish you a',
        'quotes': 'On your special day, I wish you good luck. I hope this wonderful day will fill up your heart with joy and blessings. Have a fantastic birthday, celebrate the happiness on every day of your life.'
    };

    $scope.share = {
        whatsapp: 'whatsapp://send?text=Hey, %2A' + $stateParams.toname + '%2A. Happy Birthday to you: https://tltapp.github.io/wishes/%23%21/bday/' + $stateParams.name + '/' + $stateParams.toname
    };

    $scope.shareOnWhatsapp = function() {
        fb.$add({
            share: "whatsapp",
            event: "birthday",
            name: $stateParams.name,
            toname: $stateParams.toname
        });
    }
}]);

app.controller('HomeCtrl', ['$scope', '$state', '$firebaseArray', function($scope, $state, $firebaseArray) {
    var api = new Firebase("https://tlt-apps.firebaseio.com/wishes/users/");
    var fb = $firebaseArray(api);

    $scope.title = "Send your wishes";

    $scope.events = ['birthday', 'love', 'newyear', 'pongal'];
    $scope.wishes = {
        event: $scope.events[3]
    };
    $scope.create = function(res) {
        if (res.name == null || res.name == undefined || res.name == "") {
            $scope.validateFlag = true;
        } else {
            if (res.event == "newyear" && res) {
                $state.go("newyear", { name: res.name });
                fb.$add({
                    name: res.name,
                    event: res.event,
                    created: Firebase.ServerValue.TIMESTAMP
                });
            } else if (res.event == "pongal") {
                $state.go("pongal", { name: res.name });
                fb.$add({
                    name: res.name,
                    event: res.event,
                    created: Firebase.ServerValue.TIMESTAMP
                });
            } else if (res.event == "birthday") {
                $state.go("bday", { name: res.name, toname: res.toname });
                fb.$add({
                    name: res.name,
                    toname: res.toname,
                    event: res.event,
                    created: Firebase.ServerValue.TIMESTAMP
                });
            } else if (res.event == "love") {
                $state.go("love", { name: res.name, toname: res.toname });
                fb.$add({
                    name: res.name,
                    toname: res.toname,
                    event: res.event,
                    created: Firebase.ServerValue.TIMESTAMP
                });
            }
        }

    }
}]);

app.controller('LoveCtrl', ['$scope', '$stateParams', '$firebaseArray', function($scope, $stateParams, $firebaseArray) {
    var api = new Firebase("https://tlt-apps.firebaseio.com/wishes/share/");
    var fb = $firebaseArray(api);

    $scope.wishes = {
        'name': $stateParams.name,
        'toname': $stateParams.toname,
        'quotes': 'That’s what it feels like when you touch me. Like millions of tiny universes being born and then dying in the space between your finger and my skin. Sometimes I forget.'
    };

    $scope.share = {
        whatsapp: 'whatsapp://send?text=Hey Honey, I Love You. Just felt to tell you.: https://tltapp.github.io/wishes/%23%21/love/' + $stateParams.name + '/' + $stateParams.toname
    };

    $scope.shareOnWhatsapp = function() {
        fb.$add({
            share: "whatsapp",
            event: "love",
            name: $stateParams.name,
            toname: $stateParams.toname
        });
    }
}]);

app.controller('NewYearCtrl', ['$scope', '$stateParams', '$firebaseArray', '$location', function($scope, $stateParams, $firebaseArray, $location) {
    // var audio = new Audio('https://tltapp.github.io/wishes/tune/newyear.mp3');
    // audio.play();

    var api = new Firebase("https://tlt-apps.firebaseio.com/wishes/share/");
    var fb = $firebaseArray(api);

    $scope.wishes = {
        'name': $stateParams.name,
        'event': "Happy New Year",
        'wishing': "wishes you and your family a",
        'quotes': 'Even though life presented to you various obstacles and hurdles, be proud that you managed to overcome all and cross the bridge to another new year. May you continue to be this firm and win over all shortcomings!'
    };

    $scope.share = {
        whatsapp: 'whatsapp://send?text=%2ANew Year Wishes%2A from %2A' + $stateParams.name + '%2A: https://tltapp.github.io/wishes/%23%21/newyear/' + $stateParams.name
    };

    console.log('//////////' + $location.path());
    console.log('##############' + $location.href());

    $scope.shareOnWhatsapp = function() {
        fb.$add({
            share: "whatsapp",
            event: "newyear",
            name: $stateParams.name
        });
    };
}]);

app.controller('PongalCtrl', ['$scope', '$stateParams', '$firebaseArray', function($scope, $stateParams, $firebaseArray) {
    // var audio = new Audio('https://tltapp.github.io/wishes/tune/pongal.mp3');
    // audio.play();

    var api = new Firebase("https://tlt-apps.firebaseio.com/wishes/share/");
    var fb = $firebaseArray(api);

    $scope.wishes = {
        'name': $stateParams.name,
        'event': 'Happy Pongal',
        'wishing': 'wishes you and your family a',
        'quotes': 'As you joyfully celebrate the festival of Pongal and welcome the harvest season, this greeting is being sent your way, to wish you everything, that the occasion is meant to bring. Pongalo Pongal!'
    };

    $scope.share = {
        whatsapp: 'whatsapp://send?text=%2AAdvanced Pongal Wishes%2A from %2A' + $stateParams.name + '%2A: https://tltapp.github.io/wishes/%23%21/pongal/' + $stateParams.name
    };

    $scope.shareOnWhatsapp = function() {
        fb.$add({
            share: "whatsapp",
            event: "pongal",
            name: $stateParams.name
        });
    }
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

    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);

    function init() {
        time = 0;
        count = 0;

        for (var i = 0; i < arc; i++) {
            lights[i] = {
                x: Math.ceil(Math.random() * w),
                y: Math.ceil(Math.random() * h),
                toX: Math.random() * 5 + 1,
                toY: Math.random() * 5 + 1,
                c: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * size
            }
        }
    }

    function bubble() {
        ctx.clearRect(0, 0, w, h);

        for (var i = 0; i < arc; i++) {
            var li = lights[i];

            ctx.beginPath();
            ctx.arc(li.x, li.y, li.size, 0, Math.PI * 2, false);
            ctx.fillStyle = li.c;
            ctx.fill();

            li.x = li.x + li.toX * (time * 0.05);
            li.y = li.y + li.toY * (time * 0.05);

            if (li.x > w) { li.x = 0; }
            if (li.y > h) { li.y = 0; }
            if (li.x < 0) { li.x = w; }
            if (li.y < 0) { li.y = h; }
        }
        if (time < speed) {
            time++;
        }
        timerID = setTimeout(bubble, 1000 / rate);
    }
    init();
    bubble();
}

document.addEventListener("DOMContentLoaded", init1, false);
