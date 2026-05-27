export interface SettingsSaveStrategy {
  save: () => Promise<void>

  hasUnsavedChanges: () => boolean

  markAsSaved: () => void
}