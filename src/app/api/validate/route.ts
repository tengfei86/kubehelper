import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an expert Kubernetes YAML validator. Analyze the provided YAML and return:

1. ✅ VALID or ❌ INVALID (basic YAML syntax)
2. API version check — is it current?
3. Security issues:
   - Running as root?
   - Missing resource limits?
   - Privileged containers?
   - Missing security context?
4. Best practice violations:
   - Missing health checks?
   - Missing labels?
   - Using :latest tag?
   - Missing namespace?
5. Specific fix suggestions with corrected YAML snippets

Be concise. Use emoji for quick scanning. Output as plain text, not markdown.`;

export async function POST(req: NextRequest) {
  try {
    const { yaml } = await req.json();

    if (!yaml || typeof yaml !== 'string') {
      return NextResponse.json({ error: 'YAML is required' }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ result: demoValidate(yaml) });
    }

    const baseUrl = process.env.DEEPSEEK_API_KEY
      ? 'https://api.deepseek.com/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    const model = process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o-mini';

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: yaml },
        ],
        temperature: 0.1,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || 'Error validating YAML';

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function demoValidate(yaml: string): string {
  const issues: string[] = [];
  const lower = yaml.toLowerCase();

  if (!yaml.includes('apiVersion')) issues.push('❌ Missing apiVersion');
  if (!yaml.includes('kind')) issues.push('❌ Missing kind');
  if (!yaml.includes('metadata')) issues.push('❌ Missing metadata');

  if (!lower.includes('resources')) issues.push('⚠️ Missing resource limits/requests');
  if (!lower.includes('livenessprobe') && !lower.includes('readinessprobe'))
    issues.push('⚠️ Missing health checks (liveness/readiness probes)');
  if (lower.includes(':latest')) issues.push('⚠️ Using :latest tag — pin to specific version');
  if (!lower.includes('securitycontext')) issues.push('⚠️ Missing securityContext');
  if (!lower.includes('namespace')) issues.push('💡 Consider adding namespace');

  if (issues.length === 0) {
    return '✅ YAML looks good! No major issues found.\n\n(Demo mode — connect OpenAI API for deep analysis)';
  }

  return `Found ${issues.length} issue(s):\n\n${issues.join('\n')}\n\n(Demo mode — connect OpenAI API for detailed fixes)`;
}
