import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'lacarpellese';

  ngAfterViewInit() {
    // Hide loader immediately when Angular is ready
    const hideLoader = () => {
      const loader = document.querySelector('.loader') as HTMLElement;
      if (loader && loader.style.display !== 'none') {
        if (typeof jQuery !== 'undefined' && jQuery.fn.fadeOut) {
          jQuery(loader).fadeOut(800);
        } else {
          loader.style.transition = 'opacity 0.8s ease-out';
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 800);
        }
      }
    };

    // Hide immediately after view init
    setTimeout(hideLoader, 300);
    
    // Backup: also hide on window load (for jQuery compatibility)
    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 500);
    } else {
      window.addEventListener('load', hideLoader, { once: true });
    }
  }
}
