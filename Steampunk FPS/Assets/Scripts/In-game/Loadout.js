#pragma strict

function Start () {

}

function Update () {

}

function OnGUI () {
	
	//Baggrundsboxen
	GUI.Box(new Rect(ScrInPro(5,"width"), ScrInPro(7,"height"), ScrInPro(30,"width"), ScrInPro(90,"height")), "");
	
	//Button
	if (GUI.Button(new Rect(ScrInPro(6,"width"), ScrInPro(10,"height"), ScrInPro(28,"width"), ScrInPro(30,"height")), "Click me")) {
    	Debug.Log("Clicked the button with text");
    }
	
}

//En function som tager en procentdel af skærmopløsningen
function ScrInPro (procent : int, orientation : String) {
	
	if (orientation == "height") {
		return Screen.height/100*procent;
	}
	
	if (orientation == "width") {
		return Screen.width/100*procent;
	}
	
}