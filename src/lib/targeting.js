/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-30 00:58:43
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 01:06:37
*/

class Targeting {
  static source(pos) {
    let sources = pos.room().find(FIND_SOURCES)
    let on = 0
    let target = sources[0]
    if(sources.length == 1) {
      target = sources[0]
    } else {
      target = _.first(_.sortBy(sources, function(s){ return _.filter(Game.creeps, function(c) { return c.memory.target == s.id}).length }))
    }
    return target
  }
}
