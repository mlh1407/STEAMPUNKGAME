#pragma strict

import UnityEngine.UI;

var Username : Text;
var Password : Text;

function LoadOnClick () {
	if(Username.text == "oliver"){
	Debug.Log("JAAAA");
		if(Password.text == "1234"){
		Debug.Log("mere JA");
		}
		else{
		Debug.Log("næsten der");
		}
	}
	else{
	Debug.Log("Neeeeej");
	}
	//Debug.Log(Username.text); 
}

function Update () {

}