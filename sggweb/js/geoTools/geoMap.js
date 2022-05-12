function GeoMap(){
    this.map = null;
    this.mainBarCustom = null;
}

GeoMap.prototype.CrearMapa = function(target,layers,center,zoom,minZoom,maxZoom){
    var _target = target || 'map',
    _layers = layers || [],
    _center = center || [-89.2078, 14.3284],
    _zoom = zoom || 12,
    _minZoom = minZoom || 9,
    _maxZoom = maxZoom || 20;

    this.map = new ol.Map({
        target: _target,
        layers: _layers,
        view : new ol.View({
            center: ol.proj.fromLonLat(_center),
            minZoom:_minZoom,
            maxZoom:_maxZoom,
            zoom:_zoom
        }),
        interactions: ol.interaction.defaults({ altShiftDragRotate:true, pinchRotate:true})

    });

};

GeoMap.prototype.CrearControlBarra = function(){
    var mainBar = new ol.control.Bar();
    this.map.addControl(mainBar);

    mainBar.addControl(new ol.control.FullScreen());
    mainBar.addControl(new ol.control.Rotate());
    mainBar.addControl(new ol.control.ZoomToExtent({extent:[-9951816,1627131 , -9909355,1596823]}));
    mainBar.setPosition('top-left');
}


GeoMap.prototype.CrearLayerSwitcher = function(){
    var layerSwitcher = new ol.control.LayerSwitcher({
        mouseover: true,
        reordering: false,
        collapsed: false
    });
    this.map.addControl(layerSwitcher);

}


GeoMap.prototype.CrearPopUp = function(){
    // Select control
    var select = new ol.interaction.Select({
        hitTolerance: 5,
        multi: true,
        condition: ol.events.condition.singleClick
    });
    this.map.addInteraction(select);


    var popup = new ol.Overlay.PopupFeature({
        popupClass: 'default anim',
        select: select,
        canFix: true,
        template: {
            title: function(f) {
                var restaurant = f.get('Restaurant');
                var hotel = f.get('hotel');
                var cant_rest = f.get('cant_rest');
                var cant_mirad = f.get('cant_mirad');
                var cant_hotel = f.get('cant_hotel');
                var nombre = f.get('Nombre');

                if(cant_rest){
                    return 'Concentracion de restaurantes';
                }
                else if(cant_mirad){
                    return 'Concentracion de miradores';
                }
                else if(cant_hotel){
                    return 'Concentracion de hoteles';
                }
                else if(restaurant){
                    return f.get('Restaurant');
                }
                else if(hotel){
                    return 'Ruta a ' + f.get('hotel');
                }
                else if(nombre){
                    return f.get('Nombre');
                }
                else {
                    return f.get('nombre');
                }
            },
            attributes: {
                'departamen': { title: 'Departamento' },
                'municipio': { title: 'Municipio' },
                'Municipio': { title: 'Municipio' },
                'area_km': { title: 'Area (km)' },
                'perimetro': { title: 'Perimetro' },
                'cant_rest': { title: 'Cantidad de restaurantes' },
                'cant_mirad': { title: 'Cantidad de miradores' },
                'cant_hotel': { title: 'Cantidad de hoteles' },
            }
        }
    });
    this.map.addOverlay (popup);

}
