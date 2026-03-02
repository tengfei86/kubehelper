import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ImagePullBackOff: Troubleshooting Guide — KubeHelper',
  description: 'Can\'t pull your container image? Complete guide to diagnosing and fixing ImagePullBackOff errors in Kubernetes.',
};

export default function ImagePullBackOffFix() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      <a href="/blog" className="text-blue-400 hover:underline text-sm mb-8 block">← Back to Blog</a>
      <article className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">ImagePullBackOff: Troubleshooting Guide</h1>
        <p className="text-gray-400 text-sm mb-8">March 2, 2026 · 5 min read</p>

        <p><code className="bg-gray-800 px-2 py-1 rounded text-sm">ImagePullBackOff</code> means Kubernetes can&apos;t download your container image. The pod won&apos;t start until this is resolved.</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Quick Diagnosis</h2>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`# See the exact error
kubectl describe pod <pod-name>

# Look for "Events" section at the bottom
# It will tell you exactly what went wrong`}</pre>

        <h2 className="text-2xl font-bold mt-10 mb-4">Common Causes &amp; Fixes</h2>

        <h3 className="text-xl font-semibold mt-8 mb-3">1. Wrong Image Name or Tag</h3>
        <p>Typo in image name or tag doesn&apos;t exist.</p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`# Wrong
image: ngnix:latest  # typo!

# Right
image: nginx:1.25-alpine`}</pre>
        <p><strong>Fix:</strong> Double-check image name and tag. Avoid <code className="bg-gray-800 px-2 py-1 rounded text-sm">:latest</code> — use specific versions.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">2. Private Registry Without Credentials</h3>
        <p>Image is in a private registry but no <code className="bg-gray-800 px-2 py-1 rounded text-sm">imagePullSecrets</code> configured.</p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`# Create the secret
kubectl create secret docker-registry my-registry \\
  --docker-server=registry.example.com \\
  --docker-username=user \\
  --docker-password=pass

# Add to your pod spec
spec:
  imagePullSecrets:
    - name: my-registry`}</pre>

        <h3 className="text-xl font-semibold mt-8 mb-3">3. Registry Rate Limiting</h3>
        <p>Docker Hub has pull rate limits (100 pulls/6h for anonymous). You might be hitting them.</p>
        <p><strong>Fix:</strong> Add Docker Hub credentials or use a mirror/cache.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">4. Network Issues</h3>
        <p>Nodes can&apos;t reach the registry (firewall, DNS, proxy).</p>
        <p><strong>Fix:</strong> Check node network connectivity. Try <code className="bg-gray-800 px-2 py-1 rounded text-sm">crictl pull &lt;image&gt;</code> directly on the node.</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">5. Image Doesn&apos;t Exist</h3>
        <p>The image or tag was deleted from the registry.</p>
        <p><strong>Fix:</strong> Verify the image exists: <code className="bg-gray-800 px-2 py-1 rounded text-sm">docker manifest inspect &lt;image&gt;</code></p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Prevention Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 my-4 text-gray-300">
          <li>Always use specific image tags, never <code className="bg-gray-800 px-2 py-1 rounded text-sm">:latest</code></li>
          <li>Set up <code className="bg-gray-800 px-2 py-1 rounded text-sm">imagePullSecrets</code> for private registries</li>
          <li>Use image pull policies wisely (<code className="bg-gray-800 px-2 py-1 rounded text-sm">IfNotPresent</code> for tagged images)</li>
          <li>Validate your YAML before deploying with <a href="/" className="text-blue-400 hover:underline">KubeHelper</a></li>
        </ul>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-900/30 to-gray-900 border border-blue-500/30 text-center">
          <p className="font-semibold mb-3">Validate your K8s YAML before deploying</p>
          <a href="/validate" className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold transition-colors">
            Try YAML Validator Free →
          </a>
        </div>
      </article>
    </main>
  );
}
