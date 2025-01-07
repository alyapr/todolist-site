// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { routes } from './app.routes';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
// })
// export class AppComponent {
//   title = 'todolist-site';
// }
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Mengimpor RouterModule
import { routes } from './app.routes'; // Mengimpor konfigurasi routes

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Menambahkan RouterModule.forRoot(routes)
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Memperbaiki typo 'styleUrl' menjadi 'styleUrls'
})
export class AppComponent {
  title = 'todolist-site';
}
