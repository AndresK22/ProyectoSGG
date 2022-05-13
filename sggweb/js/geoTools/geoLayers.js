function GeoLayers(){
    
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
        title:'Mapas base',
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

    return new ol.layer.Group({
        title:'Capas sobrepuestas',
        visible: false,
        layers: listaLayers
    });
}*/



//Capas geojson para obtener datos
//Capas de poligonos
GeoLayers.prototype.ObtenerLayersGeoJSONPoligonos = function(){
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


    //Zonas de acampar
    var zonasCammping = new ol.layer.Vector({
        title: 'Zonas de camping',
        source: new ol.source.Vector({
            url: function(extent){
                return 'http://137.184.35.12:8080/geoserver/sgg/ows?'+
                'service=WFS&version=1.0.0&request=GetFeature&typeName=sgg%3Azonas_acampar&'+
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
            fill: new ol.style.Fill({color: 'rgba(190,178,151,1.0)'})
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
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
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
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
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
        title:'Poligonos',
        visible: true,
        layers: lista
    })
}


//Capas de lineas
GeoLayers.prototype.ObtenerLayersGeoJSONLineas = function(){
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
                'service=WFS&' +
                'version=1.0.0&request=GetFeature&typeName=sgg%3Amunicipios_ruta&' +
                'outputFormat=application%2Fjson'*/
            },
            format: new ol.format.GeoJSON()
        }),
        
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(227,26,28,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 2})
        })

    })
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
        title:'Lineas',
        visible: true,
        layers: lista
    })
}


//Capas de puntos
GeoLayers.prototype.ObtenerLayersGeoJSONPuntos = function(){
    var lista = [];

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
        title: 'Miradores',
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
        title:'Puntos',
        visible: true,
        layers: lista
    })
}


//Capas raster
GeoLayers.prototype.ObtenerLayersRaster = function(){
    var lista = [];

    //Capa de municipios
    var municipios = new ol.layer.Tile({
        title:'Municipios de la ruta',
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
    });
    lista.push(municipios);


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
    });
    lista.push(elPital);


    return new ol.layer.Group({
        title:'Raster',
        layers: lista
    })
}
