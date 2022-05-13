function CargarMapa(){
    var map = new GeoMap();
    var layers = new GeoLayers();
   
    map.CrearMapa('map',[layers.ObtenerLayersBase(), layers.ObtenerLayersZonasTuris(), layers.ObtenerLayersConcentracion(),
        layers.ObtenerLayersZonasVerdes(), layers.ObtenerLayersGeoJSONRutas(), layers.ObtenerLayersGeoJSONRestaurantes(),
        layers.ObtenerLayersGeoJSONHoteles(), layers.ObtenerLayersGeoJSONMiradores(), layers.ObtenerLayersGeoJSONParques()],null,null,null,null);
    map.CrearControlBarra();
    map.CrearLayerSwitcher();
    map.CrearPopUp();
}