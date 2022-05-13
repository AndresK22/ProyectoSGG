<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis hasScaleBasedVisibilityFlag="0" minScale="1e+08" maxScale="0" version="3.16.16-Hannover" styleCategories="AllStyleCategories">
  <flags>
    <Identifiable>1</Identifiable>
    <Removable>1</Removable>
    <Searchable>1</Searchable>
  </flags>
  <temporal enabled="0" mode="0" fetchMode="0">
    <fixedRange>
      <start></start>
      <end></end>
    </fixedRange>
  </temporal>
  <customproperties>
    <property value="false" key="WMSBackgroundLayer"/>
    <property value="false" key="WMSPublishDataSourceUrl"/>
    <property value="0" key="embeddedWidgets/count"/>
    <property value="Value" key="identify/format"/>
  </customproperties>
  <pipe>
    <provider>
      <resampling enabled="false" maxOversampling="2" zoomedOutResamplingMethod="nearestNeighbour" zoomedInResamplingMethod="nearestNeighbour"/>
    </provider>
    <rasterrenderer opacity="1" classificationMax="150.6499939" alphaBand="-1" nodataColor="" type="singlebandpseudocolor" band="1" classificationMin="56.5600014">
      <rasterTransparency/>
      <minMaxOrigin>
        <limits>MinMax</limits>
        <extent>WholeRaster</extent>
        <statAccuracy>Estimated</statAccuracy>
        <cumulativeCutLower>0.02</cumulativeCutLower>
        <cumulativeCutUpper>0.98</cumulativeCutUpper>
        <stdDevFactor>2</stdDevFactor>
      </minMaxOrigin>
      <rastershader>
        <colorrampshader clip="0" labelPrecision="4" minimumValue="56.560001399999997" classificationMode="1" colorRampType="INTERPOLATED" maximumValue="150.6499939">
          <colorramp type="gradient" name="[source]">
            <prop v="166,97,26,255" k="color1"/>
            <prop v="1,133,113,255" k="color2"/>
            <prop v="0" k="discrete"/>
            <prop v="gradient" k="rampType"/>
            <prop v="0.25;223,194,125,255:0.5;245,245,245,255:0.75;128,205,193,255" k="stops"/>
          </colorramp>
          <item color="#a6611a" alpha="255" value="54.5400" label="54.5400"/>
          <item color="#dfc27d" alpha="255" value="80.08249950408936" label="80.0825"/>
          <item color="#f5f5f5" alpha="255" value="103.6049976348877" label="103.6050"/>
          <item color="#80cdc1" alpha="255" value="127.12749576568604" label="127.1275"/>
          <item color="#018571" alpha="255" value="150.64999389648438" label="150.6500"/>
        </colorrampshader>
      </rastershader>
    </rasterrenderer>
    <brightnesscontrast gamma="1" contrast="0" brightness="0"/>
    <huesaturation colorizeRed="255" colorizeGreen="128" colorizeBlue="128" saturation="0" grayscaleMode="0" colorizeOn="0" colorizeStrength="100"/>
    <rasterresampler maxOversampling="2"/>
    <resamplingStage>resamplingFilter</resamplingStage>
  </pipe>
  <blendMode>0</blendMode>
</qgis>
