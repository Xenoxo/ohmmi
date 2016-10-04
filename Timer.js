var React = require('react');
var TimerMixin = require('react-timer-mixin');

var Timer = React.createClass({
  mixins: [TimerMixin],
  componentDidMount() {
    this.setTimeout(
      () => { console.log('I do not leak!'); },
      500
    );
  }
});

export Timer;