'use client';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [yaml, setYaml] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend/API
    setSubmitted(true);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.yaml || data.error || 'Something went wrong');
    } catch {
      setResult('Error connecting to server');
    }
    setGenerating(false);
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          ⚡ Stop writing YAML by hand
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            KubeHelper
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto">
          AI-powered Kubernetes YAML generator, validator & troubleshooter.
        </p>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Describe what you need in plain English. Get production-ready, validated K8s manifests in seconds.
        </p>

        {/* Waitlist */}
        {!submitted ? (
          <form onSubmit={handleWaitlist} className="flex gap-3 max-w-md mx-auto mb-16">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold transition-colors"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="mb-16 text-green-400 font-medium">
            ✅ You&apos;re on the list! We&apos;ll be in touch.
          </div>
        )}
      </section>

      {/* Live Demo */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">Try it now — free</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Describe what you need:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., nginx deployment with 3 replicas, 512Mi memory limit, exposed on port 80 with a LoadBalancer service"
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              className="mt-3 w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? 'Generating...' : '⚡ Generate YAML'}
            </button>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Generated YAML:
            </label>
            <pre className="w-full h-[232px] px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-green-400 text-sm overflow-auto font-mono">
              {result || '# Your K8s manifest will appear here...'}
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-10 text-center">Why KubeHelper?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🧠',
              title: 'AI-Native',
              desc: 'Understands K8s deeply. Generates manifests that follow best practices and security standards.',
            },
            {
              icon: '🔍',
              title: 'Validate & Fix',
              desc: 'Paste your YAML, get instant validation with actionable fix suggestions. No more debugging indentation.',
            },
            {
              icon: '🚨',
              title: 'Troubleshoot',
              desc: 'Paste a K8s error message, get the fix. CrashLoopBackOff? ImagePullBackOff? We got you.',
            },
            {
              icon: '⚡',
              title: 'Fast',
              desc: 'From idea to deployment-ready YAML in seconds. Not minutes. Not hours.',
            },
            {
              icon: '🔒',
              title: 'Security-First',
              desc: 'Built-in security scanning. Catches runAsRoot, missing resource limits, and insecure defaults.',
            },
            {
              icon: '🎯',
              title: 'Production-Ready',
              desc: 'Generates complete manifests with health checks, resource limits, and proper labels.',
            },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-xl bg-gray-900 border border-gray-800">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-10 text-center">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Free',
              price: '$0',
              features: ['10 generations/day', 'YAML validation', 'Basic troubleshooting'],
              cta: 'Get Started',
              highlight: false,
            },
            {
              name: 'Pro',
              price: '$29',
              period: '/month',
              features: ['Unlimited generations', 'Priority AI models', 'Team templates', 'Export to Helm/Kustomize', 'Email support'],
              cta: 'Start Free Trial',
              highlight: true,
            },
            {
              name: 'Team',
              price: '$79',
              period: '/month',
              features: ['Everything in Pro', 'Up to 10 members', 'Shared template library', 'SSO & audit log', 'Slack support'],
              cta: 'Contact Us',
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-xl border ${
                plan.highlight
                  ? 'bg-gradient-to-b from-blue-900/30 to-gray-900 border-blue-500/50'
                  : 'bg-gray-900 border-gray-800'
              }`}
            >
              <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-400">{plan.period}</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  plan.highlight
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Also try our free YAML Validator</h2>
        <p className="text-gray-400 mb-6">Paste your K8s YAML, get instant security checks and fix suggestions.</p>
        <a href="/validate" className="inline-block px-8 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 font-semibold transition-colors border border-gray-700">
          🔍 Validate YAML →
        </a>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-10 border-t border-gray-800 text-center text-sm text-gray-500">
        © 2026 KubeHelper. Built for DevOps engineers who hate YAML.
      </footer>
    </main>
  );
}
