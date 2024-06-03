export const testFiles = [
  `//PRUEBAS CON ARREGLOS Y DECLARACION DE VARIABLES
  package main;
  
    func main() {
    
        var arreglo [4]int;
        var x = 10;
        var n1, n2  = 54, 418;
    
        arreglo[0] = 19;
        arreglo[1] = 15;
    
        println(n2 + arreglo[0+1]);
    
        return;
    
    };
  `,
  `// PRUEBAS CON IF's e IMPRESIONES DE STRINGS
  package main;
  
    func main() {
    
        var x = 10;
  
        if x > 2 {
          x = 200;
        }else{
          x = 100;
        };
        
        //BUG SE IMPRIME DOS VECES, FALTÓ CORREGIR
        println("Resultado :");
        println(x);
        
      
        return;
        
    };
      
    
    `,
  `//PRUEBAS LLAMADA FUNCIONES y Funcion LEN
  package main;

func suma() int {

    var x = 10;
    var y = 20;
    var z = 0;
    z = x+y;

    return z;
};
func main() {
    
    var arreglo [4]int;
    arreglo[0] = 19;
    arreglo[1] = 15;

    //Se imprime correctamente la longitud del arreglo utilizando len
    longitud := len(arreglo);
    println(longitud);

    //Se imprime correctamente la llamada a una funcion
    resultado := suma();
    println(resultado);
    return;

    //NO SE LOGRÓ IMPLEMENTAR COMPLETAMENTE LOS FORS, GENERA ERRORES AL convertir
    // for i := 1; i < 5; i = i + 1 {
    //      println("Imprimiendo");
    // };

};
    
    `,
];
