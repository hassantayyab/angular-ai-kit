import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * App Component
 *
 * Root component for the Angular AI Kit demo application.
 * Uses router-outlet to render pages based on routes.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Angular AI Kit';
}
