var graphite_url = "http://10.5.250.45:8080";  // enter your graphite url, e.g. http://your.graphite.com

var dashboards =
    [
        { "name": "SPS Overall Metrics",  // give your dashboard a name (required!)
            "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
            // add an (optional) dashboard description. description can be written in markdown / html.
            "description": "\n###Overal system health metrics"
                + "\n Showing host performance data"
                + "\n",
            "gauges" :
                [
                    {
                        "alias": "% memory used",  // display name for this metric
                        "target": "10_5_250_45.memory.committed_percent",  // enter your graphite barebone target expression here
                        "description": "",  // enter your metric description here
                        "renderer": "gauge",
                        "size": 150, //currently for gauge only
                        "width":280
                    },
                    {
                        "alias": "% memory used",  // display name for this metric
                        "target": "10_5_250_45.memory.committed_percent",  // enter your graphite barebone target expression here
                        "description": "",  // enter your metric description here
                        "renderer": "gauge",
                        "size": 150, //currently for gauge only
                        "width":200
                    },
                    {
                        "alias": "% memory used",  // display name for this metric
                        "target": "10_5_250_45.memory.committed_percent",  // enter your graphite barebone target expression here
                        "description": "",  // enter your metric description here
                        "renderer": "gauge",
                        "size": 150, //currently for gauge only
                        "width":200

                    }


                ],
            "metrics":  // metrics is an array of charts on the dashboard
                [
                    {
                        "alias": "10_5_250_45.memory",  // display name for this metric
                        "target": "10_5_250_45.memory.*",  // enter your graphite barebone target expression here
                        "description": "The diagram indicates how much memeory left available", // enter your metric description here
                        "renderer": "line",
                        "interpolation": "cardinal",
                        "height" : 150,
                        "colspan" : 3
                    },
                    {
                        "alias": "10_5_250_45.memory",  // display name for this metric
                        "target": "10_5_250_45.memory.available_memory",  // enter your graphite barebone target expression here
                        "description": "", // enter your metric description here
                        "renderer": "bar",
                        "colspan" : 2
                    },
                    {
                        "alias": "10_5_250_45.memory",  // display name for this metric
                        "target": "10_5_250_45.memory.committed_percent",  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line"
                    },
                    {
                        "alias": "10_5_250_45.memory",  // display name for this metric
                        "target": "10_5_250_45.memory.committed_percent",  // enter your graphite barebone target expression here
                        "description": "", // enter your metric description here
                        "renderer": "line"
                    }
                ]
        },
        { "name": "SPS ESB Metrics",
            "refresh": 10000,
            // you can use any rickshaw supported color scheme.
            // Enter palette name as string, or an array of colors
            // (see var scheme at the bottom).
            // Schemes can be configured globally (see below), per-dashboard, or per-metric
            "scheme": "classic9",   // this is a dashboard-specific color palette
            "description": "###Description goes here"
                + "\n ",
            "metrics": [
                {
                    "alias": "network",
                    "target": "aliasByNode(derivative(servers.system.eth*),4)",
                    "events": "*",  // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
                    "description": "main system cpu usage on production (cardinal interpolation, line renderer, colspan=3)",
                    "interpolation": "linear",
                    "colspan": 3
                },
                {
                    "alias": "cpu utilization",
                    "target": "aliasByNode(derivative(servers.system.cpu.*),4)",  // target can use any graphite-supported wildcards
                    "annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "cpu utilization on production (using linear interpolation). Summary displays the average across all series",
                    "interpolation": "linear",  // you can use different rickshaw interpolation values
                    "stroke_width": 1,  // change stroke width
                    "summary": "avg"
                },
                {
                    "alias": "proc mem prod",
                    "targets": ["aliasByNode(derivative(servers.system.cpu.user),4)",  // targets array can include strings,
                        // functions or dictionaries
                        {target: 'alias(derivative(servers.system.cpu.system,"system utilization")',
                            alias: 'system utilization',                           // if you use a graphite alias, specify it here
                            color: '#f00'}],                                       // you can also specify a target color this way
                    // (note that these values are ignored on the demo)
                    // annotator can also be a dictionary of target and description.
                    // However, only one annotator is supported per-metric.
                    "annotator": {'target': 'events.deployment',
                        'description': 'deploy'},
                    "description": "main process memory usage on production (different colour scheme and interpolation)",
                    "interpolation": "step-before",
                    "scheme": "munin"  // this is a metric-specific color palette
                },
                {
                    "alias": "sys mem prod",
                    "target": "derivative(localhost.memory.*)",
                    "events": "*",  // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
                    "description": "main system memory usage on production (cardinal interpolation, line renderer)",
                    "interpolation": "cardinal",
                    "renderer": "line",
                    "max": 150,  // you can specify max value for the y-axis
                    "min": 20   // and also min
                }
            ]
        },
        { "name": "SPS IOL Metrics",
            "refresh": 10000,
            "scheme": "colorwheel",
            "graphite_url": "demo",  // you can override the default graphite_url with a dashboard-specific url
            "description": "###Description goes here"
                + "\n",
            "metrics": [
                {
                    "alias": "production HTTP req",
                    "target": "aliasByNode(derivative(servers.gluteus-medius.Http.http_response_rates.*),4)",
                    "renderer": "bar",
                    "interpolation": "cardinal",
                    "summary": "last"
                }
            ]
        }
    ];

//var scheme = [
//              '#423d4f',
//              '#4a6860',
//              '#848f39',
//              '#a2b73c',
//              '#ddcb53',
//              '#c5a32f',
//              '#7d5836',
//              '#335488',
//              '#7c2626'
//              ].reverse();
var scheme = []
var colors = d3.scale.category20()
for (var k = 0; k < 20; k++) {
    scheme.push(colors(k))
}
function relative_period() {
    return (typeof period == 'undefined') ? 1 : parseInt(period / 7) + 1;
}
function entire_period() {
    return (typeof period == 'undefined') ? 1 : period;
}
function at_least_a_day() {
    return entire_period() >= 1440 ? entire_period() : 1440;
}
