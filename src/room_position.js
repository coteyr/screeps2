/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-30 01:04:08
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 01:06:27
*/

RoomPosition.prototype.room = function() {
  let room = Game.rooms[this.roomName]
  return room
}
