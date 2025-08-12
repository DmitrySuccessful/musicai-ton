```typescript
export interface User {
  id: string
  telegramId: string
  username?: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
  isPremium: boolean
  level: number
  experience: number
  generationsToday: number
  generationsTotal: number
  createdAt: string
  updatedAt: string
}

export interface Track {
  id: string
  title: string
  description?: string
  genre: string
  mood: string
  prompt: string
  audioUrl: string
  coverUrl: string
  duration: number
  plays: number
  likesCount: number
  isPublic: boolean
  createdAt: string
  updatedAt: string
  authorId: string
  author?: User
  isLiked?: boolean
  isPromoted?: boolean
}

export interface MusicGenerationRequest {
  prompt: string
  genre: string
  mood: string
  userId: string
}
```
