/* global THREE */
'use strict';

class Ghost { // eslint-disable-line no-unused-vars
  constructor(scene) {
    this.scene = scene;
    this.ghost = null;
  }

  addGhost(modelName) {
    this.ghost = new THREE.Object3D();
    this.ghost.userData.isGhost = true;

    var model = '/robot-designer/assets/models/' + modelName + '/model.x3d';
    var loader = new THREE.X3DLoader();
    loader.load(model, (object3dList) => {
      if (!this.ghost || !Array.isArray(object3dList) || object3dList.length === 0)
        return;
      this.ghost.add(object3dList[0]);
      this.ghost.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = 0.5;
        }
      });
    });

    this.scene.add(this.ghost);
  }

  moveGhostToFloor(projection) {
    this.scene.add(this.ghost);
    this.ghost.position.copy(projection);
  }

  moveGhostToSlot(slot) {
    this.ghost.position.copy(new THREE.Vector3());
    slot.add(this.ghost);
  }

  removeGhost() {
    this.ghost.parent.remove(this.ghost);
    this.ghost = null;
  }
}
