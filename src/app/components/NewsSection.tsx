'use client'

import { supabase } from '../../../lib/supabaseClient'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Calendar } from 'lucide-react'

type Post = {
  id: number
  title: string
  date: string
  content: string
  image_url: string
}

export default function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('Post')
        .select('id, title, date, content, image_url')
      if (!error) setPosts(data ?? [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <section className="py-20 bg-parchment-50">
      <div className="container mx-auto px-6">

        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-500 mb-3 font-nunito">
              Din viața școlii
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-900">
              Noutăți & Evenimente
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-parchment-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-parchment-200 rounded w-1/4" />
                  <div className="h-5 bg-parchment-200 rounded w-3/4" />
                  <div className="h-3 bg-parchment-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-10 h-10 text-parchment-200 mx-auto mb-4" />
            <p className="text-[#6b6254] font-nunito">Nu există noutăți momentan.</p>
          </div>
        ) : posts.length === 1 ? (
          <NewsCard post={posts[0]} large />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <NewsCard post={posts[0]} large />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              {posts.slice(1, 3).map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

function NewsCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-parchment-200 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className={`relative w-full shrink-0 ${large ? 'h-72' : 'h-44'}`}>
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-[1.02] transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-3 font-nunito">
          <Calendar className="w-3.5 h-3.5" />
          <span>{post.date}</span>
        </div>
        <h3 className={`font-playfair font-bold text-forest-900 leading-snug mb-3 ${large ? 'text-2xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        <p className="text-sm text-[#6b6254] line-clamp-3 leading-relaxed font-nunito flex-1">
          {post.content}
        </p>
      </div>
    </article>
  )
}
