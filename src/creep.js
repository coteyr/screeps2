/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-29 17:04:55
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-29 19:03:20
*/


Creep.prototype.tick = function() {
  if(this.job() == 'booter') this.booter_tick()
}

Creep.prototype.job = function() {
  return this.memory.job
}

