import { Component } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

/**
 * App Component
 *
 * Root component for the Angular AI Kit demo application.
 * Renders the main chat interface layout.
 */
@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Angular AI Kit';
}
