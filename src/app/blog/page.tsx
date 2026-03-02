import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KubeHelper Blog — Kubernetes Tips, Guides & Troubleshooting',
  description: 'Practical Kubernetes guides, YAML tips, and troubleshooting solutions for DevOps engineers.',
};

const posts = [
  {
    slug: 'kubernetes-yaml-guide',
    title: 'Kubernetes Deployment YAML Explained (With Examples)',
    description: 'A complete guide to writing K8s Deployment manifests — from basics to production-ready configs with resource limits, health checks, and security.',
    date: '2026-03-02',
    readTime: '8 min',
  },
  {
    slug: 'crashloopbackoff-fix',
    title: 'CrashLoopBackOff: Causes and How to Fix It',
    description: 'Your pod is stuck in CrashLoopBackOff? Here are the 7 most common causes and step-by-step fixes.',
    date: '2026-03-02',
    readTime: '6 min',
  },
  {
    slug: 'imagepullbackoff-fix',
    title: 'ImagePullBackOff: Troubleshooting Guide',
    description: 'Can\'t pull your container image? Complete guide to diagnosing and fixing ImagePullBackOff errors in Kubernetes.',
    date: '2026-03-02',
    readTime: '5 min',
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      <a href="/" className="text-blue-400 hover:underline text-sm mb-8 block">← Back to KubeHelper</a>
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-gray-400 mb-12">Practical Kubernetes guides and troubleshooting tips.</p>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <article className="p-6 rounded-xl bg-gray-900 border border-gray-800 group-hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} read</span>
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h2>
              <p className="text-gray-400 text-sm">{post.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
