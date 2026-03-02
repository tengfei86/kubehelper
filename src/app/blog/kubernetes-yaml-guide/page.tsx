import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kubernetes Deployment YAML Explained (With Examples) — KubeHelper',
  description: 'A complete guide to writing K8s Deployment manifests with resource limits, health checks, security best practices, and production-ready examples.',
};

export default function KubernetesYamlGuide() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      <a href="/blog" className="text-blue-400 hover:underline text-sm mb-8 block">← Back to Blog</a>
      <article className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">Kubernetes Deployment YAML Explained (With Examples)</h1>
        <p className="text-gray-400 text-sm mb-8">March 2, 2026 · 8 min read</p>

        <p>If you&apos;re working with Kubernetes, you&apos;re writing YAML. A lot of it. And if you&apos;re like most developers, you&apos;ve spent more time than you&apos;d like to admit debugging indentation errors and looking up API fields.</p>
        <p>This guide breaks down the Kubernetes Deployment manifest from top to bottom — with production-ready examples you can actually use.</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">The Basics: What is a Deployment?</h2>
        <p>A Deployment tells Kubernetes how to run your application: which container image to use, how many replicas, what resources to allocate, and how to update it.</p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
        version: v1
    spec:
      containers:
        - name: my-app
          image: my-app:1.2.0
          ports:
            - containerPort: 8080`}</pre>

        <p>Let&apos;s break down each section.</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">apiVersion &amp; kind</h2>
        <p><code className="bg-gray-800 px-2 py-1 rounded text-sm">apps/v1</code> is the stable API version for Deployments. Always use this — older versions like <code className="bg-gray-800 px-2 py-1 rounded text-sm">extensions/v1beta1</code> are deprecated.</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Resource Limits: Don&apos;t Skip This</h2>
        <p>One of the most common mistakes is deploying without resource limits. Without them, a single pod can consume all node resources and crash everything else.</p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi`}</pre>

        <p><strong>requests</strong> = minimum guaranteed resources. <strong>limits</strong> = maximum allowed. Set both. Always.</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Health Checks: Liveness &amp; Readiness Probes</h2>
        <p>Without health checks, Kubernetes can&apos;t tell if your app is actually working. Add both probes:</p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 30
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10`}</pre>

        <ul className="list-disc pl-6 space-y-2 my-4 text-gray-300">
          <li><strong>livenessProbe</strong> — restarts the container if it fails</li>
          <li><strong>readinessProbe</strong> — removes from service if not ready</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Security Best Practices</h2>
        <p>Always add a security context. Running as root is a security risk you don&apos;t need:</p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false`}</pre>

        <h2 className="text-2xl font-bold mt-10 mb-4">The Complete Production-Ready Example</h2>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-green-400 overflow-auto my-6">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
  labels:
    app: my-app
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
        version: v1
    spec:
      containers:
        - name: my-app
          image: my-app:1.2.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 30
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          securityContext:
            runAsNonRoot: true
            runAsUser: 1000
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false`}</pre>

        <h2 className="text-2xl font-bold mt-10 mb-4">Skip the YAML — Use KubeHelper</h2>
        <p>Tired of writing all this by hand? <a href="/" className="text-blue-400 hover:underline">KubeHelper</a> generates production-ready K8s manifests from plain English descriptions. Just describe what you need and get validated YAML in seconds.</p>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-900/30 to-gray-900 border border-blue-500/30 text-center">
          <p className="font-semibold mb-3">Generate this YAML in 5 seconds</p>
          <a href="/" className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold transition-colors">
            Try KubeHelper Free →
          </a>
        </div>
      </article>
    </main>
  );
}
