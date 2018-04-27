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

function agregarGeojson(archivo,visor) {
                var miDataSource = new Cesium.GeoJsonDataSource();
                var entidades = miDataSource.load(archivo);
                entidades.then(function (misEntidades) {
			visor.dataSources.add(misEntidades);	
			configurarEntidades(misEntidades); 
                }).otherwise(function (error) {
                    console.error(error);
                    console.error('No fue posible cargar el archivo '+archivo);
                });
		return miDataSource;
}

function configurarEntidades(misEntidades){
		
                    var entidades = misEntidades.entities.values;

			//console.log(entidades);


                    for (var i = 0; i < entidades.length; i++) {
                        var miEntidad = entidades[i];
                        var propietario = miEntidad.properties.propietario;
                        var altura = miEntidad.properties.altura;
                        var color = matrizColores[propietario];
                        if (!color) {
                            color = Cesium.Color.fromRandom({
                                alpha: 0.5
                            });

                            //matrizColores[propietario] = color;
                        }
			
			var departamento=String(miEntidad.properties.NOMBRE_DPT);				
				
			miEntidad._id="Departamento "+departamento.toUpperCase();

                        miEntidad.polygon.material = color;
                        miEntidad.polygon.outline = false;

                        var posicion = miEntidad.polygon.hierarchy.getValue().positions[0];
			miEntidad.position = posicion;
                        miEntidad.polygon.height = 0;
                        var area=miEntidad.properties.AREA/11420000000;
//                        console.log(area);
                        miEntidad.polygon.extrudedHeight = area*5000;
			miEntidad.label= {
			    text : miEntidad.properties.NOMBRE_DPT
			};

			miEntidad.description="<h1>"+miEntidad.properties.NOMBRE_DPT+"</h1><p>Tiene un área total de "+miEntidad.properties.AREA
						+" lo cual equivale a un "+Math.round(area)+"% del total del país</p>";

			miEntidad.label.scaleByDistance = new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0);

			miEntidad.label.show=true;
                    }


            }


function agregarCZMLAnimado(archivo) {
                
                
                var miDataSource=Cesium.CzmlDataSource.load(archivo);
                
                visor.dataSources.add(miDataSource).then(function (ds) {
                        var miEntidad=ds.entities.getById('path');
                        visor.trackedEntity = miEntidad;
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
                        
                        var escalaCercaLejos=new Cesium.NearFarScalar(0.0, 0.3, 2000, 0.0);
                        miEntidad.billboard.scaleByDistance = new Cesium.ConstantProperty(escalaCercaLejos);
                    
                });
            }


function agregarSeguimientoMouse(){
		
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

}








