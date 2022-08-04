import * as THREE from "three";
import Experience from "../Experience";
import windows from "../Data/windows";

export default class House {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.raycaster = this.experience.raycaster;
    this.resource = this.resources.items.houseModel;

    this.createHouse();
  }

  createHouse() {
    this.model = this.resource.scene;
    this.model.visible = false;
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name === "Cube003") {
          child.material.map = null;
          child.material.color.set("#AB7343");
        }
        if (
          child.name === "Cube003" ||
          child.name === "Cube343" ||
          child.name === "Plane001" ||
          child.name === "Cube001" ||
          child.name === "Cube002" ||
          child.name === "Key_01" ||
          child.name === "Key_01001" ||
          child.name === "Key_01002"
        ) {
          this.raycaster.castElement.push(child);
        }
        if (windows.includes(child.name)) {
          child.material = new THREE.MeshPhysicalMaterial();
          child.material.roughness = 0.3;
          child.material.color.set(0xffffff);
          child.material.ior = 1.5;
          child.material.transmission = 0.5;
          child.material.opacity = 0.5;
        }
        if (child.name === "Cube650") {
          child.material.roughness = 0.7;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }
}
