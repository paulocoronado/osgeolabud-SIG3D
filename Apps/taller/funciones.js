function configurarEntidades(misEntidades){
		
    var entidades = misEntidades.entities.values;

    //console.log(entidades.length);


    for (var i = 0; i < entidades.length; i++) {
        var miEntidad = entidades[i];                        
    }


}

function eventosReloj(visor){
    
    visor.clock.onTick.addEventListener(function(clock) {
                        var pancarta = document.getElementById('contenedorInformacion');
                        var cartographic = new Cesium.Cartographic();
                        var mensaje;
                        var miEntidad = visor.selectedEntity;
                        
                        if (!Cesium.defined(miEntidad)) {
                           pancarta.style.display = 'none';
                        } else {
                            console.log(miEntidad);
                            pancarta.style.display = 'block';
                            if(miEntidad.position !== null && miEntidad.position !== undefined){
                            var position = miEntidad.position.getValue(clock.currentTime);
                            Cesium.Ellipsoid.WGS84.cartesianToCartographic(position, cartographic);
                            mensaje =
                                'Longitud: ' + Cesium.Math.toDegrees(cartographic.longitude).toFixed(3) + ' <br/>' +
                                'Latitud: ' + Cesium.Math.toDegrees(cartographic.latitude).toFixed(3) + ' <br/>' +
                                'Altura: ' + (cartographic.height * 0.001) + ' km' + ' <br/>' +
                                'Tiempo Actual: ' + visor.clock.currentTime + '<br>';
                            }else{
                               mensaje='Tiempo Actual: ' + miEntidad.polyline.width+ '<br>';                               
                            }
                            
                            pancarta.innerHTML=mensaje;
                            
                        }
                    });   
}

function eventosClickIzquierdo(visor){
    return new Promise(function (){
        
                       var scene=visor.scene;
                       handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                       handler.setInputAction(function(click) {
                           
                                var miEntidad = visor.selectedEntity;
                                var pancarta = document.getElementById('contenedorInformacion');
                                if (Cesium.defined(miEntidad)) {                                  
                                    
                                    var cartographic = new Cesium.Cartographic();
                                    var cartesian = scene.pickPosition(click.position);
                                    if (cartesian) {
                                         var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                                         var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
                                         var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
                                         
                                         pancarta.innerHTML='Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
                                             '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0'+
                                             '\nAltura: ' + (cartographic.height * 0.001) + ' km' + ' <br/>';
                                    }   
                                }else{
                                    pancarta.innerHTML='Te has salido de la ruta!!';
                                }
                                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    });
    }
    