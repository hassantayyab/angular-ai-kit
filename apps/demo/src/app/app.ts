import { Component } from '@angular/core';
import { ChatDemoSectionComponent } from './components/chat-demo-section/chat-demo-section.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { NavigationComponent } from './components/navigation/navigation.component';

/**
 * App Component
 *
 * Root component for the Angular AI Kit demo application.
 * Assembles the landing page with all sections.
 */
@Component({
  selector: 'app-root',
  imports: [
    NavigationComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    ChatDemoSectionComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Angular AI Kit - Modern AI Chat Components for Angular';
}
