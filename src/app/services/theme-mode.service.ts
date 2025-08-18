import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'dark' | 'light';
export type ThemeModeSetting = ThemeMode | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeModeService {

  private readonly STORAGE_KEY = 'theme';

  // Reactive streams
  private _themeModeSetting$ = new BehaviorSubject<ThemeModeSetting>(this.loadThemeSetting());
  private _themeMode$ = new BehaviorSubject<ThemeMode>(this.resolveThemeMode(this._themeModeSetting$.value));

  constructor() {


    this._themeModeSetting$.subscribe(setting => {
      this.saveThemeSetting(setting);
      const mode = this.resolveThemeMode(setting);
      this._themeMode$.next(mode);
      this.applyThemeMode(mode);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this._themeModeSetting$.value === 'system') {
        this._themeMode$.next(this.resolveThemeMode('system'));
        this.applyThemeMode(this._themeMode$.value);
      }
    });
  }

  // Public observables
  get themeModeSetting$(): Observable<ThemeModeSetting> {
    return this._themeModeSetting$.asObservable();
  }
  get themeMode$(): Observable<ThemeMode> {
    return this._themeMode$.asObservable();
  }

  // Public setters
  private setLight() { this._themeModeSetting$.next('light'); }
  private setDark() { this._themeModeSetting$.next('dark'); }
  private setSystem() { this._themeModeSetting$.next('system'); }

  public setThemeSetting(themeSetting: ThemeModeSetting) {
    switch (themeSetting) {
      case 'dark': this.setDark(); break;
      case 'light': this.setLight(); break;
      case 'system': this.setSystem(); break;
    }
  }

  // Helpers
  private loadThemeSetting(): ThemeModeSetting {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : 'system';
  }

  private saveThemeSetting(setting: ThemeModeSetting) {
    if (setting === 'system') {
      localStorage.removeItem(this.STORAGE_KEY);
    } else {
      localStorage.setItem(this.STORAGE_KEY, setting);
    }
  }

  private resolveThemeMode(setting: ThemeModeSetting): ThemeMode {
    if (setting === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return setting;
  }

  private applyThemeMode(mode: ThemeMode) {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }
}
