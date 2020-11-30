import { Component, OnInit } from '@angular/core';
import { DatosServiceService } from '../datos-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
inventa= "Inventario";
productoES=0;
inventario:any;
level:String;
nuevaOpera:any={id_producto:'',tipo:'',cantidad:0};
nuevoProd={id_producto:'',nombre:'',cant_total:'',cant_actual:''};
tmpProd:any={id_producto:'',nombre:'',cant_total:'',cant_actual:''}; 
operaa:any;
constructor(private datos:DatosServiceService, private router:Router, private msg:ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarInventario();
  }
  llenarInventario(){
    this.datos.getProductos().subscribe(resp => {
       this.inventario = resp;
      console.log(resp);
      console.log("yeaaah");
    }, error => {
      console.log(error);
      if(error.status==408) this.router.navigate(['']);
    })
  }
  agregarProducto(){
    this.nuevoProd.cant_actual=this.nuevoProd.cant_total;
    if(this.nuevoProd.id_producto == '' && this.nuevoProd.nombre == ''&& this.nuevoProd.cant_actual == ''&& this.nuevoProd.cant_total == ''){
      this.msg.error("Los campos Id, Nombre del Producto,cant_total son obligatorios");
      return;
    }
    this.datos.postProductos(this.nuevoProd).subscribe(resp => {
      if(resp['result']=='ok'){
        let producto = JSON.parse(JSON.stringify(this.nuevoProd))
        this.inventario.push(producto);
        this.nuevoProd.id_producto = '';
        this.nuevoProd.nombre = '';
        this.nuevoProd.cant_total = '';
        this.nuevoProd.cant_actual = '';
        this.msg.success("El Producto se guardo correctamente.");
      }else{
        this.msg.error("El Producto no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }
  temporalProducto(producto){
    this.tmpProd = JSON.parse(JSON.stringify(producto));
  }
  guardarCambios(){
    this.datos.putProductos(this.tmpProd).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.inventario.indexOf( this.inventario.find( producto => producto.id_producto == this.tmpProd.id_producto ));
        this.inventario[i].nombre = this.tmpProd.nombre;
        this.inventario[i].cant_total = this.tmpProd.cant_total;
        this.inventario[i].cant_actual = this.tmpProd.cant_actual;
        this.msg.success("El Producto se guardo correctamente.");
      }else{
        this.msg.error("El Producto no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }


  agregarOperacion(tipo){
    
   this.nuevaOpera.id_producto=this.tmpProd.id_producto;
   this.nuevaOpera.cantidad=this.productoES;
   this.nuevaOpera.tipo=tipo;

    this.datos.postoperaciones(this.nuevaOpera).subscribe(resp => {
      if(resp['result']=='ok'){
        let opera = JSON.parse(JSON.stringify(this.nuevaOpera))
        this.operaa.push(opera);
        this.nuevaOpera.id_producto = '';
        this.nuevaOpera.Cantidad = '';
        this.nuevaOpera.tipo = '';
        this.msg.success("La operacion se guardo correctamente.");
      }else{
        this.msg.error("El operacion no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  





  verOperacion(producto){
    this.datos.setProdActivo(producto.id_producto);
    this.router.navigate(['/operacion']);
  }
  guardarCambiosSaliente(){
    var totalProd=Number(this.tmpProd.cant_actual);
    
    if((totalProd-this.productoES)>0){
      var tipo="Producto Saliente";
      this.tmpProd.cant_actual=totalProd-this.productoES;
      this.agregarOperacion(tipo);
    this.datos.putProductos(this.tmpProd).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.inventario.indexOf( this.inventario.find( producto => producto.id_producto == this.tmpProd.id_producto ));
        this.inventario[i].nombre = this.tmpProd.nombre;
        this.inventario[i].cant_total = this.tmpProd.cant_total;
        this.inventario[i].cant_actual = this.tmpProd.cant_actual;
        //this.msg.success("El Producto se guardo correctamente.");
      }else{
        this.msg.error("El Producto no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
    }else{
      this.msg.error("No hay suficiente producto")
    }
  }

  guardarCambiosEntrante(){
    
    
    if((this.productoES)>0){
      var tipo="Producto Saliente";
      var totalProd=Number(this.tmpProd.cant_total)+Number(this.productoES);
      var actual=Number(this.tmpProd.cant_actual)+Number(this.productoES);
      this.tmpProd.cant_actual=totalProd;
      this.tmpProd.cant_actual=actual;
      this.agregarOperacion(tipo);
    this.datos.putProductos(this.tmpProd).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.inventario.indexOf( this.inventario.find( producto => producto.id_producto == this.tmpProd.id_producto ));
        this.inventario[i].nombre = this.tmpProd.nombre;
        this.inventario[i].cant_total = this.tmpProd.cant_total;
        this.inventario[i].cant_actual = this.tmpProd.cant_actual;
        //this.msg.success("El Producto se guardo correctamente.");
      }else{
        this.msg.error("El Producto no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
    }else{
      this.msg.error("No hay suficiente producto")
    }
  }
  confirmarEliminar(){
    this.datos.deleteProductos(this.tmpProd).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.inventario.indexOf( this.inventario.find( producto => producto.id_producto == this.tmpProd.id_producto ));
        this.inventario.splice(i,1);
        this.msg.success("El Producto se elimino correctamente.");
      }else{
        this.msg.error("El Producto no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }
}
