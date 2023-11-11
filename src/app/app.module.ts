import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthInterceptor } from './auth-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectModalComponent } from './shared/components/create-project-modal/create-project-modal.component';

@NgModule({
  declarations: [AppComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    UserFormComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ToastComponent,
    CreateProjectModalComponent,
    NgbModule,
  ],
})
export class AppModule {}
