function GeoLayers(){
    this.vectorGeoJson = null;
}

//Capas base para tener de fondo 
GeoLayers.prototype.ObtenerLayersBase = function(){
    var listaLayers = [];
    
    //Capa departamentos
    var departamentos = new ol.layer.Tile({
        title:'Departamentos',
        visible: false,
        baseLayer:true,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:LIM_DEPARTAMENTAL'
            }
        })
    });
    listaLayers.push(departamentos);

    //Capa municipios
    var municipios = new ol.layer.Tile({
        title:'Municipios',
        visible: false,
        baseLayer:true,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:LIM_MUNICIPAL'
            }
        })
    });
    listaLayers.push(municipios);

    //Capa OSM
    var lyrOSM = new ol.layer.Tile({
        title:'Open Street Map',
        visible: true,
        baseLayer:true,
        source: new ol.source.OSM()
    });
    listaLayers.push(lyrOSM);

    //Capa Google Map
    var lyrGoogleMap = new ol.layer.Tile({
        title:'Google Maps',
        visible: false,
        baseLayer:true,
        source: new ol.source.XYZ({
            url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        })
    });
    listaLayers.push(lyrGoogleMap);

    //Capa Google Satelite
    var lyrGoogleMapS = new ol.layer.Tile({
        title:'Google Satelite',
        visible: false,
        baseLayer:true,
        source: new ol.source.XYZ({
            url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        })
    });
    listaLayers.push(lyrGoogleMapS);

    return new ol.layer.Group({
        title:'Capas Base',
        layers:listaLayers
    });
};


//Capas vectoriales
/*GeoLayers.prototype.ObtenerLayersSobrepuestos = function(){
    var listaLayers = [];
    
    //Capas vectoriales
	var polig = new ol.layer.Tile({
        title:'Poligonos',
        visible: true,
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:municipios_ruta'
            }
        })
    });
    listaLayers.push(polig);
    
    var lineas = new ol.layer.Tile({
        title:'Lineas',
        visible: true,
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:ruta_hoteles'
            }
        })
    });
    listaLayers.push(lineas);
    
    var puntos = new ol.layer.Tile({
        title:'Puntos',
        visible: true,
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:hoteles'
            }
        }),
    });
    listaLayers.push(puntos);

    return new ol.layer.Group({
        title:'Capas sobrepuestas',
        visible: false,
        layers: listaLayers
    });
}*/


//Capas geojson para obtener datos
GeoLayers.prototype.ObtenerLayersGeoJSON= function(){
    var lista = [];

    //Municipios_ruta
    
    var municipiosRuta = new ol.layer.Vector({
        title: 'Municipios de la ruta',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&'+
                'outputFormat=application%2Fjson'
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),

        //Aplica el estilo segun cada municipio
        style: function(f) {
            var val = f.get('nombre').toString();
            switch(val) {
                case 'Citalá':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                        fill: new ol.style.Fill({color: 'rgba(175,229,85,1.0)'})
                    })];
                    break;

                case 'La Palma':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                        fill: new ol.style.Fill({color: 'rgba(225,200,1,1.0)'})
                    })];
                    break;

                case 'San Ignacio':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                        fill: new ol.style.Fill({color: 'rgba(255,114,85,1.0)'})
                    })];
                    break;
            }

        }

    })
    lista.push(municipiosRuta);



    //Concentracion restaurantes
    var concentracionRestaurantes = new ol.layer.Vector({
        title: 'Concentracion de restaurantes',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aconcentracion_de_restaurantes&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),

        style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
            fill: new ol.style.Fill({color: 'rgba(152,125,183,1.0)'})
        })
    })
    lista.push(concentracionRestaurantes);


    //Concentracion miradores
    var concentracionMiradores = new ol.layer.Vector({
        title: 'Concentracion de miradores',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aconcentracion_de_miradores&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
            fill: new ol.style.Fill({color: 'rgba(253,191,111,1.0)'})
        })
    })
    lista.push(concentracionMiradores);


    //Concentracion hoteles
    var concentracionHoteles = new ol.layer.Vector({
        title: 'Concentracion de hoteles',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aconcentracion_de_hoteles&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
            fill: new ol.style.Fill({color: 'rgba(225,89,137,1.0)'})
        })
    })
    lista.push(concentracionHoteles);


    //Ruta hoteles
    var rutaHoteles = new ol.layer.Vector({
        title: 'Rutas a hoteles',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aruta_hoteles&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),

        //Aplica el estilo segun cada municipio
        style: function(f) {
            var val = f.get('municipio').toString();
            switch(val) {
                case 'Citalá':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(227,26,28,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0})
                    })];
                    break;

                case 'La Palma':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0})
                    })];
                    break;

                case 'San Ignacio':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(51,160,44,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0})
                    })];
                    break;
            }

        }
    })
    lista.push(rutaHoteles);


    //Hoteles
    var hoteles = new ol.layer.Vector({
        title: 'Hoteles',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Ahoteles&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({radius: 4.8,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                fill: new ol.style.Fill({color: 'rgba(227,26,28,1.0)'})})
        })
    })
    lista.push(hoteles);


    //Restaurantes
    var restaurantes = new ol.layer.Vector({
        title: 'Restaurantes',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Arestaurantes&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({radius: 4.8,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                fill: new ol.style.Fill({color: 'rgba(232,232,113,1.0)'})})
        })
    })
    lista.push(restaurantes);


    //Parques
    var parques = new ol.layer.Vector({
        title: 'Parques',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aparques&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({radius: 4.8,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                fill: new ol.style.Fill({color: 'rgba(51,160,44,1.0)'})})
        })
    })
    lista.push(parques);


    //Miradores
    var miradores = new ol.layer.Vector({
        title: 'Restaurantes',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Amiradores&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({radius: 4.8,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                fill: new ol.style.Fill({color: 'rgba(0,0,0,1.0)'})})
        })
    })
    lista.push(miradores);


    return new ol.layer.Group({
        title:'Ruta fresca',
        visible: true,
        layers: lista
    })
}
