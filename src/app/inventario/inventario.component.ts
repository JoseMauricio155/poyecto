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
inventario:any;
level:String;
nuevoProd={id_producto:'',nombre:'',cant_total:'',cant_actual:''};
tmpProd={id_producto:'',nombre:'',cant_total:'',cant_actual:''}; 
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
        let i = this.inventario.indexOf( this.inventario.find( producto => producto.id_prodructo == this.tmpProd.id_producto ));
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
