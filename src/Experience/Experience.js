import * as THREE from "three";
import gsap from "gsap";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import Raycaster from "./Raycaster.js";

let instance = null;

export default class Experience {
  constructor(
    _canvas,
    mainButton,
    cover,
    welcomeCover,
    continueButton,
    clickBtn,
    numKeys,
    clickBtnCover,
    progressHolder,
    progressText,
    progressValue
  ) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = _canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(
      sources,
      progressHolder,
      progressText,
      progressValue
    );
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.raycaster = new Raycaster();
    this.world = new World();

    this.numKeys = 3;

    // Listen event
    mainButton.addEventListener("click", (e) => {
      mainButton.style.display = "none";
      cover.style.display = "none";

      setTimeout(() => {
        welcomeCover.style.visibility = "visible";
        gsap.to(welcomeCover, { opacity: 1, duration: 1 });
      }, 3000);

      if (this.world.earth) {
        this.world.earth.startJourney();
      }
    });

    continueButton.addEventListener("click", (e) => {
      this.world.earth.mesh.visible = false;
      numKeys.style.display = "block";
      gsap.to(welcomeCover, {
        opacity: 0,
        duration: 1,
      });

      clickBtnCover.style.display = "block";
      this.world.house.model.visible = true;
      setTimeout(() => {
        welcomeCover.style.visibility = "hidden";
      }, 2000);

      continueButton.style.display = "none";
      if (this.world.earth) {
        this.world.earth.startJourney();
      }
    });
    clickBtn.addEventListener("click", () => {
      this.camera.controls.lock();
    });
    if (!this.raycaster.isAllow) {
      this.camera.pressedKeys = [];
    }
    window.addEventListener("keydown", (e) => {
      if (this.camera.controls.isLocked) this.camera.pressedKeys[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      if (this.camera.controls.isLocked) this.camera.pressedKeys[e.key] = false;
    });
    this.camera.controls.addEventListener("lock", () => {
      clickBtnCover.style.display = "none";
    });
    this.camera.controls.addEventListener("unlock", () => {
      clickBtnCover.style.display = "block";
    });

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });

    // Raycaster event
    this.raycaster.on("notAllow", () => {
      this.camera.isMoveAllow = false;
    });
    this.raycaster.on("backToCenter", () => {
      this.camera.instance.position.set(40, 4, -40);
    });
    this.raycaster.on("allow", () => {
      this.camera.isMoveAllow = true;
    });
    this.raycaster.on("touch", () => {
      if (
        this.camera.instance.position.x <= -10 &&
        this.camera.instance.position.x >= -30 &&
        this.camera.instance.position.z <= -20 &&
        this.camera.instance.position.z >= -40
      ) {
        let child = this.world.house.model.children.find(
          (child) => child.name === "Key_01"
        );
        if (!child.visible) return;
        child.visible = false;
        this.numKeys--;
        numKeys.innerHTML =
          this.numKeys > 1
            ? `${this.numKeys} Keys left`
            : this.numKeys === 1
            ? `${this.numKeys} Key left`
            : "All keys found!";
        this.numKeys !== 0
          ? this.playSound("/sounds/collect.wav")
          : this.playSound("/sounds/win.wav");
      } else if (
        this.camera.instance.position.x >= 45 &&
        this.camera.instance.position.x <= 65 &&
        this.camera.instance.position.z <= -50 &&
        this.camera.instance.position.z >= -70
      ) {
        let child = this.world.house.model.children.find(
          (child) => child.name === "Key_01001"
        );
        if (!child.visible) return;
        child.visible = false;
        this.numKeys--;
        numKeys.innerHTML =
          this.numKeys > 1
            ? `${this.numKeys} Keys left`
            : this.numKeys === 1
            ? `${this.numKeys} Key left`
            : "All keys found!";
        this.numKeys !== 0
          ? this.playSound("/sounds/collect.wav")
          : this.playSound("/sounds/win.wav");
      } else if (
        this.camera.instance.position.x <= 60 &&
        this.camera.instance.position.x >= 40 &&
        this.camera.instance.position.z >= 15 &&
        this.camera.instance.position.z <= 35
      ) {
        let child = this.world.house.model.children.find(
          (child) => child.name === "Key_01002"
        );
        if (!child.visible) return;
        child.visible = false;
        this.numKeys--;
        numKeys.innerHTML =
          this.numKeys > 1
            ? `${this.numKeys} Keys left`
            : this.numKeys === 1
            ? `${this.numKeys} Key left`
            : "All keys found!";
        this.numKeys !== 0
          ? this.playSound("/sounds/collect.wav")
          : this.playSound("/sounds/win.wav");
      }
    });
  }

  playSound(path) {
    if (typeof window.Audio === "function") {
      var audioElem = new Audio();
      audioElem.src = path;
      audioElem.play();
    }
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
    this.raycaster.update();
  }
}
