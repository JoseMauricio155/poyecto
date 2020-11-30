import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ngx-ckeditor';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InventarioComponent } from './inventario/inventario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SeguridadGuard } from './seguridad.guard';
import { DatosServiceService } from './datos-service.service';
import { OperacionComponent } from './operacion/operacion.component';

const rutas: Route[] = [
  {path:'', component: LoginComponent},
  {path:'inicio', component: LoginComponent, canActivate: [SeguridadGuard]},
  {path:'inventario', component: InventarioComponent, canActivate: [SeguridadGuard]},
  {path:'usuarios', component: UsuariosComponent, canActivate: [SeguridadGuard]},
  {path:'operacion', component: OperacionComponent, canActivate: [SeguridadGuard]},
  {path:'*', component: LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InventarioComponent,
    UsuariosComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    OperacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CKEditorModule
  ],
  providers: [DatosServiceService, SeguridadGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
