export const testFiles = [
  `package main;

func main() int{

    

    if(x==9){
        x=10;
    }
    else{
        x=20;
    };

    for i := 0; i < 5; i++ {
        if(x==0){
            x=1;
        };
    };

    print("Hola");
};
    `,
  `package main;

  func main() {
  
      var x int;
      var n1, n2 float64 = 5.2134, 4121.21118;
  
      var (
          a, b string;
          c    bool;
      );
      
      type (
          Person struct {
              Name string;
              Age  int;
          };
      );
  
      switch {
          case result < 0:
              fmt.Println("Negative result");
          case result > 0:
              fmt.Println("Positive result");
          default:
              fmt.Println("Zero result");
      };
      
  };
    `,
  `package main;

    func main() int{
    
        var x + 1;
        if(){
    
        };
        switch {
              case result < 0
                  print("Ejemplo");
              case result > 0:
                  print("Ejemplo");
              default:
                print("Ejemplo");
                  
          };
    
    };
    `,
];
