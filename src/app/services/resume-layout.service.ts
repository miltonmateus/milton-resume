import { Injectable } from '@angular/core';

import { storageKeys } from '../../constants/storage';

export type ResumeLayout = 'default' | 'executive' | 'dark' | 'studio';

const validLayouts = new Set<ResumeLayout>(['default', 'executive', 'dark', 'studio']);

@Injectable({ providedIn: 'root' })
export class ResumeLayoutService {
  load(): ResumeLayout {
    const savedLayout = this.getStoredValue(storageKeys.resumeLayout);
    return this.isResumeLayout(savedLayout) ? savedLayout : 'default';
  }

  save(layout: ResumeLayout): void {
    this.setStoredValue(storageKeys.resumeLayout, layout);
  }

  private isResumeLayout(value: string | null): value is ResumeLayout {
    return validLayouts.has(value as ResumeLayout);
  }

  private getStoredValue(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private setStoredValue(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      return;
    }
  }
}
