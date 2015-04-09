(function ($, helper, props) {
    'use strict';

    // init Wijmo controls
    var linearGauge = helper.createLinearGauge('#evLinearGauge', props),
        radialGauge = helper.createRadialGauge('#evRadialGauge', props),
        $isReadOnly = $('#evReadOnly');

    // set LinearGauge properties
    linearGauge.step = props.step;
    linearGauge.isReadOnly = props.isReadOnly;

    // set RadialGauge properties
    radialGauge.step = props.step;
    radialGauge.isReadOnly = props.isReadOnly;

    // isReadonly - set CheckBox properties
    $isReadOnly.prop('checked', props.isReadOnly);
    $isReadOnly.on('change', function () {
        // determine isReadOnly checkbox's checked state
        var isReadOnly = $(this).is(':checked');

        // update gauges
        linearGauge.isReadOnly = isReadOnly;
        radialGauge.isReadOnly = isReadOnly;
    });

    // publish valueChanged - callback in app.js
    linearGauge.valueChanged.addHandler(pubValueChanged);
    radialGauge.valueChanged.addHandler(pubValueChanged);

})(jQuery, Helper, props);