```typescript
import { NextRequest, NextResponse } from 'next/server'
import { generateMusic } from '@/lib/suno-api'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { prompt, genre, mood, userId } = await request.json()
    
    // Check user limits
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('generationsToday, isPremium')
      .eq('id', userId)
      .single()
    
    if (!user?.isPremium && user?.generationsToday >= 5) {
      return NextResponse.json(
        { error: 'Daily limit exceeded' },
        { status: 429 }
      )
    }
    
    // Generate music
    const result = await generateMusic(prompt, genre, mood)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
    
    // Save track to database
    const { data: track } = await supabaseAdmin
      .from('tracks')
      .insert({
        title: result.title,
        description: prompt,
        genre,
        mood,
        prompt,
        audioUrl: result.audioUrl,
        coverUrl: '/default-cover.jpg',
        duration: result.duration,
        authorId: userId,
      })
      .select()
      .single()
    
    // Update user generations count
    await supabaseAdmin
      .from('users')
      .update({ 
        generationsToday: user.generationsToday + 1,
        generationsTotal: (user.generationsTotal || 0) + 1
      })
      .eq('id', userId)
    
    return NextResponse.json({
      success: true,
      track
    })
    
  } catch (error) {
    console.error('Generate music error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```
