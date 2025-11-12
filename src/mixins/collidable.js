export default {
  addCollider(otherGameObject, callback) {
    this.scene.physics.add.collider(this, otherGameObject, callback, null, this);
    return this;
  },

  bodyPositionDifferenceX: 0,
  prevRay: null,
  prevHasHit: null,

   raycast(body, layer, rayLength = 40, precision = 0) {
    const { x, y, width, halfHeight } = body;
    // console.log(halfHeight)
    this.bodyPositionDifferenceX += body.x - body.prev.x;
    if (Math.abs((this.bodyPositionDifferenceX) <= precision) && this.prevHasHit !== null) {
      return {
        ray: this.prevRay,
        hasHit: this.prevHasHit,
      }
    }
    console.info('hasHit')
    const line = new Phaser.Geom.Line();
    let hasHit = false;

    line.x1 = x + width;
    line.y1 = y + halfHeight;
    line.x2 = line.x1 + rayLength;
    line.y2 = line.y1 + rayLength;

    const hits = layer.getTilesWithinShape(line);

    if (hits.length > 0) {
      // console.log(hits.some(hit => hit.index !== -1))
      // if (hits.length === 3) console.log(hits)
      hasHit = this.prevHasHit = hits.some(hit => hit.index !== -1);
    }

    this.prevRay = line;
    this.bodyPositionDifferenceX = 0;

    return { ray: line, hasHit };
  },
};
