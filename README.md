# osgeolabud-SIG3D

Ejemplos de aplicación de la bibilioteca Cesium JS. 

## osgeolabud_cesium.js

Biblioteca de funciones para facilitar el uso de la biblioteca CesiumJS. Especialmente construida para personas que tengan conocimientos básicos de programación que deseen implementar aplicaciones basadas en el geovisor.


* Funciones de Lectura de Archivos Externos
	* **agregarGeojson**(archivo,visor): Agrega el _archivo_ en formato geojson al conjunto de fuentes de datos del _visor_. La función agrega todas las entidades encontradas en el _archivo_ a la colección de entidades del _visor_.
	*  **agregarCZML**(archivo,visor): Agrega el _archivo_ en formato CZML al conjunto de fuentes de datos del _visor_. 
	*  **agregarCZMLAnimado**(archivo,visor,[seguir], [cerca], [lejos]): Agrega el _archivo_ en formato CZML al conjunto de fuentes de datos del _visor_. La función identifica la entidad cuyo id sea 'path' en el archvio CZML y "ancla" la cámara para a dicha entidad si seguir es true, También define las características de distancia menor o mayor a las que se puede ver el objeto.
	

