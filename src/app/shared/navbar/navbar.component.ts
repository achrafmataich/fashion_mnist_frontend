import { Component, OnInit } from '@angular/core';
import { provideIcons, NgIcon } from "@ng-icons/core"
import { ionLogoGithub } from "@ng-icons/ionicons"
import { ThemeModeService, ThemeModeSetting } from '../../services/theme-mode.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule, NgIcon, RouterLink, RouterLinkActive],
  providers: [provideIcons({ ionLogoGithub })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  selectModeFormControl: FormControl<ThemeModeSetting | null> = new FormControl<ThemeModeSetting>("light");

  colors: { id: ThemeModeSetting, name: string }[] = [
    { id: 'dark', name: 'Dark' },
    { id: 'light', name: 'Light' },
    { id: 'system', name: 'System' }
  ];

  constructor(private readonly theme: ThemeModeService) {
  }

  ngOnInit(): void {
    this.theme.themeModeSetting$.subscribe(value => {
      this.selectModeFormControl.setValue(value);
    })
  }

  changevValue() {
    console.log("Changed");
    console.log(this.selectModeFormControl.value);
    this.theme.setThemeSetting(this.selectModeFormControl.value ?? "system");

  }

}
