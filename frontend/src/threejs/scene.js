import * as THREE from 'three'
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose'
import { Camera } from '@mediapipe/camera_utils'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export default function initScene(assetUrl) {
  console.log('passed into initScene', assetUrl)
  //#region custom part

  // When debugMode is false, the UI would be more clean, and no debug canvas/gizmos
  // will be shown.
  // debugMode should be false after release.
  var debugMode = false

  //set a list of body nodes
  var bodyNodes = {}
  var posePositions = new Array(33)
  posePositions = [
    new THREE.Vector3(0.04951013624668121, -0.5537993907928467, -0.34814453125),
    new THREE.Vector3(
      0.05874458700418472,
      -0.5877993106842041,
      -0.341552734375
    ),
    new THREE.Vector3(
      0.05776822194457054,
      -0.5878190398216248,
      -0.343994140625
    ),
    new THREE.Vector3(0.05856151878833771, -0.5878030061721802, -0.341796875),
    new THREE.Vector3(
      0.025349929928779602,
      -0.5884748697280884,
      -0.35107421875
    ),
    new THREE.Vector3(
      0.02720574289560318,
      -0.5889256596565247,
      -0.350830078125
    ),
    new THREE.Vector3(0.026461347937583923, -0.5879639983177185, -0.3466796875),
    new THREE.Vector3(0.08847413957118988, -0.56815105676651, -0.237060546875),
    new THREE.Vector3(
      -0.050562478601932526,
      -0.5651029944419861,
      -0.258544921875
    ),
    new THREE.Vector3(0.05500911921262741, -0.5253621339797974, -0.3154296875),
    new THREE.Vector3(
      0.014989896677434444,
      -0.5237297415733337,
      -0.322021484375
    ),
    new THREE.Vector3(
      0.16191937029361725,
      -0.39939481019973755,
      -0.168212890625
    ),
    new THREE.Vector3(
      -0.14601583778858185,
      -0.4048914313316345,
      -0.2171630859375
    ),
    new THREE.Vector3(
      0.20807792246341705,
      -0.24278958141803741,
      -0.179443359375
    ),
    new THREE.Vector3(-0.11480742692947388, -0.21843108534812927, -0.306640625),
    new THREE.Vector3(
      0.1883174180984497,
      -0.27994000911712646,
      -0.315185546875
    ),
    new THREE.Vector3(
      0.10592618584632874,
      -0.29918837547302246,
      -0.437255859375
    ),
    new THREE.Vector3(0.17977704107761383, -0.2923222780227661, -0.34765625),
    new THREE.Vector3(0.1686221808195114, -0.3142808973789215, -0.48291015625),
    new THREE.Vector3(
      0.17427577078342438,
      -0.3161200284957886,
      -0.352294921875
    ),
    new THREE.Vector3(0.1779356449842453, -0.3521862030029297, -0.451416015625),
    new THREE.Vector3(0.17876610159873962, -0.2906334102153778, -0.32763671875),
    new THREE.Vector3(
      0.12653982639312744,
      -0.31024834513664246,
      -0.431396484375
    ),
    new THREE.Vector3(
      0.11891784518957138,
      -0.005889273248612881,
      0.010940551757812575
    ),
    new THREE.Vector3(
      -0.11340802907943726,
      -0.003931911196559668,
      -0.00705337524414062576
    ),
    new THREE.Vector3(
      0.18090826272964478,
      -0.13699419796466827,
      -0.0555114746093753
    ),
    new THREE.Vector3(
      -0.12167283892631531,
      -0.14763258397579193,
      -0.1122436523437527
    ),
    new THREE.Vector3(
      0.17521479725837708,
      0.15652978420257568,
      0.2456054687515
    ),
    new THREE.Vector3(
      -0.05427161976695061,
      0.2731281518936157,
      0.181518554687534
    ),
    new THREE.Vector3(0.17348220944404602, 0.17578579485416412, 0.274902343759),
    new THREE.Vector3(-0.03672000765800476, 0.2776344418525696, 0.22460937503),
    new THREE.Vector3(
      0.21530373394489288,
      0.10618282109498978,
      -0.009399414062565
    ),
    new THREE.Vector3(
      -0.03821026533842087,
      0.29396504163742065,
      -0.0327148437596
    ),
  ]
  var posePositionFlipped = new Array(33)
  // This is for when the positions are not visible to the camera
  var defaultPosePositions = new Array(33)
  defaultPosePositions = [
    new THREE.Vector3(
      0.032414693385362625,
      -0.46478378772735596,
      -0.5166015625
    ),
    new THREE.Vector3(
      0.047966279089450836,
      -0.49964046478271484,
      -0.5166015625
    ),
    new THREE.Vector3(0.0475391149520874, -0.49964889883995056, -0.5185546875),
    new THREE.Vector3(0.04842395335435867, -0.49963146448135376, -0.5166015625),
    new THREE.Vector3(0.01414841040968895, -0.5032369494438171, -0.5244140625),
    new THREE.Vector3(
      0.016248077154159546,
      -0.5036839246749878,
      -0.52490234375
    ),
    new THREE.Vector3(0.015302050858736038, -0.5027257800102234, -0.5205078125),
    new THREE.Vector3(0.09096682071685791, -0.4992818236351013, -0.41650390625),
    new THREE.Vector3(-0.047903016209602356, -0.502994179725647, -0.427734375),
    new THREE.Vector3(0.040406301617622375, -0.4443587362766266, -0.482421875),
    new THREE.Vector3(
      0.0006187697872519493,
      -0.44318902492523193,
      -0.487548828125
    ),
    new THREE.Vector3(0.1555636078119278, -0.36028727889060974, -0.32275390625),
    new THREE.Vector3(
      -0.14125564694404602,
      -0.37223902344703674,
      -0.329345703125
    ),
    new THREE.Vector3(0.146556556224823, -0.18196327984333038, -0.28955078125),
    new THREE.Vector3(
      -0.16774815320968628,
      -0.25457391142845154,
      -0.408447265625
    ),
    new THREE.Vector3(0.16546845436096191, -0.05736010521650314, -0.37109375),
    new THREE.Vector3(-0.10207398235797882, -0.22605323791503906, -0.544921875),
    new THREE.Vector3(
      0.1742442548274994,
      -0.02561066672205925,
      -0.402099609375
    ),
    new THREE.Vector3(-0.08980405330657959, -0.21982893347740173, -0.587890625),
    new THREE.Vector3(
      0.16559699177742004,
      -0.026696715503931046,
      -0.422607421875
    ),
    new THREE.Vector3(-0.07437512278556824, -0.22831577062606812, -0.578125),
    new THREE.Vector3(0.1586296707391739, -0.05108488351106644, -0.3896484375),
    new THREE.Vector3(
      -0.08636271208524704,
      -0.22098207473754883,
      -0.54833984375
    ),
    new THREE.Vector3(
      0.10191938281059265,
      -0.014017125591635704,
      0.01207733154296875
    ),
    new THREE.Vector3(
      -0.10220448672771454,
      0.0036983813624829054,
      -0.0096282958984375
    ),
    new THREE.Vector3(
      0.10957851260900497,
      -0.021649738773703575,
      0.12274169921875
    ),
    new THREE.Vector3(
      -0.10253166407346725,
      0.13496968150138855,
      0.0640869140625
    ),
    new THREE.Vector3(0.09835680574178696, 0.1947239488363266, 0.42138671875),
    new THREE.Vector3(-0.12027254700660706, 0.36928486824035645, 0.35009765625),
    new THREE.Vector3(0.09437084197998047, 0.2111281305551529, 0.451171875),
    new THREE.Vector3(
      -0.11736230552196503,
      0.37959811091423035,
      0.383056640625
    ),
    new THREE.Vector3(0.13412508368492126, 0.23217885196208954, 0.2568359375),
    new THREE.Vector3(-0.14830461144447327, 0.456640362739563, 0.19287109375),
  ]
  var poseData = {}
  var poseCubes = new Array(33)

  //#endregion

  //#region Mediapipe part start
  const videoElement = document.getElementsByClassName('input_video')[0]
  const canvasElement = document.getElementsByClassName('output_canvas')[0]
  canvasElement.width = window.innerWidth
  canvasElement.height = window.innerHeight

  const canvasCtx = canvasElement.getContext('2d')
  const landmarkContainer = document.getElementsByClassName(
    'landmark-grid-container'
  )[0]
  //const grid = new LandmarkGrid(landmarkContainer);

  //#region MAIN MEDIAPIPE CUSTOM LOGIC HERE
  function onResults(results) {
    if (!results.poseLandmarks) {
      return
    }

    results.poseWorldLandmarks.forEach((element, index) => {
      defaultPosePositions[index].x
      posePositions[index] = new THREE.Vector3(
        element.x * element.visibility +
          defaultPosePositions[index].x * (1 - element.visibility),
        element.y * element.visibility +
          defaultPosePositions[index].y * (1 - element.visibility),
        element.z * element.visibility +
          defaultPosePositions[index].z * (1 - element.visibility)
      )
    })
    //console.log(posePositions)

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    // canvasCtx.drawImage(results.segmentationMask, 0, 0,
    // 	canvasElement.width, canvasElement.height);

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in'
    canvasCtx.fillStyle = '#00FF00'
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height)

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop'
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    )

    canvasCtx.globalCompositeOperation = 'source-over'
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#00FF00',
      lineWidth: 4,
    })
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: '#FF0000',
      lineWidth: 2,
    })
    canvasCtx.restore()

    //grid.updateLandmarks(results.poseWorldLandmarks);
  }
  //#endregion
  const pose = new Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    },
  })
  pose.setOptions({
    modelComplexity: 0,
    smoothLandmarks: false,
    enableSegmentation: false,
    smoothSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  })
  pose.onResults(onResults)

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({ image: videoElement })
    },
    width: window.innerWidth,
    height: window.innerHeight,
  })
  camera.start()
  //#endregion

  //#region THREE js part start
  //#region config

  // Create an empty scene
  var scene = new THREE.Scene()

  // Create a basic perspective camera
  var threeDcamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.001,
    1000
  )
  threeDcamera.position.set(0, 0.8, -1)
  threeDcamera.lookAt(new THREE.Vector3(0, 0.5, 0))

  var threeDCanvasObj = document.getElementById('threeDCanvas')
  threeDCanvasObj.width = window.innerWidth
  threeDCanvasObj.height = window.innerHeight

  // Create a renderer with Antialiasing
  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: threeDCanvas,
  })
  renderer.autoClear = false // important!

  // Configure renderer clear color
  renderer.setClearColor(0x000000, 0)

  // Configure renderer size
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Append Renderer to DOM
  //document.body.appendChild( renderer.domElement );
  if (debugMode) {
    // Create a Cube Mesh with basic material
    var geometry = new THREE.BoxGeometry(0.02, 0.02, 0.02)
    var material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    var elbowMat = new THREE.MeshBasicMaterial({ color: '#FF0000' })
    var shoulderMat = new THREE.MeshBasicMaterial({ color: '#0000FF' })
    var hipMat = new THREE.MeshBasicMaterial({ color: '#00FF00' })
    var kneeMat = new THREE.MeshBasicMaterial({ color: '#FFCC00' })
    var ankleMat = new THREE.MeshBasicMaterial({ color: '#000000' })

    var cube = new THREE.Mesh(geometry, material)
    var debugSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 0.03, 0.03),
      new THREE.MeshBasicMaterial({ color: '#FF0000' })
    )
    var debugCylinder = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.01, 0.01),
      new THREE.MeshBasicMaterial({ color: '#FF0000' })
    )
    var debugBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.03, 0.03),
      new THREE.MeshBasicMaterial({ color: '#AA0000' })
    )

    for (var i = 0; i < 33; i++) {
      if (i == 13 || i == 14) {
        poseCubes[i] = new THREE.Mesh(geometry, elbowMat)
      } else if (i == 23 || i == 24) {
        poseCubes[i] = new THREE.Mesh(geometry, hipMat)
      } else if (i == 11 || i == 12) {
        poseCubes[i] = new THREE.Mesh(geometry, shoulderMat)
      } else if (i == 25 || i == 26) {
        poseCubes[i] = new THREE.Mesh(geometry, kneeMat)
      } else if (i == 27 || i == 28) {
        poseCubes[i] = new THREE.Mesh(geometry, ankleMat)
      } else {
        poseCubes[i] = new THREE.Mesh(geometry, material)
      }

      scene.add(poseCubes[i])
    }
    // Add cube to Scene
    scene.add(cube)
    scene.add(debugCylinder)
    scene.add(debugSphere)
    scene.add(debugBox)
  }

  //webcam video texture part
  var width = window.innerWidth
  var height = window.innerHeight
  //let cameraOrtho = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
  let cameraOrtho = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.001,
    1000
  )

  cameraOrtho.position.z = 10
  let sceneOrtho = new THREE.Scene()

  var webcamVideo = document.getElementById('webcam_video')
  const webcamTexture = new THREE.VideoTexture(webcamVideo)
  const webcamPlaneGeo = new THREE.PlaneGeometry(32, 18)
  const webcamPlaneMat = new THREE.MeshBasicMaterial({
    map: webcamTexture,
    side: THREE.DoubleSide,
  })
  const webcamMesh = new THREE.Mesh(webcamPlaneGeo, webcamPlaneMat)
  webcamMesh.position.set(0, 0, 0)
  //webcamMesh.lookAt(threeDcamera)
  sceneOrtho.add(webcamMesh)
  //console.info(cube.matrix);
  //#endregion

  var render = function () {
    requestAnimationFrame(render)
    //#region MAIN THREE.JS CUSTOM LOGIC HERE
    if (posePositions[0]) {
      posePositions.forEach((element, index) => {
        posePositionFlipped[index] = new THREE.Vector3(
          -element.x,
          -element.y,
          element.z
        )
        if (debugMode) {
          poseCubes[index].position.set(
            posePositionFlipped[index].x,
            posePositionFlipped[index].y,
            posePositionFlipped[index].z
          )
        }
      })

      poseData.leftShoulderPos = posePositionFlipped[11]
      poseData.rightShoulderPos = posePositionFlipped[12]
      poseData.shoulderCenterPos = new THREE.Vector3(
        (poseData.leftShoulderPos.x + poseData.rightShoulderPos.x) / 2,
        (poseData.leftShoulderPos.y + poseData.rightShoulderPos.y) / 2,
        (poseData.leftShoulderPos.z + poseData.rightShoulderPos.z) / 2
      )
      poseData.nosePos = posePositionFlipped[0]
      poseData.headVector = new THREE.Vector3()
      poseData.headVector
        .subVectors(poseData.nosePos, poseData.shoulderCenterPos)
        .normalize()

      poseData.leftElbowPos = posePositionFlipped[13]
      poseData.leftArmVector = new THREE.Vector3()
      poseData.leftArmVector
        .subVectors(poseData.leftElbowPos, poseData.leftShoulderPos)
        .normalize()
      poseData.rightElbowPos = posePositionFlipped[14]
      poseData.rightArmVector = new THREE.Vector3()
      poseData.rightArmVector
        .subVectors(poseData.rightElbowPos, poseData.rightShoulderPos)
        .normalize()
      poseData.leftWristPos = posePositionFlipped[15]
      poseData.leftForeArmVector = new THREE.Vector3()
      poseData.leftForeArmVector
        .subVectors(poseData.leftWristPos, poseData.leftElbowPos)
        .normalize()
      poseData.rightWristPos = posePositionFlipped[16]
      poseData.rightForeArmVector = new THREE.Vector3()
      poseData.rightForeArmVector
        .subVectors(poseData.rightWristPos, poseData.rightElbowPos)
        .normalize()

      poseData.leftHipPos = posePositionFlipped[23]
      poseData.leftKneePos = posePositionFlipped[25]
      poseData.leftThighVector = new THREE.Vector3()
      poseData.leftThighVector
        .subVectors(poseData.leftKneePos, poseData.leftHipPos)
        .normalize()
      poseData.leftAnklePos = posePositionFlipped[27]
      poseData.leftLegVector = new THREE.Vector3()
      poseData.leftLegVector
        .subVectors(poseData.leftAnklePos, poseData.leftKneePos)
        .normalize()

      poseData.rightHipPos = posePositionFlipped[24]
      poseData.rightKneePos = posePositionFlipped[26]
      poseData.rightThighVector = new THREE.Vector3()
      poseData.rightThighVector
        .subVectors(poseData.rightKneePos, poseData.rightHipPos)
        .normalize()
      poseData.rightAnklePos = posePositionFlipped[28]
      poseData.rightLegVector = new THREE.Vector3()
      poseData.rightLegVector
        .subVectors(poseData.rightAnklePos, poseData.rightKneePos)
        .normalize()

      poseData.hipCenterPos = new THREE.Vector3(
        (poseData.leftHipPos.x + poseData.rightHipPos.x) / 2,
        (poseData.leftHipPos.y + poseData.rightHipPos.y) / 2,
        (poseData.leftHipPos.z + poseData.rightHipPos.z) / 2
      )
      poseData.hipVector = new THREE.Vector3()
      poseData.hipVector
        .subVectors(poseData.shoulderCenterPos, poseData.hipCenterPos)
        .normalize()

      // poseData.hipVector  = new THREE.Vector3(0.5,0.5,0).normalize()
      //poseData.rightArmVector  = new THREE.Vector3(-0.5,0,-0.5).normalize()
      //console.log(poseData.headVector)
    }
    if (bodyNodes.root) {
      // reset rotation
      bodyNodes.root.position.set(0, 0, 0)
      bodyNodes.root.scale.set(1, 1, 1)
      //bodyNodes.root.rotation.set(-Math.PI, 0, Math.PI)
      bodyNodes.root.rotation.set(0, 0, 0)
      bodyNodes.controller.rotation.set(0, 0, 0)
      bodyNodes.hip.rotation.set(0, 0, 0)
      bodyNodes.chest.rotation.set(0, 0, 0)
      bodyNodes.head.rotation.set(0, 0, 0)
      bodyNodes.leftArm.rotation.set(0, 0, 0)
      bodyNodes.rightArm.rotation.set(0, 0, 0)
      bodyNodes.leftForeArm.rotation.set(0, 0, 0)
      bodyNodes.rightForeArm.rotation.set(0, 0, 0)
      bodyNodes.leftThigh.rotation.set(0, 0, 0)
      bodyNodes.rightThigh.rotation.set(0, 0, 0)

      if (debugMode) {
        debugCylinder.quaternion.setFromUnitVectors(
          new THREE.Vector3(-1, 0, 0),
          poseData.rightArmVector.clone().normalize()
        )
      }
      bodyNodes.hip.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        poseData.hipVector.clone().normalize()
      )

      // Arms part
      // Firstly rorate the arm along the left axis
      bodyNodes.rightArm.quaternion.setFromUnitVectors(
        new THREE.Vector3(-1, 0, 0),
        poseData.leftArmVector
      )
      // get the invert rotation of the parent(hip)
      var hipWorldQuatInvert = new THREE.Quaternion()
      bodyNodes.hip.getWorldQuaternion(hipWorldQuatInvert)
      hipWorldQuatInvert.invert()
      // apply the invert rotation to the arm, to compensate the rotation of the parent
      bodyNodes.rightArm.applyQuaternion(hipWorldQuatInvert)
      // Apply these value to the other arm
      bodyNodes.leftArm.quaternion.setFromUnitVectors(
        new THREE.Vector3(1, 0, 0),
        poseData.rightArmVector
      )
      // apply the invert rotation to the arm, to compensate the rotation of the parent
      bodyNodes.leftArm.applyQuaternion(hipWorldQuatInvert)
      // - head part
      bodyNodes.head.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        poseData.headVector
      )
      bodyNodes.head.applyQuaternion(hipWorldQuatInvert)
      const headAdjustQuat = new THREE.Quaternion()
      headAdjustQuat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 5)
      bodyNodes.head.applyQuaternion(headAdjustQuat)
      // - left Thigh part
      bodyNodes.leftThigh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, -1, 0),
        poseData.rightThighVector
      )
      bodyNodes.leftThigh.applyQuaternion(hipWorldQuatInvert)
      // - right Thigh part
      bodyNodes.rightThigh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, -1, 0),
        poseData.leftThighVector
      )
      bodyNodes.rightThigh.applyQuaternion(hipWorldQuatInvert)

      // ForeArms part
      // Rotate the right fore arm based on the direction
      bodyNodes.rightForeArm.quaternion.setFromUnitVectors(
        new THREE.Vector3(-1, 0, 0),
        poseData.leftForeArmVector
      )
      // get the invert rotation of the parent
      var rightArmWorldQuatInvert = new THREE.Quaternion()
      bodyNodes.rightArm.getWorldQuaternion(rightArmWorldQuatInvert)
      rightArmWorldQuatInvert.invert()
      // apply the invert rotation of the parent to compensate
      bodyNodes.rightForeArm.applyQuaternion(rightArmWorldQuatInvert)

      // Rotate the left fore arm based on the direction
      bodyNodes.leftForeArm.quaternion.setFromUnitVectors(
        new THREE.Vector3(1, 0, 0),
        poseData.rightForeArmVector
      )
      // get the invert rotation of the parent
      var leftArmWorldQuatInvert = new THREE.Quaternion()
      bodyNodes.leftArm.getWorldQuaternion(leftArmWorldQuatInvert)
      leftArmWorldQuatInvert.invert()
      // apply the invert rotation of the parent to compensate
      bodyNodes.leftForeArm.applyQuaternion(leftArmWorldQuatInvert)

      // Legs part
      // Rotate the right leg based on the direction
      bodyNodes.rightLeg.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, -1, 0),
        poseData.leftLegVector
      )
      // get the invert rotation of the parent
      var rightThighWorldQuatInvert = new THREE.Quaternion()
      bodyNodes.rightThigh.getWorldQuaternion(rightThighWorldQuatInvert)
      rightThighWorldQuatInvert.invert()
      // apply the invert rotation of the parent to compensate
      bodyNodes.rightLeg.applyQuaternion(rightThighWorldQuatInvert)

      // Rotate the left legbased on the direction
      bodyNodes.leftLeg.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, -1, 0),
        poseData.rightLegVector
      )
      // get the invert rotation of the parent
      var leftThighWorldQuatInvert = new THREE.Quaternion()
      bodyNodes.leftThigh.getWorldQuaternion(leftThighWorldQuatInvert)
      leftThighWorldQuatInvert.invert()
      // apply the invert rotation of the parent to compensate
      bodyNodes.leftLeg.applyQuaternion(leftThighWorldQuatInvert)

      //debugSphere.position.set(worldLeft.x, worldLeft.y, worldLeft.z)
      if (debugMode) {
        debugBox.position.set(
          poseData.rightArmVector.x,
          poseData.rightArmVector.y,
          poseData.rightArmVector.z
        )
      }

      // var leftLegAxis = new THREE.Vector3(1,0,0)
      // bodyNodes.leftLeg.quaternion.setFromUnitVectors(leftLegAxis, poseData.leftLegVector);

      // var rightLegAxis = new THREE.Vector3(0,-1,0)
      // bodyNodes.rightLeg.quaternion.setFromUnitVectors(rightLegAxis, poseData.rightLegVector);

      //cube.position.set(poseData.nosePos)
    }

    renderer.clear()
    // render the video
    renderer.render(sceneOrtho, cameraOrtho)
    renderer.clearDepth()
    // render the actual scene
    renderer.render(scene, threeDcamera)
    //#endregion
  }

  function init(assetUrl) {
    console.log('start init')

    const loader = new GLTFLoader()
    //models/gltf/nft/body.gltf
    //https://storage.opensea.io/files/9b17d37cd81949df47735fea9118529c.gltf
    loader.load(assetUrl, function (gltf) {
      gltf.scene.scale.set(0.01, 0.01, 0.01)
      bodyNodes.root = gltf.scene.children[0]
      bodyNodes.controller = gltf.scene.children[0].children[1]
      bodyNodes.hip = gltf.scene.children[0].children[1].children[1]
      bodyNodes.chest =
        gltf.scene.children[0].children[1].children[1].children[0]
      bodyNodes.rightThigh =
        gltf.scene.children[0].children[1].children[1].children[1]
      bodyNodes.rightLeg =
        gltf.scene.children[0].children[1].children[1].children[1].children[0]
      bodyNodes.rightFoot =
        gltf.scene.children[0].children[1].children[1].children[1].children[0].children[0]

      bodyNodes.leftThigh =
        gltf.scene.children[0].children[1].children[1].children[2]
      bodyNodes.leftLeg =
        gltf.scene.children[0].children[1].children[1].children[2].children[0]
      bodyNodes.leftFoot =
        gltf.scene.children[0].children[1].children[1].children[2].children[0].children[0]

      bodyNodes.head =
        gltf.scene.children[0].children[1].children[1].children[0].children[0]
      bodyNodes.leftArm =
        gltf.scene.children[0].children[1].children[1].children[0].children[1]
      bodyNodes.rightArm =
        gltf.scene.children[0].children[1].children[1].children[0].children[2]
      bodyNodes.leftForeArm =
        gltf.scene.children[0].children[1].children[1].children[0].children[1].children[0]
      bodyNodes.rightForeArm =
        gltf.scene.children[0].children[1].children[1].children[0].children[2].children[0]
      bodyNodes.leftHand =
        gltf.scene.children[0].children[1].children[1].children[0].children[1].children[0].children[0]
      bodyNodes.rightHand =
        gltf.scene.children[0].children[1].children[1].children[0].children[2].children[0].children[0]

      console.log(bodyNodes)

      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          console.log(child.name)
        }
      })
      scene.add(gltf.scene)
      if (debugMode) {
        const axesHelper = new THREE.AxesHelper(2)
        scene.add(axesHelper)
      }
      // add directional light
      // White directional light at half intensity shining from the top.
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(0.4, 0.3, -0.7)
      scene.add(directionalLight)
      directionalLight.target = bodyNodes.root

      render()
    })
    window.addEventListener('resize', onWindowResize)
    // const controls = new OrbitControls( threeDcamera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // use if there is no animation loop
    // controls.minDistance = 0.5;
    // controls.maxDistance = 10;
    // controls.target.set( 0, 0, - 0.2 );
    //controls.update();
  }
  function onWindowResize() {
    threeDcamera.aspect = window.innerWidth / window.innerHeight
    threeDcamera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

    render()
  }
  // Render Loop
  init(assetUrl)
  render()
}
