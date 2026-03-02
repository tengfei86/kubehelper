import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CrashLoopBackOff: Causes and How to Fix It — KubeHelper',
  description: 'Your Kubernetes pod is stuck in CrashLoopBackOff? Here are the 7 most common causes and step-by-step fixes.',
};

export default function CrashLoopBackOffFix() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      <a href="/blog" className="text-blue-400 hover:underline text-sm mb-8 block">← Back to Blog</a>
      <article className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">CrashLoopBackOff: Causes and How to Fix It</h1>
        <p className="text-gray-400 text-sm mb-8">March 2, 2026 · 6 min read</p>

        <p><code className="bg-gray-800 px-2 py-1 rounded text-sm">CrashLoopBackOff</code> is one of the most common — and most frustrating — Kubernetes errors. It means your container keeps crashing and Kubernetes keeps restarting it, with increasing delays between attempts.</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Quick Diagnosis</h2>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`# Check pod status
kubectl get pods

# Check logs (most useful)
kubectl logs <pod-name> --previous

# Describe pod for events
kubectl describe pod <pod-name>`}</pre>

        <h2 className="text-2xl font-bold mt-10 mb-4">7 Most Common Causes</h2>

        <h3 className="text-xl font-semibold mt-8 mb-3">1. Application Error</h3>
        <p>Your app crashes on startup. Check logs:</p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`kubectl logs <pod-name> --previous`}</pre>
        <p><strong>Fix:</strong> Fix the application bug. Common issues: missing env vars, wrong config, unhandled exceptions.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">2. Missing Environment Variables</h3>
        <p>App expects <code className="bg-gray-800 px-2 py-1 rounded text-sm">DATABASE_URL</code> but it&apos;s not set.</p>
        <p><strong>Fix:</strong> Add the env var to your Deployment spec or create a ConfigMap/Secret.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">3. Insufficient Memory</h3>
        <p>Container gets OOMKilled because memory limit is too low.</p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`# Check if OOMKilled
kubectl describe pod <pod-name> | grep -i oom`}</pre>
        <p><strong>Fix:</strong> Increase memory limits in your resource spec.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">4. Wrong Command or Entrypoint</h3>
        <p>The container&apos;s command doesn&apos;t exist or exits immediately.</p>
        <p><strong>Fix:</strong> Check your Dockerfile <code className="bg-gray-800 px-2 py-1 rounded text-sm">CMD</code>/<code className="bg-gray-800 px-2 py-1 rounded text-sm">ENTRYPOINT</code> and Deployment <code className="bg-gray-800 px-2 py-1 rounded text-sm">command</code>/<code className="bg-gray-800 px-2 py-1 rounded text-sm">args</code>.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">5. Failed Liveness Probe</h3>
        <p>Liveness probe fails → Kubernetes restarts the container → repeat.</p>
        <p><strong>Fix:</strong> Increase <code className="bg-gray-800 px-2 py-1 rounded text-sm">initialDelaySeconds</code>, check the probe endpoint, or fix slow startup.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">6. Volume Mount Issues</h3>
        <p>Required volume doesn&apos;t exist or permissions are wrong.</p>
        <p><strong>Fix:</strong> Check PVC status, ensure volumes are available and correctly mounted.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">7. Read-Only Filesystem</h3>
        <p>App tries to write to disk but <code className="bg-gray-800 px-2 py-1 rounded text-sm">readOnlyRootFilesystem: true</code> is set.</p>
        <p><strong>Fix:</strong> Add an <code className="bg-gray-800 px-2 py-1 rounded text-sm">emptyDir</code> volume for writable paths (e.g., /tmp).</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Prevent CrashLoopBackOff</h2>
        <ul className="list-disc pl-6 space-y-2 my-4 text-gray-300">
          <li>Always set appropriate resource limits</li>
          <li>Use readiness probes with generous initial delays</li>
          <li>Test containers locally before deploying</li>
          <li>Use <a href="/" className="text-blue-400 hover:underline">KubeHelper</a> to validate your YAML before applying</li>
        </ul>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-900/30 to-gray-900 border border-blue-500/30 text-center">
          <p className="font-semibold mb-3">Paste your error → Get the fix instantly</p>
          <a href="/" className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold transition-colors">
            Try KubeHelper Free →
          </a>
        </div>
      </article>
    </main>
  );
}
