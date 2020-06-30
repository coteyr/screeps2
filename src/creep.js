/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-29 17:04:55
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 01:08:45
*/


Creep.prototype.tick = function() {
  if(this.job() == 'booter') Object.setPrototypeOf(this, BooterCreep.prototype)

  this.tick()
}

Creep.prototype.job = function() {
  return this.memory.job
}

Creep.prototype.mode = function() {
  return this.memory.mode
}

Creep.prototype.mode = function(value) {
  if (value === undefined) return this.memory.mode

  this.memory.mode = value
}

Creep.prototype.target = function(value) {
  if (value === undefined) {
    let target = Game.getObjectById(this.memory.target)
    if(!target) {
      this.memory.target = null
      target = null
    }
    return target
  } else {
    if(typeof value.id !== 'undefined') {
      this.memory.target = value.id
    } else {
      this.memory.target = value
    }
  }
}

Creep.prototype.clear_target = function() {
  this.memory.target = null
}
