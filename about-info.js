'use strict';

var highScores;
var sortedHighScores;
var arrayOfScores;
var scoreStrings = ['high_score_easy','high_score_med','high_score_hard'];

//this might not have needed to be a function. Since it's only used once
//and it's a relatively simple operation.
function getScores() {
  var arrayString;
  arrayString = localStorage.getItem('high_score_array');
  return JSON.parse(arrayString);
};
//this function is only used once and is effectively calling the sort method
//on an array once. You could just call sort on the array below.
function objectSort(array) {
  var sorted;
  sorted = array.sort(function(a, b) {
    return a.score - b.score;
  });
  return sorted;
};

//nice!
function distributeObjects(objectArray) {
  var sortedHighScoresEasy = [];
  var sortedHighScoresMed = [];
  var sortedHighScoresHard = [];
  for (var j = 0; j < objectArray.length; j++){
    if (objectArray[j].level === 'easy'){
      sortedHighScoresEasy.push(objectArray[j]);
    } else if (objectArray[j].level === 'medium') {
      sortedHighScoresMed.push(objectArray[j]);
    } else {
      sortedHighScoresHard.push(objectArray[j]);
    };
  };
  return [sortedHighScoresEasy, sortedHighScoresMed, sortedHighScoresHard];
};

function buildHighScore(array, string) {
  var scoreList = document.getElementById(string);
  var li;
  var loopVariable = array.length < 5 ? array.length : 5;
  for (var i = 0; i < loopVariable; i++) {
    li = document.createElement('li');
    li.textContent = array[i].name + ' - ' + array[i].score;
    scoreList.appendChild(li);
  };
};

function populateScores(arrayOfScores, arrayOfScoreStrings) {
  for (var i = 0; i < arrayOfScores.length; i++) {
    buildHighScore(arrayOfScores[i], arrayOfScoreStrings[i]);
  };
};

//main

highScores = getScores();
//(continued from above) for instance:
//sortedHighScores = highScores.sort(<sortfunction>)
//or maybe even better, sort the array in the first line of the
//function that puts them in various arrays
sortedHighScores = objectSort(highScores);
arrayOfScores = distributeObjects(sortedHighScores);
populateScores(arrayOfScores, scoreStrings);
