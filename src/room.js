/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-29 13:24:02
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 02:02:32
*/


Room.prototype.tick = function() {
  this.generate_map()
  if(this.is_mine) {
    console.log('Ticking: My Room: ' + this.name)
    if(this.need_booters()) {
      console.log('need booters')
      let queue = Memory.queue
      if(!queue) queue = []
      queue.push({room: this.name, job: 'booter', priority: 1})
      Memory.queue = queue
    }


  } else {
    console.log('Ticking: Other Room: ' + this.name)
  }
  this.map()

}

Room.prototype.is_mine = function() {
  return this.controller && this.controller.my
}

Room.prototype.level = function() {
  if(this.controller) {
    return this.controller.level
  } else {
    return 0
  }
}
Room.prototype.clear_map = function() {
  this.memory.map = null
}

Room.prototype.map = function() {
  if(this.memory.map == null) return false

  let rv = new RoomVisual(this.name)
  _.forEach(this.memory.map.mining_spots, function(mining_spot){
    rv.text('\u26CF', mining_spot)
  })
  _.forEach(this.memory.map.construction_targets, function(target){
    rv.text('\u{1F6A7}', target)
  })
  _.forEach(this.memory.map.towers, function(tower){
    if(tower) rv.text('\u{1f5fc}', tower)
  })
  _.forEach(this.memory.map.storage, function(storage){
    if(storage) rv.text('\u{1f6e2}', storage)
  })
}

Room.prototype.generate_map = function() {
  if(!this.is_mine) return false

  if(this.memory.map == null) {
      this.memory.map = {}
  }

  this.map_mining_spots()
  this.map_construction_targets()
  this.map_towers()
  this.map_storage()
}
Room.prototype.queued = function(job) {
  let room = this
  queue = _.filter(Memory.queue, function(q) { return q.job == job && q.room == room.name })
  if(queue) return queue

  return []
}
Room.prototype.creeps = function() {
  let room = this
  return _.filter(Game.creeps, function(c) { return c.room.name == room.name })
}

Room.prototype.miners = function() {
  return _.filter(this.creeps(), function(c) { return c.job() == 'mine' })
}

Room.prototype.booters = function() {
  return _.filter(this.creeps(), function(c) { return c.job() == 'booter' })
}

Room.prototype.need_miners = function() {
  if(room.level == 1 || room.level == 2) return false
}

Room.prototype.need_booters = function() {
  count = this.booters().length + this.queued('booter').length
  if(count > this.memory.map.mining_spots.length) return false

  if(this.level() == 1 && count < 10) return true

  if(this.level() == 2 && count < 10) return true

  return false
}

Room.prototype.map_storage = function() {
  let room = this
  if(this.memory.map.storage && this.memory.map.storage.length > 0) return false

  console.log('doing it')
  let locations = this.memory.map.construction_targets
  let choices = _.filter(locations, function(l) { return (new RoomPosition(l.x, l.y, room.name).inRangeTo(room.find(FIND_MY_SPAWNS)[0].pos, 5)) })
  choices = _.sortBy(choices, function(c) { return (new RoomPosition(c.x, c.y, room.name).getRangeTo(room.controller.pos)) })
  if(choices.length <= 0) return false
  let choice = _.first(choices)
  _.remove(locations, function(l) { return l.x == choice.x && l.y == choice.y})
  this.memory.map.construction_targets = locations
  this.memory.map.storage = [choice]



}

Room.prototype.spawns = function() {
  return this.find(FIND_MY_SPAWNS)
}

Room.prototype.map_towers = function() {
  let room = this
  if(this.memory.map.towers && this.memory.map.towers.length > 0) return false

  locations = this.memory.map.construction_targets
  level1 = _.find(locations, function(s){ return Range.within_range(room.spawns(), new RoomPosition(s.x, s.y, room.name), 1, 3) })
  if(level1) _.remove(locations, function(l) { return l.x == level1.x && l.y == level1.y})
  level2 = _.find(locations, function(s){ return Range.within_range(room.spawns(), new RoomPosition(s.x, s.y, room.name), 2, 5) })
  if(level2) _.remove(locations, function(l) { return l.x == level2.x && l.y == level2.y})
  bigx = _.last(_.sortBy(locations, function(l) { return l.x }))
  smallx = _.first(_.sortBy(locations, function(l) { return l.x }))
  bigy = _.last(_.sortBy(locations, function(l) { return l.y }))
  smally = _.first(_.sortBy(locations, function(l) { return l.y }))

  top_left = new RoomPosition(smallx.x, smally.y, this.name)
  top_right = new RoomPosition(bigx.x, smally.y, this.name)
  bot_left = new RoomPosition(smallx.x, bigy.y, this.name)
  bot_right = new RoomPosition(bigx.x, bigy.y, this.name)


  level3 = _.first(_.sortBy(locations, function(l) { return top_right.getRangeTo(l.x, l.y) }))
  level4 = _.first(_.sortBy(locations, function(l) { return bot_right.getRangeTo(l.x, l.y)  }))
  level5 = _.first(_.sortBy(locations, function(l) { return top_left.getRangeTo(l.x, l.y)  }))
  level6 = _.first(_.sortBy(locations, function(l) { return bot_left.getRangeTo(l.x, l.y) }))
  if(level3) _.remove(locations, function(l) { return l.x == level3.x && l.y == level3.y})
  if(level4) _.remove(locations, function(l) { return l.x == level4.x && l.y == level4.y})
  if(level5) _.remove(locations, function(l) { return l.x == level5.x && l.y == level5.y})
  if(level6) _.remove(locations, function(l) { return l.x == level6.x && l.y == level6.y})

  this.memory.map.towers = [level1, level2, level3, level4, level5, level6]
  this.memory.map.construction_targets = locations
}

Room.prototype.prune_construction_targets = function() {
  room = this
  if(this.memory.map.construction_targets && this.memory.map.construction_targets.length < 0 ) return false
  locations = this.memory.map.construction_targets
  _.remove(locations, function(spot){
    s = new RoomPosition(spot.x, spot.y, room.name)
    rem = false
    _.forEach(room.memory.map.mining_spots, function(mining_spot) {
      console.log(s.getRangeTo(mining_spot.x, mining_spot.y))
      if(s.getRangeTo(mining_spot.x, mining_spot.y) <= 1) rem = true
    })
    if(_.filter(room.lookForAtArea(LOOK_TERRAIN, s.y - 1, s.x - 1, s.y + 1, s.x + 1, true), function(t) { return t.terrain == 'wall'}).length > 0) rem = true

    return rem
  })

  this.memory.map.construction_targets = locations
}

Room.prototype.map_construction_targets = function() {
  if(this.memory.map.construction_targets && this.memory.map.construction_targets.length > 0 ) return false

  let sources = this.spawns()
  let locations = Mapping.find_open_ground(sources, 10, true, 1)
  this.memory.map.construction_targets = locations
  this.prune_construction_targets()
}

Room.prototype.map_mining_spots = function() {
  if(this.memory.map.mining_spots) return false

  let sources = this.find(FIND_SOURCES)
  let locations = Mapping.find_open_ground(sources, 1, false)
  this.memory.map.mining_spots = locations
}
