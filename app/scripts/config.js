"use strict";

 angular.module('config', [])

.constant('package', {name:'r360demo',private:true,devDependencies:{grunt:'^0.4.5','grunt-angular-templates':'^0.5.7','grunt-autoprefixer':'^2.0.0','grunt-concurrent':'^1.0.0','grunt-contrib-clean':'^0.6.0','grunt-contrib-compass':'^1.0.0','grunt-contrib-concat':'^0.5.0','grunt-contrib-connect':'^0.9.0','grunt-contrib-copy':'^0.7.0','grunt-contrib-cssmin':'^0.12.0','grunt-contrib-htmlmin':'^0.4.0','grunt-contrib-imagemin':'^1.0.0','grunt-contrib-jshint':'^0.11.0','grunt-contrib-uglify':'^0.7.0','grunt-contrib-watch':'^0.6.1','grunt-filerev':'^2.1.2','grunt-ftp-deploy':'0.1.10','grunt-google-cdn':'^0.4.3','grunt-karma':'*','grunt-keycdn':'0.0.4','grunt-newer':'^1.1.0','grunt-ng-annotate':'^0.9.2','grunt-ng-constant':'^2.0.1','grunt-remove-logging':'^0.2.0','grunt-svgmin':'^2.0.0','grunt-usemin':'^3.0.0','grunt-wiredep':'^2.0.0','jit-grunt':'^0.9.1','jshint-stylish':'^1.0.0','karma-jasmine':'*','karma-phantomjs-launcher':'*','time-grunt':'^1.0.0'},engines:{node:'>=0.10.0'},scripts:{test:'grunt test'},dependencies:{'grunt-ng-constant':'^2.0.1'}})

.constant('ENV', {name:'development',serviceKey:'uhWrWpUhyZQy8rPfiC7X',endpoints:{germany:'https://service.route360.net/germany/',australia:'https://service.route360.net/australia/',norway:'https://service.route360.net/norway/',france:'https://service.route360.net/france/',britishcolumbia:'https://service.route360.net/britishcolumbia/',denmark:'https://service.route360.net/denmark/',britishisles:'https://service.route360.net/britishisles/',switzerland:'https://service.route360.net/switzerland/',austria:'https://service.route360.net/austria/',newyork:'https://service.route360.net/na_northeast/',italy:'https://service.route360.net/italy/',spain:'https://service.route360.net/iberia/',portugal:'https://service.route360.net/iberia/',czech_republic:'https://service.route360.net/czech_republic/',south_america:'https://service.route360.net/south_america/',sweden:'https://service.route360.net/sweden/',malaysia_singapore:'https://service.route360.net/malaysia_singapore/',geocoder:'https://service.route360.net/geocode/'}})

;