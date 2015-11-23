#pragma strict

var particleEmitters : ParticleSystem[];
var light : GameObject;
 
function Start () {

}

function Update () {

	if (Input.GetButtonDown("Fire1")) {
		for (var i = 0; i < particleEmitters.length; i++) {
			
			particleEmitters[i].Play();
		}
		
		light.Animation.Play();
	}


}