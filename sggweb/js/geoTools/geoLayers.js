function GeoLayers(){
    
}

//Capas base para tener de fondo 
GeoLayers.prototype.ObtenerLayersBase = function(){
    var listaLayers = [];
    
    //Capa departamentos
    var departamentos = new ol.layer.Tile({
        title:'Departamentos',
        visible: false,
        baseLayer: true,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:LIM_DEPARTAMENTAL'
            }
        })

        /*source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:LIM_DEPARTAMENTAL'
            }
        })*/
        
    });
    listaLayers.push(departamentos);

    //Capa municipios
    var municipios = new ol.layer.Tile({
        title:'Municipios',
        visible: false,
        baseLayer: true,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:LIM_MUNICIPAL'
            }

        })

        /*source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:LIM_MUNICIPAL'
            }
        })*/

    });
    listaLayers.push(municipios);

    //Capa OSM
    var lyrOSM = new ol.layer.Tile({
        title:'Open Street Map',
        visible: true,
        baseLayer: true,
        source: new ol.source.OSM()
    });
    listaLayers.push(lyrOSM);

    //Capa Google Map
    /*var lyrGoogleMap = new ol.layer.Tile({
        title:'Google Maps',
        visible: false,
        baseLayer:true,
        source: new ol.source.XYZ({
            url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        })
    });
    listaLayers.push(lyrGoogleMap);*/

    //Capa Google Satelite
    var lyrGoogleMapS = new ol.layer.Tile({
        title:'Google Satelite',
        visible: false,
        baseLayer: true,
        source: new ol.source.XYZ({
            url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        })
    });
    listaLayers.push(lyrGoogleMapS);

    return new ol.layer.Group({
        title:'Mapas base',
        layers:listaLayers
    });
};


//Capas geojson para obtener datos
//Capas de zonas turisticas
GeoLayers.prototype.ObtenerLayersMunicRuta = function(){
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
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),

        //Aplica el estilo segun cada municipio
        style: function(f) {
            var val = f.get('nombre').toString();
            switch(val) {
                case 'Cital??':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                        fill: new ol.style.Fill({color: 'rgba(211,192,154,1.0)'})
                    })];
                    break;

                case 'La Palma':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                        fill: new ol.style.Fill({color: 'rgba(119,109,138,1.0)'})
                    })];
                    break;

                case 'San Ignacio':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                        fill: new ol.style.Fill({color: 'rgba(238,218,209,1.0)'})
                    })];
                    break;
            }

        }

    })
    lista.push(municipiosRuta);


    //Capa raster de municipios
    /*var municipios = new ol.layer.Tile({
        title:'Tipo raster',
        visible: false,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:limites_raster'
            }
        })

        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:limites_raster'
            }
        })

    });
    lista.push(municipios);*/


    /*return new ol.layer.Group({
        title:'Municipios de la ruta',
        visible: true,
        layers: lista
    })*/

    return municipiosRuta;

}

GeoLayers.prototype.ObtenerLayersZonasTuris = function(){
    var lista = [];

    //Zonas de acampar
    var zonasCammping = new ol.layer.Vector({
        title: 'Zonas de camping',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Azonas_acampar&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Azonas_acampar&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
            fill: new ol.style.Fill({color: 'rgba(78,160,174,1.0)'})
        })
    })
    lista.push(zonasCammping);


    //Zonas de caminata
    var zonasCaminata = new ol.layer.Vector({
        title: 'Zonas de caminata',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Azonas_caminata&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Azonas_caminata&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
            fill: new ol.style.Fill({color: 'rgba(196,60,57,1.0)'})
        })
    })
    lista.push(zonasCaminata);


    //Zonas religiosas
    var zonasReligiosas = new ol.layer.Vector({
        title: 'Zonas religiosas',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Azonas_religiosas&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Azonas_religiosas&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
            fill: new ol.style.Fill({color: 'rgba(229,182,54,1.0)'})
        })
    })
    lista.push(zonasReligiosas);

    return new ol.layer.Group({
        title:'Zonas turisticas',
        visible: true,
        layers: lista
    })
}


