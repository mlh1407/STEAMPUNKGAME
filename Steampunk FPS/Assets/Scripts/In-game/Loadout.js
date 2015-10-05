#pragma strict

var loadout : int[];

var weaponTypes : String[];

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

var grenadeNames : String[];
var grenadeImages : Texture[];
var grenadeDescription : String[];

var armorNames : String[];
var armorImages : Texture[];
var armorDescription : String[];

var antalSider : float[] = [0f,0f,0f];

var weaponBoxWidth : int;
var weaponMargin : int;
var subMenuMarginFromTitle : int;
var UIScale : float;
var antalPerRaekke : float;
var scrollTilbageTilSidste : boolean;

private var widthOfRow : int;
private var i : int;
private var y : int;
private var startPosForRow : float;
private var showMenu : boolean = false;

function Start () {

}

function Update () {



}

function OnGUI () {
	
	//Udregner hvor mange sider der skal være
	antalSider[0] = Mathf.Ceil((primaryNames.length)/antalPerRaekke);
	antalSider[1] = Mathf.Ceil((secondaryNames.length)/antalPerRaekke);
	antalSider[2] = Mathf.Ceil((meleeNames.length)/antalPerRaekke);
	antalSider[3] = Mathf.Ceil((grenadeNames.length)/antalPerRaekke);
	antalSider[4] = Mathf.Ceil((armorNames.length)/antalPerRaekke);
	
	//Skjuler menuen ved tryk på escape
    if (Input.GetKeyDown(KeyCode.Escape))
    	showMenu = false;
		
	//Baggrundsboxe
	GUI.Box(new Rect(ScrInPro(5,"width"), ScrInPro(7,"height"), ScrInPro(90,"height")/2, ScrInPro(90,"height")), "Loadout");
	GUI.Box(new Rect(ScrInPro(5,"width"), Screen.height-ScrInPro(7,"height")-ScrInPro(32,"height"), ScrInPro(90,"height")/2, ScrInPro(33,"height")), "");

	
	//Primary
	if (GUI.Button(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40), ScrInPro(13,"height"), ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20), ScrInPro(30,"height")), "Primary")) {
    	foldedOut = 0;
    	side = 0;
    	
    	//Resets the description box
    	subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
    	subFoldedOut[3] = -1;
    	subFoldedOut[4] = -1;
    	
    	//Shows the menu
    	showMenu = true;
    }
    
    //Secondary
	if (GUI.Button(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40), ScrInPro(13,"height")+ScrInPro(30,"height")+ScrInPro(1,"height"), ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20), ScrInPro(25,"height")), "Secondary")) {
    	foldedOut = 1;
    	side = 0;
    	
    	//Resets the description box
    	subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
    	subFoldedOut[3] = -1;
    	subFoldedOut[4] = -1;
    	
    	//Shows the menu
    	showMenu = true;
    }
    
    //Melee
	if (GUI.Button(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40), ScrInPro(13,"height")+ScrInPro(55,"height")+ScrInPro(2,"height"), ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20), ScrInPro(25,"height")), "Melee")) {
    	foldedOut = 2;
    	side = 0;
    	
    	//Resets the description box
    	subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
    	subFoldedOut[3] = -1;
    	subFoldedOut[4] = -1;
    	
    	//Shows the menu
    	showMenu = true;
    }
    
    //Grenades
    if (GUI.Button(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40), Screen.height-ScrInPro(7,"height")-ScrInPro(31,"height"), ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20), ScrInPro(15,"height")), "Grenades")) {
    	foldedOut = 3;
    	side = 0;
    	
    	//Resets the description box
    	subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
    	subFoldedOut[3] = -1;
    	subFoldedOut[4] = -1;
    	
    	//Shows the menu
    	showMenu = true;
    }
    
    //Armor
    if (GUI.Button(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40), Screen.height-ScrInPro(7,"height")-ScrInPro(15,"height"), ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20), ScrInPro(15,"height")), "Armor")) {
    	foldedOut = 4;
    	side = 0;
    	
    	//Resets the description box
    	subFoldedOut[0] = -1;
    	subFoldedOut[1] = -1;
    	subFoldedOut[2] = -1;
    	subFoldedOut[3] = -1;
    	subFoldedOut[4] = -1;
    	
    	//Shows the menu
    	showMenu = true;
    }
    
    if (showMenu) {
	    
	    //ScrollOutWindow
	    GUI.Box(new Rect(ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height"), widthOfRow, ScrInPro(30,"height")), "");
		
		
		//Calculates each row
		switch (foldedOut) {
			case 0:
				//Primary
				if (primaryNames.length/antalPerRaekke-side > 1) {
					widthOfRow = antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				} else {
					widthOfRow = (primaryNames.length/antalPerRaekke-(antalSider[foldedOut]-1))*antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				}
				startPosForRow = ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width");
				
				for (i = side*antalPerRaekke; i < primaryNames.length; i++) {
				//Knap for hvert våben - indsæt funktion til at klæde karakteren på!
					if (i < side*antalPerRaekke + antalPerRaekke) {
						if (GUI.Button(new Rect(startPosForRow + (i-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"), ScrInPro(weaponBoxWidth,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), primaryImages[i])) {
		    				subFoldedOut[0] = i;
		    				subFoldedOut[1] = -1;
		    				subFoldedOut[2] = -1;
		    				subFoldedOut[3] = -1;
	    					subFoldedOut[4] = -1;
	    					
	    					loadout[foldedOut] = i;
						}
					}
				}
				
				//Tjekker hvor den skal vise description henne
				for (y = side*antalPerRaekke; y < primaryNames.length; y++) {
					
					if (subFoldedOut[foldedOut] == y) {
						GUI.Box(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin*2,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), ScrInPro(weaponBoxWidth,"width")+ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), "");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*0,"height")), ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height")), "<b>"+primaryNames[y]+"</b>");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*1,"height"))+subMenuMarginFromTitle, ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*3,"height")-subMenuMarginFromTitle), primaryDescription[y]);
					}
				}
							
				break;
				
			case 1:
				//Secondary
				if (secondaryNames.length/antalPerRaekke-side > 1) {
					widthOfRow = antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				} else {
					widthOfRow = (secondaryNames.length/antalPerRaekke-(antalSider[foldedOut]-1))*antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				}
				startPosForRow = ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width");
				
				for (i = side*antalPerRaekke; i < secondaryNames.length; i++) {
				//Knap for hvert våben - indsæt funktion til at klæde karakteren på!
					if (i < side*antalPerRaekke + antalPerRaekke) {
						if (GUI.Button(new Rect(startPosForRow + (i-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"), ScrInPro(weaponBoxWidth,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), secondaryImages[i])) {
		    				subFoldedOut[0] = -1;
		    				subFoldedOut[1] = i;
		    				subFoldedOut[2] = -1;
		    				subFoldedOut[3] = -1;
	    					subFoldedOut[4] = -1;
	    					
	    					loadout[foldedOut] = i;
						}
					}
				}
				
				//Tjekker hvor den skal vise description henne
				for (y = side*antalPerRaekke; y < secondaryNames.length; y++) {
					
					if (subFoldedOut[foldedOut] == y) {
						GUI.Box(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin*2,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), ScrInPro(weaponBoxWidth,"width")+ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), "");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*0,"height")), ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height")), "<b>"+secondaryNames[y]+"</b>");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*1,"height"))+subMenuMarginFromTitle, ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*3,"height")-subMenuMarginFromTitle), secondaryDescription[y]);
					}
				}
				
				break;
				
			case 2:
				//Melee
				if (meleeNames.length/antalPerRaekke-side > 1) {
					widthOfRow = antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				} else {
					widthOfRow = (meleeNames.length/antalPerRaekke-(antalSider[foldedOut]-1))*antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				}
				startPosForRow = ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width");
				
				for (i = side*antalPerRaekke; i < meleeNames.length; i++) {
				//Knap for hvert våben - indsæt funktion til at klæde karakteren på!
					if (i < side*antalPerRaekke + antalPerRaekke) {
						if (GUI.Button(new Rect(startPosForRow + (i-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"), ScrInPro(weaponBoxWidth,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), meleeImages[i])) {
		    				subFoldedOut[0] = -1;
		    				subFoldedOut[1] = -1;
		    				subFoldedOut[2] = i;
		    				subFoldedOut[3] = -1;
	    					subFoldedOut[4] = -1;
	    					
	    					loadout[foldedOut] = i;
						}
					}
				}
				
				//Tjekker hvor den skal vise description henne
				for (y = side*antalPerRaekke; y < meleeNames.length; y++) {
					
					if (subFoldedOut[foldedOut] == y) {
						GUI.Box(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin*2,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), ScrInPro(weaponBoxWidth,"width")+ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), "");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*0,"height")), ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height")), "<b>"+meleeNames[y]+"</b>");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*1,"height"))+subMenuMarginFromTitle, ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*3,"height")-subMenuMarginFromTitle), meleeDescription[y]);
					}
				}
				break;
				
			case 3:
				//Grenades
				if (grenadeNames.length/antalPerRaekke-side > 1) {
					widthOfRow = antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				} else {
					widthOfRow = (grenadeNames.length/antalPerRaekke-(antalSider[foldedOut]-1))*antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				}
				startPosForRow = ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width");
				
				for (i = side*antalPerRaekke; i < grenadeNames.length; i++) {
				//Knap for hvert våben - indsæt funktion til at klæde karakteren på!
					if (i < side*antalPerRaekke + antalPerRaekke) {
						if (GUI.Button(new Rect(startPosForRow + (i-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"), ScrInPro(weaponBoxWidth,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), grenadeImages[i])) {
		    				subFoldedOut[0] = -1;
		    				subFoldedOut[1] = -1;
		    				subFoldedOut[2] = -1;
		    				subFoldedOut[3] = i;
	    					subFoldedOut[4] = -1;
	    					
	    					loadout[foldedOut] = i;
						}
					}
				}
				
				//Tjekker hvor den skal vise description henne
				for (y = side*antalPerRaekke; y < grenadeNames.length; y++) {
					
					if (subFoldedOut[foldedOut] == y) {
						GUI.Box(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin*2,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), ScrInPro(weaponBoxWidth,"width")+ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), "");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*0,"height")), ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height")), "<b>"+grenadeNames[y]+"</b>");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*1,"height"))+subMenuMarginFromTitle, ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*3,"height")-subMenuMarginFromTitle), grenadeDescription[y]);
					}
				}
				break;
				
			case 4:
				//Armor
				if (armorNames.length/antalPerRaekke-side > 1) {
					widthOfRow = antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				} else {
					widthOfRow = (armorNames.length/antalPerRaekke-(antalSider[foldedOut]-1))*antalPerRaekke * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width");
				}
				startPosForRow = ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width");
				
				for (i = side*antalPerRaekke; i < armorNames.length; i++) {
				//Knap for hvert våben - indsæt funktion til at klæde karakteren på!
					if (i < side*antalPerRaekke + antalPerRaekke) {
						if (GUI.Button(new Rect(startPosForRow + (i-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width"), ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"), ScrInPro(weaponBoxWidth,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), armorImages[i])) {
		    				subFoldedOut[0] = -1;
		    				subFoldedOut[1] = -1;
		    				subFoldedOut[2] = -1;
		    				subFoldedOut[3] = -1;
	    					subFoldedOut[4] = i;
	    					
	    					loadout[foldedOut] = i;
						}
					}
				}
				
				//Tjekker hvor den skal vise description henne
				for (y = side*antalPerRaekke; y < armorNames.length; y++) {
					
					if (subFoldedOut[foldedOut] == y) {
						GUI.Box(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin*2,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), ScrInPro(weaponBoxWidth,"width")+ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*2,"height")), "");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*0,"height")), ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height")), "<b>"+armorNames[y]+"</b>");
						GUI.Label(new Rect(startPosForRow + (y-side*antalPerRaekke) * (ScrInPro(weaponBoxWidth,"width") + ScrInPro(weaponMargin,"width")) + ScrInPro(weaponMargin*3,"width")/2, (ScrInPro(13,"height") + ScrInPro(weaponMargin,"height"))+(ScrInPro(30,"height") - ScrInPro(weaponMargin*1,"height"))+subMenuMarginFromTitle, ScrInPro(weaponBoxWidth,"width")-ScrInPro(weaponMargin,"width"), ScrInPro(30,"height") - ScrInPro(weaponMargin*3,"height")-subMenuMarginFromTitle), armorDescription[y]);
					}
				}
				break;
		}
			
			//forwards and backwards
		if (GUI.Button(new Rect(ScrInPro(5,"width")+ScrInPro(90,"height")/2, ScrInPro(7,"height"), ScrInPro(45,"height")/2-ScrInPro(45,"height")/4, ScrInPro(6,"height")), "<-")) {
			if (side > 0) {
				side--;
			}
			else
			{
				if (scrollTilbageTilSidste)
					side = antalSider[foldedOut]-1;
			}
			
			subFoldedOut[0] = -1;
	    	subFoldedOut[1] = -1;
	    	subFoldedOut[2] = -1;
	    	subFoldedOut[3] = -1;
	    	subFoldedOut[4] = -1;
		}
		
		if (GUI.Button(new Rect(ScrInPro(5,"width")+ScrInPro(90,"height")/2+ScrInPro(45,"height")/2, ScrInPro(7,"height"), ScrInPro(45,"height")/2-ScrInPro(45,"height")/4, ScrInPro(6,"height")), "->")) {
			if (side < antalSider[foldedOut]-1) {
				side++;
			}
			else
			{
				if (scrollTilbageTilSidste)
					side = 0;
			}
			
			subFoldedOut[0] = -1;
	    	subFoldedOut[1] = -1;
	    	subFoldedOut[2] = -1;
	    	subFoldedOut[3] = -1;
	    	subFoldedOut[4] = -1;
		}
		
		//Sidetal
		GUI.Box(new Rect(ScrInPro(5,"width")+ScrInPro(90,"height")/2+ScrInPro(45,"height")/2-ScrInPro(45,"height")/4, ScrInPro(7,"height"), ScrInPro(45,"height")/4, ScrInPro(6,"height")), (1+side).ToString()+"/"+antalSider[foldedOut].ToString());
		
		//Tab som er åben	
		GUI.Box(new Rect(ScrInPro(5,"width")+ScrInPro(90,"height")/2+ScrInPro(45,"height")/2+ScrInPro(45,"height")/2-ScrInPro(45,"height")/4, ScrInPro(7,"height"), widthOfRow-4*(ScrInPro(45,"height")/2-ScrInPro(45,"height")/4), ScrInPro(6,"height")), weaponTypes[foldedOut]);
		
		//Close
		if (GUI.Button(new Rect(widthOfRow+ScrInPro(5,"width")+(ScrInPro(90,"height")/40) + (ScrInPro(90,"height")/2-(ScrInPro(90,"height")/20)) + ScrInPro(weaponMargin,"width") - ((ScrInPro(45,"height")/2-ScrInPro(45,"height")/4)), ScrInPro(7,"height"), ScrInPro(45,"height")/2-ScrInPro(45,"height")/4, ScrInPro(6,"height")), "X")) {
			showMenu = false;
		}	
	
	}
	//Finish
	if (GUI.Button(new Rect(Screen.width-ScrInPro(5,"width")-ScrInPro(20,"width"),Screen.height-ScrInPro(5,"height")-ScrInPro(7,"width"),ScrInPro(20,"width"),ScrInPro(7,"width")), "Finish")) {
		finish();
	
	}
			
}

function finish () {
	Debug.Log("Finished : " + loadout.ToString());
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