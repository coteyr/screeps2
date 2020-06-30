/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-30 01:11:48
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 02:02:15
*/

class Mapping {
  static find_open_ground(sources, range, checker, border) {
    let locations = []
    if(!Array.isArray(sources)) sources = [sources]
    _.forEach(sources, function(source) {
      let spots = source.room.lookForAtArea(LOOK_TERRAIN, source.pos.y - range, source.pos.x - range, source.pos.y + range, source.pos.x + range, true)
      let room = source.room
      _.forEach(spots, function(spot) {
        if(spot.type == 'terrain' && spot.terrain == 'plain' || spot.terrain == 'swamp') {
          if(checker) {
            if((spot.x % 2 == 0 && spot.y % 2 != 0) || (spot.x % 2 != 0 && spot.y % 2 == 0)) {
              if((border && source.pos.getRangeTo(spot.x, spot.y) > border) || !border) locations.push(new RoomPosition(spot.x, spot.y, room.name))
            }
          }  else {
            if((border && source.pos.getRangeTo(spot.x, spot.y) > border) || !border) locations.push(new RoomPosition(spot.x, spot.y, room.name))
          }
        }
      })
    })
    return locations
  }
}
