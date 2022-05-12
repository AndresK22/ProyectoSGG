function CargarMapa(){
    var map = new GeoMap();
    var layers = new GeoLayers();
   
    map.CrearMapa('map',[layers.ObtenerLayersBase(), layers.ObtenerLayersGeoJSONPoligonos(), layers.ObtenerLayersGeoJSONLineas(), layers.ObtenerLayersGeoJSONPuntos()],null,null,null,null);
    map.CrearControlBarra();
    map.CrearLayerSwitcher();
    map.CrearPopUp();
}