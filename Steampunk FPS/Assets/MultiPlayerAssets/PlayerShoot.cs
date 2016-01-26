using UnityEngine;
using UnityEngine.Networking;

public class PlayerShoot : NetworkBehaviour {

	private const string PLAYER_TAG = "Player";

	public PlayerWeapon weapon;
	public AudioClip fireSound;
	public GameObject GunParticle;
	AudioSource audio;

	[SerializeField]
	private Camera cam;

	[SerializeField]
	private LayerMask mask;

	void Start ()
	{
		if (cam == null)
		{
			Debug.LogError("PlayerShoot: No camera referenced!");
			this.enabled = false;
		}
		audio = GetComponent<AudioSource>();
	}

	void Update ()
	{
		if (Input.GetButtonDown("Fire1"))
		{
			Shoot();
		}
	}

	[Client]
	void Shoot ()
	{   //
		 
		audio.PlayOneShot(fireSound, 0.7F);

		//
		RaycastHit _hit;
		if (Physics.Raycast(cam.transform.position, cam.transform.forward, out _hit, 100f, mask) )
		{
			if (_hit.collider.tag == PLAYER_TAG)
			{ 
				Instantiate (GunParticle,_hit.point,Quaternion.identity);
				CmdPlayerShot(_hit.collider.name);
			} 
			//	Instantiate (GunParticle,_hit.point,Quaternion.identity);


		}

	}

	[Command]
	void CmdPlayerShot (string _ID)
	{
		Debug.Log(_ID + " has been shot.");
	}

}
