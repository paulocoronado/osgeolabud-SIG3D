/* 
 * @description Biblioteca complementaria de Cesium
 * @copyright OSGeoLabUD - Universidad Distrital Francisco José de Caldas 2018
 * @author Paulo Cesar Coronado
 * @version 0.0.0.1
 * @license GNU Lesser General Public License, version 3
 */

function agregarCZML(archivo, visor){                
                var miDataSource=Cesium.CzmlDataSource.load(archivo);
                visor.dataSources.add(miDataSource);                
            }
            
            
function agregarKML(archivo, visor){
    
    var carga=Cesium.KmlDataSource.load(archivo);
    
    carga.then(function (dataSource){
            visor.dataSources.add(dataSource);
        });
    }
             

function agregarGeojson(archivo,visor) {
                var miDataSource = new Cesium.GeoJsonDataSource();
                var entidades = miDataSource.load(archivo);
                
                return entidades.then(function (misEntidades) {
			visor.dataSources.add(misEntidades);	
                        return misEntidades;
                        
                }).otherwise(function (error) {
                    console.error(error);
                    console.error('No fue posible cargar el archivo '+archivo);
                });
}

function agregarCZMLAnimado(archivo, visor, seguir, cerca, lejos) {
                
                if (seguir === undefined) seguir = false;
                if (cerca === undefined) cerca = 0.3;
                if (lejos === undefined) lejos = 2000;
                
                
                var miDataSource=Cesium.CzmlDataSource.load(archivo);
                
                visor.dataSources.add(miDataSource).then(function (ds) {
                        var miEntidad=ds.entities.getById('path');
                        
                        if(seguir){
                            visor.trackedEntity = miEntidad;
                        }
                        /*
                         * NearFarScalar(near,  nearValue, far, farValue)
                         * near: Distancia más cercana de la cámara
                         * nearVlue: Valor que se tendrá cuando el objeto esté a near
                         * far: Distancia máxima a la cámara
                         * farValue: Valor que se tendrá cuando el objeto esté a far
                         * 
                         * ScaleByDistance: Define la escala del objeto respecto a la distancia de la cámara
                         * Cuando la cámara está a 0 metros el objeto está escalado en 0.3 y desaparece (escala 0)
                         * cuando llega a los 2000m                         *                        
                         */
                        
                        var escalaCercaLejos=new Cesium.NearFarScalar(cerca, 0.0, lejos, 0.0);
                        miEntidad.billboard.scaleByDistance = new Cesium.ConstantProperty(escalaCercaLejos);
                    
                });
            }


function agregarSeguimientoMouse(visor){
      
    return new Promise(function (){
        
                        var scene=visor.scene;
                        var entity = visor.entities.add({
                                     label : {
                                         show : false,
                                         showBackground : true,
                                         font : '14px monospace',
                                         horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
                                         verticalOrigin : Cesium.VerticalOrigin.TOP,
                                         pixelOffset : new Cesium.Cartesian2(15, 0)
                                     }
                                 });
                        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                        handler.setInputAction(function(movement) {
                            var cartesian = visor.camera.pickEllipsoid(movement.endPosition, scene.globe.ellipsoid);
                            if (cartesian) {
                                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                                var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
                                var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

                                entity.position = cartesian;
                                entity.label.show = true;
                                entity.label.text =
                                    'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
                                    '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0';
                            } else {
                                entity.label.show = false;
                            }
                        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                    });
}








