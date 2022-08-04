import * as THREE from "three";
import Experience from "./Experience";
import EventEmitter from "./Utils/EventEmitter";

export default class Raycaster extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.isAllow = true;
    this.castElement = [];

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.Raycaster();
  }

  castRaycaster() {
    this.instance.setFromCamera(new THREE.Vector2(), this.camera.instance);

    let res = this.instance.intersectObjects(this.castElement);
    if (
      res &&
      (res[0]?.object.name === "Key_01" ||
        res[0]?.object.name === "Key_01001" ||
        res[0]?.object.name === "Key_01002")
    ) {
      this.trigger("touch");
    } else if (res && res[0]?.distance <= 10 && res[0]?.distance > 1) {
      this.trigger("notAllow");
    } else if (res && res[0]?.distance <= 1) {
      this.trigger("backToCenter");
    } else {
      this.trigger("allow");
    }
  }

  update() {
    this.castRaycaster();
  }
}
