```typescript
import axios from 'axios'

const SUNO_API_URL = 'https://api.suno.ai/v1'
const SUNO_API_KEY = process.env.SUNO_API_KEY

export async function generateMusic(prompt: string, genre: string, mood: string) {
  try {
    const response = await axios.post(`${SUNO_API_URL}/generate`, {
      prompt: `${prompt} in ${genre} style with ${mood} mood`,
      duration: 45, // seconds
      format: 'mp3'
    }, {
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    
    return {
      success: true,
      audioUrl: response.data.audio_url,
      title: response.data.title,
      duration: response.data.duration
    }
  } catch (error) {
    console.error('Suno API Error:', error)
    return {
      success: false,
      error: 'Failed to generate music'
    }
  }
}
```
