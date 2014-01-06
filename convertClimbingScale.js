/*
Climbing scale converter
Author: Charalampos KARYPIDIS
v1.0  - 20140105
ch.karypidis@gmail.com
http://addictiveknowledge.blogspot.com/
*/

//////////////////// Normalizing case. For instance, if the user types "7A" and chooses "Fontainebleau", this function will convert the input to lowercase before querying the database. The user will still read "7A", only the query is affected.
function normalizeCase(string,scaleName) {
	lowerCaseList = ["Yosemite (YDS)","British Technical","French","Fontainebleau","Fontainebleau Traverse","British Technical Grade","Dankyu","Toyota"]
	upperCaseList = ["British adjectival","UIAA","Saxon","Hueco (V-Grade)","Peak Bouldering Grade"]

	var newString = ""
	if (upperCaseList.indexOf(scaleName) > -1) {
		newString = string.trim().toUpperCase();
	}
	else if (lowerCaseList.indexOf(scaleName) > -1) {
		newString = string.trim().toLowerCase();
	}
	else {
		newString = string
	}
	return newString
}

//////////////////// The database arrays containing grading correspondances. There is no equation that can convert directly so all possibilities had to be included.
leadScale = [["Yosemite (YDS)","British Technical","British adjectival","French","UIAA","Saxon","Ewbank","Finnish","SWE/NOR","Brazilian"], ["3/4","1","M","1","I","I","1/2","1","1","I"], ["5","1","M","1","I","I","3/4","1","1","I sup"], ["5.1","2","M","2","II","II","5/6","2","2","II"], ["5.2","2","D","2","II","II","7/8","2","2","II sup"], ["5.3","3","D","3","III","III","9/10","3","3","II sup"], ["5.4","3","VD","4a","IV","IV","11/12","4","4","III"], ["5.5","4a","S","4b","IV+","V","13","5-","5-","III sup"], ["5.6","4b","HS","4c","V","VI","14","5","5","IV"], ["5.7","4c","VS","5a","V+","VI","15","5","5","IV"], ["5.8","4c","HVS","5b","VI-","VIIa","16","5+","5+","IV sup"], ["5.9","5a","HVS","5c","VI","VIIb","17","5+","6-","V"], ["5.10a","5a","E1","6a","VI+","VIIc","18","6-","6-","VI"], ["5.10b","5b","E1","6a+","VII-","VIIc","19","6-","6","VI"], ["5.10c","5b","E2","6b","VII","VIIIa","20","6","6+","VI sup"], ["5.10d","5c","E2","6b+","VII+","VIIIb","21","6","7-","VI sup"], ["5.11a","5c","E3","6c","VII+","VIIIc","22","6+","7","7a"], ["5.11b","5c","E3","6c+","VIII-","VIIIc","23","6+","7","7b"], ["5.11c","6a","E4","6c+","VIII-","IXa","24","7-","7+","7c"], ["5.11d","6a","E4","7a","VIII","IXb","24","7","7+","7c"], ["5.12a","6a","E5","7a+","VIII+","IXc","25","7+","8-","8a"], ["5.12b","6a","E5","7b","VIII+","IXc","26","8-","8-","8b"], ["5.12c","6b","E6","7b+","IX-","Xa","27","8","8","8c"], ["5.12d","6b","E6","7c","IX","Xb","28","8+","8","9a"], ["5.13a","6b","E7","7c+","IX+","Xc","29","9-","8+","9b"], ["5.13b","6c","E7","8a","IX+","Xc","29","9","9-","9c"], ["5.13c","6c","E8","8a+","X-","XIa","30","9+","9-","10a"], ["5.13d","6c","E9","8b","X","XIb","31","10-","9","10b"], ["5.14a","7a","E10","8b+","X+","XIc","32","10","9","10c"], ["5.14b","7a","E10","8c","X+","XIc","33","10+","9+","11a"], ["5.14c","7b","E11","8c+","XI-","XIc","34","11-","9+","11b"], ["5.14d","7b","E11","9a","XI","XIc","35","11","9+","11c"], ["5.15a","7b","E11","9a+","XI+","XIc","36","11","9+","12a"], ["5.15b","7b","E11","9b","XI+/XII-","XIc","37","11","9+","12b"], ["5.15c","7b","E11","9b+","XII-","XIc","38","11","9+","12c"]]

