/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-29 18:37:22
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 01:09:21
*/

class BooterCreep extends Creep {
  tick() {
    this.set_mode()
    if(this.mode() === 'mine') this.mine()

    if(this.mode() === 'dump') this.dump()
  }

  dump() {
    this.clear_target()
    if(this.pos.inRangeTo(this.room.controller, 3)) {
      this.upgradeController(this.room.controller)
    } else {
      this.moveTo(this.room.controller)
    }
  }

  mine() {
    if(this.target()) {
      let target = this.target()
      if(this.pos.isNearTo(target)){
        this.harvest(target)
      } else {
        this.moveTo(target)
      }
    } else {
      this.target(Targeting.source(this.pos))
    }
  }

  set_mode() {
    if(this.store.getUsedCapacity(RESOURCE_ENERGY) == 0) this.mode('mine')
    if(this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) this.mode('dump')
  }
}
