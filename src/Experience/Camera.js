import * as THREE from "three";
import Experience from "./Experience.js";
import Raycaster from "./Raycaster.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.pressedKeys = [];
    this.speed = 0.03 * this.time.delta;
    this.raycaster = new Raycaster();
    this.isMoveAllow = true;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      300
    );
    this.instance.position.set(40, 4, -40);
    this.instance.rotation.y = Math.PI * 0.75;
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new PointerLockControls(this.instance, this.canvas);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (
      (this.pressedKeys["w"] || this.pressedKeys["ArrowUp"]) &&
      this.isMoveAllow
    ) {
      this.controls.moveForward(this.speed);
    }
    if (
      (this.pressedKeys["s"] || this.pressedKeys["ArrowDown"]) &&
      this.isMoveAllow
    ) {
      this.controls.moveForward(-this.speed);
    }
    if (
      (this.pressedKeys["d"] || this.pressedKeys["ArrowRight"]) &&
      this.isMoveAllow
    ) {
      this.controls.moveRight(this.speed);
    }
    if (
      (this.pressedKeys["a"] || this.pressedKeys["ArrowLeft"]) &&
      this.isMoveAllow
    ) {
      this.controls.moveRight(-this.speed);
    }
  }
}

//adding fog
// find stuff
