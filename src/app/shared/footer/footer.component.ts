import { Component } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { ionLogoGithub, ionMailOutline, ionLogoLinkedin } from '@ng-icons/ionicons';
import { ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-footer',
  imports: [NgIcon, ɵInternalFormsSharedModule],
  providers: [provideIcons({ ionLogoGithub, ionLogoLinkedin, ionMailOutline })],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
