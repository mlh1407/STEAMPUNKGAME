#pragma strict

var foldedOut : int = 0;
var subFoldedOut : int[];
var side : int;

var primaryNames : String[];
var primaryImages : Texture[];
var primaryDescription : String[];

var secondaryNames : String[];
var secondaryImages : Texture[];
var secondaryDescription : String[];

var meleeNames : String[];
var meleeImages : Texture[];
var meleeDescription : String[];

var antalSider : float[] = [0f,0f,0f];

var weaponBoxWidth : int;
var weaponMargin : int;
var subMenuMarginFromTitle : int;
var UIScale : float;

private var widthOfRow : int;
private var i : int;
private var y : int;
private var startPosForRow : float;

function Start () {

}

function Update () {



}

function OnGUI () {
	
	//Udregner hvor mange sider der skal være
	antalSider[0] = Mathf.Ceil((primaryNames.length)/4f);
	antalSider[1] = Mathf.Ceil((secondaryNames.length)/4f);
	antalSider[2] = Mathf.Ceil((meleeNames.length)/4f);
	
	//forwards and backwards
	if (GUI.Button(new Rect(ScrInPro(5,"width")+ScrInPro(90,"height")/2, ScrInPro(7,"height"), ScrInPro(45,"height")/2-ScrInPro(45,"height")/4, ScrInPro(6,"height")), "<-") && side > 0 ) {
		side--;
		
		subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
	}
	if (GUI.Button(new Rect(ScrInPro(5,"width")+ScrInPro(90,"height")/2+ScrInPro(45,"height")/2, ScrInPro(7,"height"), ScrInPro(45,"height")/2-ScrInPro(45,"height")/4, ScrInPro(6,"height")), "->") && side < antalSider[foldedOut]-1 ) {
		side++;
		
		subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
	}
	GUI.Box(new Rect(ScrInPro(5,"width")+ScrInPro(90,"height")/2+ScrInPro(45,"height")/2-ScrInPro(45,"height")/4, ScrInPro(7,"height"), ScrInPro(45,"height")/4, ScrInPro(6,"height")), (1+side).ToString()+"/"+antalSider[foldedOut].ToString());
	
	//Baggrundsboxen
	GUI.Box(new Rect(ScrInPro(5,"width"), ScrInPro(7,"height"), ScrInPro(90,"height")/2, ScrInPro(90,"height")), "Loadout");
	
	//Primary
	if (GUI.Button(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40), ScrInPro(13,"height"), ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20), ScrInPro(30,"height")), "Primary")) {
    	foldedOut = 0;
    	side = 0;
    	
    	//Resets the description box
    	subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
    }
    
    //Secondary
	if (GUI.Button(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40), ScrInPro(13,"height")+ScrInPro(30,"height")+ScrInPro(1,"height"), ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20), ScrInPro(25,"height")), "Secondary")) {
    	foldedOut = 1;
    	side = 0;
    	
    	//Resets the description box
    	subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
    }
    
    //Melee
	if (GUI.Button(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40), ScrInPro(13,"height")+ScrInPro(55,"height")+ScrInPro(2,"height"), ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20), ScrInPro(25,"height")), "Melee")) {
    	foldedOut = 2;
    	side = 0;
    	
    	//Resets the description box
    	subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
    }
    
    //ScrollOutWindow
    GUI.Box(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height"), widthOfRow, ScrInPro(30,"height")), "");
	
	
	//Calculates each row
	switch (foldedOut) {
		case 0:
			//Primary
			if (primaryNames.length/4f-side > 1) {
				widthOfRow = 4 * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
			} else {
				widthOfRow = (primaryNames.length/4f-(antalSider[foldedOut]-1))*4 * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
			}
			startPosForRow = ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width");
			
			for (i = side*4; i < primaryNames.length; i++) {
			//Knap for hvert våben - indsæt funktion til at klæde karakteren på!
				if (i < side*4 + 4) {
					if (GUI.Button(new Rect(startPosForRow + (i-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"), ScrInPro(weaponBoxWidth,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), primaryImages[i])) {
	    				subFoldedOut[0] = i;
	    				subFoldedOut[1] = -1;
	    				subFoldedOut[2] = -1;
					}
				}
			}
			
			//Tjekker hvor den skal vise description henne
			for (y = side*4; y < primaryNames.length; y++) {
				
				if (subFoldedOut[foldedOut] == y) {
					GUI.Box(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin*2,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), ScrInPro(weaponBoxWidth,"width")+ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), "");
					GUI.Label(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*0,"height")), ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height")), "<b>"+primaryNames[y]+"</b>");
					GUI.Label(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*1,"height"))+subMenuMarginFromTitle, ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*3,"height")-subMenuMarginFromTitle), primaryDescription[y]);
				}
			}
						
			break;
			
		case 1:
			//Secondary
			if (secondaryNames.length/4f-side > 1) {
				widthOfRow = 4 * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
			} else {
				widthOfRow = (secondaryNames.length/4f-(antalSider[foldedOut]-1))*4 * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
			}
			startPosForRow = ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width");
			
			for (i = side*4; i < secondaryNames.length; i++) {
			//Knap for hvert våben - indsæt funktion til at klæde karakteren på!
				if (i < side*4 + 4) {
					if (GUI.Button(new Rect(startPosForRow + (i-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"), ScrInPro(weaponBoxWidth,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), secondaryImages[i])) {
	    				subFoldedOut[0] = -1;
	    				subFoldedOut[1] = i;
	    				subFoldedOut[2] = -1;
					}
				}
			}
			
			//Tjekker hvor den skal vise description henne
			for (y = side*4; y < secondaryNames.length; y++) {
				
				if (subFoldedOut[foldedOut] == y) {
					GUI.Box(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin*2,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), ScrInPro(weaponBoxWidth,"width")+ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), "");
					GUI.Label(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*0,"height")), ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height")), "<b>"+secondaryNames[y]+"</b>");
					GUI.Label(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*1,"height"))+subMenuMarginFromTitle, ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*3,"height")-subMenuMarginFromTitle), secondaryDescription[y]);
				}
			}
			
			break;
			
		case 2:
			//Melee
			if (meleeNames.length/4f-side > 1) {
				widthOfRow = 4 * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
			} else {
				widthOfRow = (meleeNames.length/4f-(antalSider[foldedOut]-1))*4 * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
			}
			startPosForRow = ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width");
			
			for (i = side*4; i < meleeNames.length; i++) {
			//Knap for hvert våben - indsæt funktion til at klæde karakteren på!
				if (i < side*4 + 4) {
					if (GUI.Button(new Rect(startPosForRow + (i-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"), ScrInPro(weaponBoxWidth,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), meleeImages[i])) {
	    				subFoldedOut[0] = -1;
	    				subFoldedOut[1] = -1;
	    				subFoldedOut[2] = i;
					}
				}
			}
			
			//Tjekker hvor den skal vise description henne
			for (y = side*4; y < meleeNames.length; y++) {
				
				if (subFoldedOut[foldedOut] == y) {
					GUI.Box(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin*2,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), ScrInPro(weaponBoxWidth,"width")+ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), "");
					GUI.Label(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*0,"height")), ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height")), "<b>"+meleeNames[y]+"</b>");
					GUI.Label(new Rect(startPosForRow + (y-side*4) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*1,"height"))+subMenuMarginFromTitle, ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*3,"height")-subMenuMarginFromTitle), meleeDescription[y]);
				}
			}
			break;
	}
		
}

//En function som tager en procentdel af skærmopløsningen
function ScrInPro (procent : int, orientation : String) {
	
	if (orientation == "height") {
		return Screen.height/100*procent*UIScale;
	}
	
	if (orientation == "width") {
		return Screen.width/100*procent*UIScale;
	}
	
}