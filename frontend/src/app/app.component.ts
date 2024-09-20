import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
/* In your styles.css or main CSS file */


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent ,HttpClientModule,ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 title="bhjkghjkhuj"          
}
