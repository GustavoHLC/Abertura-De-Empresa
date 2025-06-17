import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ToastComponent } from './shared/toast/toast.component';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CepMaskPipe } from './pipes/cep.mask.pipe';
import { CpfMaskPipe } from './pipes/cpf-mask.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToastComponent,
    HeaderComponent,
    CpfMaskPipe,
    CepMaskPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
