'use client';
import { useState } from 'react';

export default function ValidatePage() {
  const [yaml, setYaml] = useState('');
  const [result, setResult] = useState('');
  const [validating, setValidating] = useState(false);

  const handleValidate = async () => {
    if (!yaml.trim()) return;
    setValidating(true);
    setResult('');
    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yaml }),
      });
      const data = await res.json();
      setResult(data.result || data.error || 'Something went wrong');
    } catch {
      setResult('Error connecting to server');
    }
    setValidating(false);
  };

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-20">
      <a href="/" className="text-blue-400 hover:underline text-sm mb-8 block">← Back to KubeHelper</a>
      <h1 className="text-4xl font-bold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          K8s YAML Validator
        </span>
      </h1>
      <p className="text-gray-400 mb-8">
        Paste your Kubernetes YAML below. Get instant validation, security checks, and fix suggestions.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Your YAML:</label>
          <textarea
            value={yaml}
            onChange={(e) => setYaml(e.target.value)}
            placeholder={`apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 1\n  ...`}
            rows={16}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
          />
          <button
            onClick={handleValidate}
            disabled={validating || !yaml.trim()}
            className="mt-3 w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 font-semibold transition-all disabled:opacity-50"
          >
            {validating ? 'Validating...' : '🔍 Validate YAML'}
          </button>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Results:</label>
          <pre className="w-full h-[416px] px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-sm overflow-auto font-mono whitespace-pre-wrap">
            {result || '# Validation results will appear here...'}
          </pre>
        </div>
      </div>
    </main>
  );
}
