/**
 * Created by guy on 06.12.13.
 */

var map = L.map('map').setView([46.99162, 6.93182], 13);

var back = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(map);


function removeLayers(perfData) {
    if (perfData.layers != null) {

        for (var i = 0; i < perfData.layers.length; i++) {
            map.removeLayer(perfData.layers[i]);
        }

    }
    if (perfData.control != null) {
        map.removeControl(perfData.control);
    }
}


function drawObjects(nMarkersSize, nCircleSize, nPolygonSize) {

    var markerLayerGroup = new L.layerGroup();

    for (var i = -nMarkersSize; i < nMarkersSize; i++)
        for (var j = -nMarkersSize; j < nMarkersSize; j++)
            L.marker([46.99162 + i/10, 6.93182 + j/10]).addTo(markerLayerGroup);

    markerLayerGroup.addTo(map);

    var circleLayerGroup = new L.layerGroup();

    for (var i = -nCircleSize; i < nCircleSize; i++)
        for (var j = -nCircleSize; j < nCircleSize; j++)
            L.circle([46.99162 + i/100, 6.93182 + j/100], 25, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            }).addTo(circleLayerGroup);

    circleLayerGroup.addTo(map);


    var polygonLayerGroup = new L.layerGroup();

    for (var i = -nPolygonSize ; i < nPolygonSize; i++)
        for (var j = -nPolygonSize; j < nPolygonSize; j++)
            L.polygon([
                [46.99162 + i/100 - 0.001, 6.93182 + j/100 - 0.001],
                [46.99162 + i/100 + 0.001, 6.93182 + j/100 - 0.001],
                [46.99162 + i/100 + 0.001, 6.93182 + j/100 + 0.001]
            ]).addTo(polygonLayerGroup);

    polygonLayerGroup.addTo(map);

    var control = L.control.layers(
        {
            "Background":back
        },
        {
            "Markers":markerLayerGroup,
            "Circles":circleLayerGroup,
            "Polygons":polygonLayerGroup
        }
    ).addTo(map);

    return {
        "layers":[markerLayerGroup, circleLayerGroup, polygonLayerGroup],
        "control":control
    }
}

