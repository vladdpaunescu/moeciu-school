'use client';

import { supabase } from "../../../lib/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";

type Post = {
  id: number;
  title: string;
  date: string;
  content: string;
  image_url: string;
};

export default function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select("id, title, date, content, image_url");
      if (error) {
        console.error("Eroare la fetch:", error);
      } else {
        setPosts(data ?? []);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold text-center mb-8">
          Noutăți și Evenimente
        </h2>

        {/* GRID RESPONSIV */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <Image
                src={post.image_url}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-sm text-gray-500">{post.date}</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {post.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