boulderingScale = [["Hueco (V-Grade)","Fontainebleau","Fontainebleau Traverse","Peak Bouldering Grade","British Technical Grade","Japanese Dankyu","Japanese Toyota"], ["V0-","3",,"B0","5a","7-kyu","a"], ["V0","4",,"B1","5a/5b","7-kyu","a"], ["V0+","4+",,"B1 - B2","5a/5b","6-kyu","b"], ["V1","5",,"B2","5b/5c","5-kyu","b"], ["V2","6a",,"B3","5c/6a","4-kyu","c"], ["V3","6a+","7a","B4","6a- 6b","3-kyu","c"], ["V4","6b/6c","7a+","B5","6a/6b","2-kyu","d"], ["V5","6c+","7b","B5 - B6","6b","1-kyu","d"], ["V6","7a","7b+","B6 - B7","6b/6c","1-kyu","d"], ["V7","7a+/7b","7c","B7 - B8","6b/6c","1-dan","e"], ["V8","7b/7b+","7c+","B8","6c","1-dan","e"], ["V8","7b+","8a","B9","6c/7a","2-dan","f"], ["V9","7c","8a+","B10","6c/7a","2-dan","f"], ["V10","7c+","8b","B11","7a","3-dan","g"], ["V11","8a","8b+","B11 - B12","7a/7b","3-dan","g"], ["V12","8a+","8c","B12","7a/7b","4-dan","g"], ["V13","8b","8c+","B13","7b","4-dan","g"], ["V14","8b+","9a","B14","7b","5-dan","g"], ["V15","8c","9a","B15","7b","5-dan","g"], ["V16","8c+","9a","B16","7b","6-dan","g"]]

//////////////////// input box gets immediate focus upon page load
function focusOnInput() {
	document.getElementById("inputBox").focus();
}

//////////////////// Invert the scales selected
function invertScales() {
	var inputSelected = document.getElementById("inputScales").value;
	var outputSelected = document.getElementById("outputScales").value;
	document.getElementById("inputScales").value = outputSelected;
	document.getElementById("outputScales").value = inputSelected;
}

//////////////////// disabling non-compatible options. When a lead climbing scale is selected, bouldering scale options are disabled and vice versa
function disableOptions() {
var inputIndexSelected = document.getElementById("inputScales").selectedIndex;
document.getElementById("outputScales").value="";
var options = document.getElementById("outputScales").getElementsByTagName("option");

if (inputIndexSelected >=11) {
	for (var i = 0; i < options.length; i++) {
		if (leadScale[0].indexOf(options[i].value) > -1) {
			options[i].disabled = true
		}
		else {
			options[i].disabled = false
		}
	}
}
else if (inputIndexSelected <11) {
	for (var i = 0; i < options.length; i++) {
		if (boulderingScale[0].indexOf(options[i].value) > -1) {
			options[i].disabled = true
		}
		else {
			options[i].disabled = false
		}
	}
}
}

//////////////////// the main function that yields the result
function result() {
document.getElementById("outputBox").value = "";
var scaleSelected = document.getElementById("inputScales").value;
var scaleOutput = document.getElementById("outputScales").value;
var inputValue = document.getElementById("inputBox").value;


if (scaleSelected == 0  || scaleOutput == 0 || inputValue == 0) {
}
else if (boulderingScale[0].indexOf(scaleSelected) > -1) {
	var inputIndex = boulderingScale[0].indexOf(scaleSelected);
	var outputIndex = boulderingScale[0].indexOf(scaleOutput);
	correctedString = normalizeCase(inputValue,scaleSelected);

	var rowIndex = "";
	for (var i = 1; i <boulderingScale.length; i++) {
		var gradingLevel = boulderingScale[i][inputIndex];
		if (correctedString == gradingLevel) {
			rowIndex = i;
		}
	}
	if (rowIndex != "") {
		document.getElementById("outputBox").value = boulderingScale[rowIndex][outputIndex];
	}
	else {
		document.getElementById("outputBox").value = "";
	}
}
else if (leadScale[0].indexOf(scaleSelected) > -1) {
	var inputIndex = leadScale[0].indexOf(scaleSelected);
	var outputIndex = leadScale[0].indexOf(scaleOutput);
	correctedString = normalizeCase(inputValue,scaleSelected);

	var rowIndex = "";
	for (var i = 1; i <leadScale.length; i++) {
		var gradingLevel = leadScale[i][inputIndex];
		if (correctedString == gradingLevel) {
			rowIndex = i;
		}
	}
	if (rowIndex != "") {
		document.getElementById("outputBox").value = leadScale[rowIndex][outputIndex];
	}
	else {
		document.getElementById("outputBox").value = "";
	}
}
}
