import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Earth from "./Earth.js";
import House from "./House.js";
import Stars from "./Stars.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.earth = new Earth();
      this.house = new House();
      this.stars = new Stars();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.earth) this.earth.update();
  }
}
