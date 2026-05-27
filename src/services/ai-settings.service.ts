import { AISettings } from '@/src/types/ai-engine/ai-settings'

export const saveAISettings =
  async (
    settings: AISettings
  ) => {
    // MOCK API DELAY
    //get the data form the store to do 
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    )

    console.log(
      'Saved settings:',
      settings
    )

    return {
      success: true,
    }
  }