/*
* @Author: Robert D. Cotey II <coteyr@coteyr.net>
* @Date:   2020-06-30 00:16:41
* @Last Modified by:   Robert D. Cotey II <coteyr@coteyr.net>
* @Last Modified time: 2020-06-30 00:25:32
*/

class Range {
  static get_range(source, destination) {
    range = 1000
    if(source.isArray()) {
      _.forEach(source, function(s){
        test = s.getRangeTo(destination)
        if(test < range) {
          range = test
        }
      })
    } else {
      range = source.getRangeTo(destination)
    }
    return range
  }

  static within_range(source, destination, min, max) {
    range = get_range(source, destination)
    return range >= min && range <= max
  }
}
