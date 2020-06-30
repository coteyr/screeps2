/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-29 17:40:29
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-29 20:53:00
*/

'use strict';

StructureSpawn.prototype.tick = function() {
  if(this.spawning) {
    console.log('Spawning')
  } else {
    if(Memory.queue.length > 0) {
      this.spawn_creep()
    }
  }
}

StructureSpawn.prototype.spawn_creep = function() {
  spawn = this
  queue = _.sortBy(Memory.queue, function(q) { return q.priority })
  item = _.first(_.filter(queue, function(q) { return q.room == spawn.room.name }))
  console.log(item)
  if(item) {
    body = BODIES[item.job][this.room.level().toString()]

    name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log(this.spawnCreep(body.body, name, {memory: {room: this.room.name, job: item.job}, dryRun: true}))
    if(this.spawnCreep(body.body, name, {memory: {room: this.room.name, job: item.job}, dryRun: true}) == OK) {
      if(this.spawnCreep(body.body, name, {memory: {room: this.room.name, job: item.job}}) == OK) {
        index = _.indexOf(queue, item)
        if(index > -1) {
          queue.splice(index, 1)
        }
      }
    }
  } else {
    // spawn for remotes
  }
  Memory.queue = queue
}
