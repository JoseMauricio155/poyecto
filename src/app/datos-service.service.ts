import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";


const URL:string = "http://localhost/poyecto/proyecto_rest/";

@Injectable({
  providedIn: 'root'
})
export class DatosServiceService {
  private cuenta = {user:"", token:"", level:""}
  constructor(private http: HttpClient, private galleta:CookieService) { }
  getCuenta(){
    this.cuenta.user = this.galleta.get('user');
    this.cuenta.token = this.galleta.get('token');
    this.cuenta.level = this.galleta.get('level');
    return this.cuenta;
  }
  setCuenta(user,token,nivel){
    this.cuenta.user = user;
    this.cuenta.token = token;
    this.cuenta.level = nivel;
    this.galleta.set('user',user);
    this.galleta.set('token',token);
    this.galleta.set('level',nivel);
  }
  login(u, p){
    let Params = new HttpParams();
    Params = Params.append('user', u);
    Params = Params.append('pass', p);

    return this.http.get(URL + "login.php",{params:Params});//Con params se formatean los datos para poder enviarlos por la url(enviamos datos)
  }
  getProductos(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "inventario.php", {headers:Headers});
  }
  //localstorage en cache de navegador
  //session mientras no se cierre

  postProductos(Producto){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();//Es para enviar los datos internamente y no por url
    formData.append('id', Producto.id_producto);
    formData.append('nombre', Producto.nombre);
    formData.append('cant_total', Producto.cant_total);
    formData.append('cant_actual', Producto.cant_actual);

    return this.http.post(URL + "inventario.php", formData, {headers:Headers});
  }

  putProductos(Producto){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('id', Producto.id_producto);
    Params = Params.append('nombre', Producto.nombre);
    Params = Params.append('cant_total', Producto.cant_total);
    Params = Params.append('cant_actual', Producto.cant_actual);

    return this.http.put(URL + "inventario.php", null, {headers: Headers, params: Params});
  }

  deleteProductos(Producto){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('id', Producto.id_producto);

    return this.http.delete(URL + "inventario.php", {headers: Headers, params: Params});
  }
  //usuarios
  getUsuarios(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "usuarios.php", {headers:Headers});
  }
  postUsuario(usuarios){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('user', usuarios.user);
    formData.append('pass', usuarios.pass);
    formData.append('tipo',usuarios.tipo);
    formData.append('nombre',usuarios.nombre);

    return this.http.post(URL + "usuarios.php", formData, {headers:Headers});
  }
  putUsuarios(usuarios){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('user', usuarios.user);
    Params = Params.append('pass', usuarios.pass);
    Params = Params.append('tipo',usuarios.tipo);
    Params = Params.append('nombre',usuarios.nombre);

    return this.http.put(URL + "usuarios.php", null, {headers: Headers, params: Params});
  }
  deleteUsuarios(usuarios){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('user', usuarios.user);

    return this.http.delete(URL + "usuarios.php", {headers: Headers, params: Params});
  }
  
}