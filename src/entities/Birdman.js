import Enemy from './Enemy';
import initAnimations from '../animations/birdmanAnims';

class Birdman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'birdman');
    this.init();
    initAnimations(scene.anims);
  }

  update(time, delta) {
    super.update(time, delta);
    this.play('birdman-idle', true);
  }
}

export default Birdman;
