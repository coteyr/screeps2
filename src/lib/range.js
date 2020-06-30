/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-30 00:16:41
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 01:57:54
*/

class Range {
  static get_range(source, destination) {
    let range = 1000
    if(Array.isArray(source)) {
      _.forEach(source, function(s){
        if(s.pos !== undefined) s = s.pos
        let test = destination.getRangeTo(s.x, s.y, destination.roomName)
        if(test < range) {
          range = test
        }
      })
    } else {
      range = destination.getRangeTo(source.x, source,y, destination.roomName)
    }
    return range
  }

  static within_range(source, destination, min, max) {
    let range = Range.get_range(source, destination)
    console.log('range: ' + range)

    return range >= min && range <= max
  }
}
