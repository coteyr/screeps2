

module.exports.loop = function() {
  _.forEach(Game.rooms, function(room){
    room.tick()
  })
  _.forEach(Game.spawns, function(spawn){
    spawn.tick()
  })
  _.forEach(Game.creeps, function(creep){
    creep.tick()
  })
}
