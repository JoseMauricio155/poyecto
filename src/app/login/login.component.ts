import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosServiceService } from '../datos-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../assets/estilos.css']
})
export class LoginComponent implements OnInit {
  inicio = "Inicio de sesión";
  user = "";
  password = "";
  auth = false;
  
  entrar(){
    this.datos.login(this.user, this.password).subscribe(resp => {
      if(resp['auth']=='si'){
        this.datos.setCuenta(this.user, resp['token'], resp['level'])
        this.router.navigate(['/inventario']);
      }else{
        this.msg.error("Error de usuario y/o contraseña");
      
      }
    },error=>{
      this.msg.error("Error de conexión.");
      console.log(error);
    })
  }
  constructor(private datos:DatosServiceService, private router:Router, private msg:ToastrService) { }

  ngOnInit(): void {
  }

}
