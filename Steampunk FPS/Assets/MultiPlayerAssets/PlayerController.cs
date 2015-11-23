using UnityEngine;

[RequireComponent(typeof(ConfigurableJoint))]
[RequireComponent(typeof(PlayerMotor))]
public class PlayerController : MonoBehaviour {

	[SerializeField]
	private float speed = 5f;
	[SerializeField]
	private float lookSensitivity = 3f;

	[SerializeField]
	private float thrusterForce = 1000f;

	[Header("Spring settings:")]
	[SerializeField]
	private JointDriveMode jointMode = JointDriveMode.Position;
	[SerializeField]
	private float jointSpring = 20f;
	[SerializeField]
	private float jointMaxForce = 40f;

	public GameObject grenadePrefab;
	public Transform gunTransform;
	private PlayerMotor motor;
	private ConfigurableJoint joint;

	void Start ()
	{
		motor = GetComponent<PlayerMotor>();
		joint = GetComponent<ConfigurableJoint>();

		SetJointSettings(jointSpring);
	}

	void Update ()
	{   
		 

		//Calculate movement velocity as a 3D vector
		float _xMov = Input.GetAxisRaw("Horizontal");
		float _zMov = Input.GetAxisRaw("Vertical");

		Vector3 _movHorizontal = transform.right * _xMov;
		Vector3 _movVertical = transform.forward * _zMov;

		// Final movement vector
		Vector3 _velocity = (_movHorizontal + _movVertical).normalized * speed;

		//Apply movement
		motor.Move(_velocity);

		//Calculate rotation as a 3D vector (turning around)
		float _yRot = Input.GetAxisRaw("Mouse X");

		Vector3 _rotation = new Vector3(0f, _yRot, 0f) * lookSensitivity;

		//Apply rotation
		motor.Rotate(_rotation);

		//Calculate camera rotation as a 3D vector (turning around)
		float _xRot = Input.GetAxisRaw("Mouse Y");

		float _cameraRotationX = _xRot * lookSensitivity;

		//Apply camera rotation
		motor.RotateCamera(_cameraRotationX);

		// Calculate the thrusterforce based on player input
		Vector3 _thrusterForce = Vector3.zero;
		if (Input.GetButton ("Jump"))
		{
			_thrusterForce = Vector3.up * thrusterForce;
			SetJointSettings(0f);
		} else
		{
			SetJointSettings(jointSpring);
		}

		// Apply the thruster force
		motor.ApplyThruster(_thrusterForce);

		// SHOOOT 
		if (Input.GetButton ("Fire1"))
		{
		 Debug.Log ("BANG");

			//NetworkViewID missileViewID   = Network.AllocateViewID();
			//missileViewID.RPC("SpawnMissile", RPCMode.All, gunTransform.position, gunTransform.localRotation, transform.forward*250);

			 
			//
		}
		//

	}	

	private void SetJointSettings (float _jointSpring)
	{
		joint.yDrive = new JointDrive {
			mode = jointMode,
			positionSpring = _jointSpring,
			maximumForce = jointMaxForce
		};
	}

}
