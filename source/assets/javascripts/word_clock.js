(function() {
  var Clock,
      hourLookup = {
        0: 'h-twelve',
        1: 'h-one',
        2: 'h-two',
        3: 'h-three',
        4: 'h-four',
        5: 'h-five',
        6: 'h-six',
        7: 'h-seven',
        8: 'h-eight',
        9: 'h-nine',
        10: 'h-ten',
        11: 'h-eleven'
      },
      minuteLookup = {
        5: 'm-five',
        10: 'm-ten',
        15: 'm-quarter',
        20: 'm-twenty',
        25: 'm-twenty m-five',
        30: 'm-half'
      },
      colorLookup = {
        0: 'color-1',
        1: 'color-2',
        2: 'color-3',
        3: 'color-4',
        4: 'color-5'
      };

  Clock = function(el) {
    this.el = document.getElementById(el);
    this.loop();
    $(this.el).fitText();
  };

  Clock.prototype.loop = function() {
    this.applyTime();
  };

  Clock.prototype.start = function() {
    var self = this;
    setInterval(function() {
      self.loop();
    }, 1000);
  };

   Clock.prototype._time = function() {
    var date = new Date();
    return {
      hour: date.getHours(),
      minute: date.getMinutes()
    }
  }

  Clock.prototype.applyTime = function() {
    var time = this._time(),
        classes = [],
        hour = time.hour,
        minute = time.minute < 35 ? time.minute : 34 - time.minute % 30,
        minute = minute - (minute % 5);

    if (minute === this._lastMinute) {
      return this;
    } else {
      this._lastMinute = minute;
    }

    if (minute > 34 && minute < 5) {
      classes.push('to');
      hour += 1;
    } else {
      classes.push('past');
    }

    classes.push(colorLookup[time.minute % 5]);
    classes.push(minuteLookup[minute])
    classes.push(hourLookup[hour % 12]);

    this.el.className = classes.join(' ');

    return this;
  }

  window.Clock = Clock;
}());

(function() {
  var clock = new Clock('clock').start();
}());
