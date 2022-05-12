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
        interactions: ol.interaction.defaults({ altShiftDragRotate:false, pinchRotate:false,  })

    });

};


GeoMap.prototype.CrearLayerSwitcher = function(){
    var layerSwitcher = new ol.control.LayerSwitcher({
        mouseover: true,
        reordering: false,
        collapsed: false
    });
    this.map.addControl(layerSwitcher);

}


GeoMap.prototype.CrearPopUpMunic = function(){
    // Select control
    var selectMunic = new ol.interaction.Select({
        hitTolerance: 5,
        multi: true,
        condition: ol.events.condition.singleClick
    });
    this.map.addInteraction(selectMunic);


    var popupMunicipios = new ol.Overlay.PopupFeature({
        popupClass: 'default anim',
        select: selectMunic,
        canFix: true,
        template: {
            title: function(f) {
                return f.get('nombre') + '(' + f.get('id') + ')';
            },
            attributes: {'nombre': { title: 'Nombre' },
            'departamen': { title: 'Departamento' },
            'area_km': { title: 'Area' },
            'perimetro': { title: 'Perimetro' }

            }
        }
    });
    this.map.addOverlay (popupMunicipios);

}



GeoMap.prototype.CrearPopUpConcentRest = function(){
    // Select control
    var selectConcentRest = new ol.interaction.Select({
        hitTolerance: 5,
        multi: true,
        condition: ol.events.condition.singleClick
    });
    this.map.addInteraction(selectConcentRest);

    var popupConcentracionRest = new ol.Overlay.PopupFeature({
        popupClass: 'default anim',
        select: selectConcentRest,
        canFix: true,        
        template: {
            title: function(f) {
                return f.get('municipio') + '(' + f.get('id') + ')';
            },
            attributes: {
                'cant_rest': { title: 'Cantidad de restaurantes' }
            },
        }
    });

    this.map.addOverlay (popupConcentracionRest);

}