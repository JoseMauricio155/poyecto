import { Component, OnInit } from '@angular/core';
import { DatosServiceService } from '../datos-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css']
})
export class OperacionComponent implements OnInit {
operacion:any;
level:String;
nuevaOpera:any={id_operacion:'',tipo:'',fecha:'',cantidad:'',id_producto:''};
  constructor(private datos:DatosServiceService, private router:Router, private msg:ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarInventario();
  }
  llenarInventario(){
    this.datos.getOperacion().subscribe(resp => {
       this.operacion = resp;
      console.log(resp);
      console.log("yeaaah");
    }, error => {
      console.log(error);
      if(error.status==408) this.router.navigate(['']);
    })
  }
}
