import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunLight();
    this.setAmbientLight();
    this.setPointLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#b9d5ff", 0.2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(30, -100, -15);
    this.scene.add(this.sunLight);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight("#b9d5ff", 0.1);

    this.scene.add(this.ambientLight);
  }

  setPointLight() {
    this.pointLight = new THREE.PointLight(0xff9000, 1);
    this.pointLight.position.set(-32.7, 9.3, 33);

    this.pointLight1 = new THREE.PointLight(0xff9000, 1);
    this.pointLight1.position.set(61.2, 9.3, 33);

    this.pointLight2 = new THREE.PointLight(0xff9000, 1);
    this.pointLight2.position.set(61.2, 9.3, -70);

    this.pointLight3 = new THREE.PointLight(0xff9000, 1);
    this.pointLight3.position.set(0, 9.3, -70);

    this.pointLight4 = new THREE.PointLight(0xff9000, 1);
    this.pointLight4.position.set(-32.7, 9.3, -40);

    this.scene.add(
      this.pointLight,
      this.pointLight1,
      this.pointLight2,
      this.pointLight3,
      this.pointLight4
    );
  }
}
