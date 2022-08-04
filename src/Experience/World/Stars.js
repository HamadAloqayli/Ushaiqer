import * as THREE from "three";
import Experience from "../Experience";
export default class Stars {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.createStars();
  }

  createStars() {
    this.geometry = new THREE.BufferGeometry();
    const count = 1000;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 1000;
      positions[i3 + 1] = (Math.random() - 0.5) * 1;
      positions[i3 + 2] = (Math.random() - 0.5) * 1000;
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    this.material = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
    });
    this.stars = new THREE.Points(this.geometry, this.material);
    this.stars.position.y = 100;
    this.scene.add(this.stars);
  }
}
