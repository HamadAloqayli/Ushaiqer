import * as THREE from "three";
import gsap from "gsap";
import Experience from "../Experience";

export default class Earth {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.movement = true;

    this.getResources();
    this.createEarth();
  }

  getResources() {
    this.colorTexture = this.resources.items.earthDayColorTexture;
    this.colorTexture.encoding = THREE.sRGBEncoding;

    this.normalTexture = this.resources.items.earthNormalTexture;
    this.normalTexture.encoding = THREE.sRGBEncoding;

    this.specularTexture = this.resources.items.earthSpecularTexture;
    this.specularTexture.encoding = THREE.sRGBEncoding;
  }

  createEarth() {
    const geometry = new THREE.SphereGeometry(12, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: this.colorTexture,
      normalMap: this.normalTexture,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = 3;
    this.scene.add(this.mesh);
  }

  earthMovement() {
    if (this.movement) this.mesh.rotation.y = this.time.elapsed * 0.00015;
  }

  startJourney() {
    this.movement = false;
    gsap.to(this.mesh.rotation, { x: -0.33, y: 6.3, z: -0.22, duration: 2 });
    gsap.to(this.mesh.scale, { x: 5, y: 5, z: 5, duration: 3, delay: 2 });
  }

  update() {
    this.earthMovement();
  }
}