//concentraciones de lugares
GeoLayers.prototype.ObtenerLayersConcentracion = function(){
    var lista = [];
    
    //Concentracion restaurantes
    var concentracionRestaurantes = new ol.layer.Vector({
        title: 'Concentracion de restaurantes',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aconcentracion_de_restaurantes&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aconcentracion_de_restaurantes&' +
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
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aconcentracion_de_miradores&' +
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
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aconcentracion_de_hoteles&' +
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

    return new ol.layer.Group({
        title:'Concentraciones',
        visible: false,
        layers: lista
    })
}


//Capas raster
GeoLayers.prototype.ObtenerLayersZonasVerdes = function(){
    var lista = [];

    //Capa el refugio
    var elRefugio = new ol.layer.Tile({
        title:'El refugio',
        visible: false,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:centro_de_recreacion_el_refugio'
            }
        })

        /*source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:centro_de_recreacion_el_refugio'
            }
        })*/

    });
    lista.push(elRefugio);


    //Capa Compostela
    var compostela = new ol.layer.Tile({
        title:'Compostela',
        visible: false,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:compostela_georreferenciado'
            }
        })

        /*source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:compostela_georreferenciado'
            }
        })*/

    });
    lista.push(compostela);


    //Capa Entre pinos
    var entrePinos = new ol.layer.Tile({
        title:'Entre Pinos',
        visible: false,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:entre_pinos_georreferenciado'
            }
        })

        /*source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:entre_pinos_georreferenciado'
            }
        })*/

    });
    lista.push(entrePinos);


    //Capa cayaguanca
    var cayaguanca = new ol.layer.Tile({
        title:'Cayaguanca',
        visible: false,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:peon_cayaguanca_georreferenciado'
            }
        })

        /*source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:peon_cayaguanca_georreferenciado'
            }
        })*/

    });
    lista.push(cayaguanca);


    //Capa El Pital
    var elPital = new ol.layer.Tile({
        title:'El Pital',
        visible: false,
        source: new ol.source.TileWMS({
            url: 'http://137.184.35.12:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:pital_georreferenciado'
            }
        })

        /*source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/sgg/wms?',
            params: {
                VERSION: '1.1.1',
                FORMAT: 'image/png',
                TRANSPARENT: true,
                LAYERS: 'sgg:pital_georreferenciado'
            }
        })*/

    });
    lista.push(elPital);


    return new ol.layer.Group({
        title:'Zonas verdes',
        visible: false,
        layers: lista
    });
}


//Capas de lineas
GeoLayers.prototype.ObtenerLayersGeoJSONRutas = function(){
    var lista = [];

    //Ruta fresca
    var rutaFresca = new ol.layer.Vector({
        title: 'Ruta fresca',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3ArutaFresca&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3ArutaFresca&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(227,26,28,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 2})
        })

    });
    lista.push(rutaFresca);


    //Ruta hoteles
    var rutaHoteles = new ol.layer.Vector({
        title: 'Rutas a hoteles',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aruta_hoteles&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aruta_hoteles&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),

        //Aplica el estilo segun cada municipio
        style: function(f) {
            var val = f.get('municipio').toString();
            switch(val) {
                case 'Cital??':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(231,24,196,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 2})
                    })];
                    break;

                case 'La Palma':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 2})
                    })];
                    break;

                case 'San Ignacio':
                    return [ new ol.style.Style({
                        stroke: new ol.style.Stroke({color: 'rgba(51,160,44,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 2})
                    })];
                    break;
            }

        }
    })
    lista.push(rutaHoteles);


    return new ol.layer.Group({
        title:'Rutas',
        visible: true,
        layers: lista
    });
}


//Capas de puntos
GeoLayers.prototype.ObtenerLayersGeoJSONRestaurantes = function(){
    //Restaurantes
    var restaurantes = new ol.layer.Vector({
        title: 'Restaurantes',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Arestaurantes&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Arestaurantes&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({radius: 4.8,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                fill: new ol.style.Fill({color: 'rgba(232,232,113,1.0)'})})
        })
    });

    return restaurantes;
}


GeoLayers.prototype.ObtenerLayersGeoJSONHoteles = function(){
    //Hoteles
    var hoteles = new ol.layer.Vector({
        title: 'Hoteles',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Ahoteles&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Ahoteles&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({radius: 4.8,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                fill: new ol.style.Fill({color: 'rgba(227,26,28,1.0)'})})
        })
    });

    return hoteles;
}


GeoLayers.prototype.ObtenerLayersGeoJSONMiradores = function(){
    //Miradores
    var miradores = new ol.layer.Vector({
        title: 'Miradores',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Amiradores&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Amiradores&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({radius: 4.8,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                fill: new ol.style.Fill({color: 'rgba(0,0,0,1.0)'})})
        })
    });

    return miradores;
}


GeoLayers.prototype.ObtenerLayersGeoJSONParques = function(){
    //Parques
    var parques = new ol.layer.Vector({
        title: 'Parques',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aparques&'+
                'outputFormat=application%2Fjson'
                
                
                /*'http://localhost:8080/geoserver/sgg/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Aparques&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({radius: 4.8,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
                fill: new ol.style.Fill({color: 'rgba(51,160,44,1.0)'})})
        })
    });

    return parques;
}



/*GeoLayers.prototype.ObtenerLayersGeoJSONPuntos = function(){
    var lista = [];

    lista.push(hoteles);


    lista.push(restaurantes);


    lista.push(parques);


    lista.push(miradores);


    return new ol.layer.Group({
        title:'Puntos',
        visible: true,
        layers: lista
    })
}*/
