(function() {
  var description;
  description = {
    "Memory": {
      source: "http://localhost:8080/render?target=memory.available_memory&from=-2hours&until=now&width=400&height=250&target=some.metric&title=my_metric&format=json",
      GaugeLabel: {
        parent: "#hero-one",
        observer: function(data){
          //console.log("Label observing " + data);
        },
        title: "Memory",
        type: "max"
      }
    },
    "Memory avail.": {
      source: "http://localhost:8080/render?target=memory.available_memory&format=json",
      GaugeGadget: {
        parent: "#hero-one",
        title: "P1",
        observer: function(data){
          //console.log("Gadget observing " +data);
        }
      }
    },
   

    "Total Installs": {
      source: "http://localhost:8080/render?target=memory.available_memory&format=json",
      GaugeLabel: {
        parent: "#hero-three",
        title: "Clients Installed"
      }
    },
    "Clients 1": {
      source: "http://localhost:4567/",
      GaugeGadget: {
        parent: "#hero-three",
        title: "Cl1"
      }
    },
    "New Message": {
      source: "http://localhost:4567/",
      TimeSeries: {
        parent: '#g1-1',
		label_offset: 200, 
		label_columns: 2,
        observer: function(data){
          //console.log("Time series observing ", data);
        }
      }
    },
    "Feed Poll": {
      source: "http://localhost:4567/",
      TimeSeries: {
        parent: '#g1-2'
      }
    },
    "Topics": {
      source: "http://localhost:4567/",
      refresh_interval: 20000,
      TimeSeries: {
        parent: '#g1-3'
      }
    },
    "Queue Push": {
      source: "http://localhost:4567/",
      TimeSeries: {
        parent: '#g2-1'
      }
    },
    "Queue Work": {
      source: "http://localhost:4567/",
      TimeSeries: {
        parent: '#g2-2'
      }
    },
    "Foo Work": {
      source: "http://localhost:4567/",
      BarChart: {
        parent: '#g2-3'
      }
    }
  };


  var g = new Graphene;
  g.demo();
  g.build(description);


}).call(this);
