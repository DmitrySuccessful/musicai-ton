```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const limit = parseInt(searchParams.get('limit') || '20')
    const userId = searchParams.get('userId')
    
    let query = supabaseAdmin
      .from('tracks')
      .select(`
        *,
        author:users(id, username, firstName)
      `)
      .eq('isPublic', true)
      .order('createdAt', { ascending: false })
      .limit(limit)
    
    if (genre && genre !== 'all') {
      query = query.eq('genre', genre)
    }
    
    if (userId) {
      query = query.eq('authorId', userId)
    }
    
    const { data: tracks, error } = await query
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ tracks })
    
  } catch (error) {
    console.error('Get tracks error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```
