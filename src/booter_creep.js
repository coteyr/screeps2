/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-29 18:37:22
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 00:03:55
*/

Creep.prototype.booter_tick = function() {
  if(this.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
    this.memory.mode = 'mine'
  }
  if(this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
    this.memory.mode = 'dump'
  }

  if(this.memory.mode == 'mine') {
    if(this.memory.target) {
      target = Game.getObjectById(this.memory.target)
      if(!target) this.memory.target = null

      if(this.pos.isNearTo(target)){
        this.harvest(target)
      } else {
        this.moveTo(target)
      }
    } else {
      sources = this.room.find(FIND_SOURCES)
      on = 0
      target = sources[0]
      if(sources.length == 1) {
        this.memory.target = sources[0].id
      }
      target = _.first(_.sortBy(sources, function(s){ return _.filter(Game.creeps, function(c) { return c.memory.target == s.id}).length }))
      this.memory.target = target.id


    }
  }

  if(this.memory.mode == 'dump') {
    this.memory.target = null
    if(this.pos.inRangeTo(this.room.controller, 3)) {
      this.upgradeController(this.room.controller)
    } else {
      this.moveTo(this.room.controller)
    }
  }
}
