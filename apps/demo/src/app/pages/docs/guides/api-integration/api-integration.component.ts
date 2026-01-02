import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * API Integration Guide
 *
 * How to connect Angular AI Kit to various AI APIs.
 */
@Component({
  selector: 'app-api-integration',
  templateUrl: './api-integration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DocSectionComponent, DocCodeBlockComponent, RouterLink],
})
export class ApiIntegrationComponent {
  // OpenAI streaming example
  readonly openaiCode = `// openai.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private http = inject(HttpClient);
  private apiUrl = '/api/chat'; // Your backend proxy

  private streamingContent = signal('');
  readonly streamingContent$ = this.streamingContent.asReadonly();

  async streamChat(messages: { role: string; content: string }[]): Promise<string> {
    this.streamingContent.set('');

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            fullContent += content;
            this.streamingContent.set(fullContent);
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }

    this.streamingContent.set('');
    return fullContent;
  }
}`;

  // Backend proxy example
  readonly backendProxyCode = `// server.ts (Node.js/Express example)
import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const { messages, model = 'gpt-4', stream = true } = req.body;

  try {
    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const completion = await openai.chat.completions.create({
        model,
        messages,
        stream: true,
      });

      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          res.write(\`data: \${JSON.stringify(chunk)}\\n\\n\`);
        }
      }

      res.write('data: [DONE]\\n\\n');
      res.end();
    } else {
      const completion = await openai.chat.completions.create({
        model,
        messages,
      });

      res.json(completion);
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));`;

  // Anthropic example
  readonly anthropicCode = `// anthropic.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnthropicService {
  private apiUrl = '/api/anthropic';
  private streamingContent = signal('');
  readonly streamingContent$ = this.streamingContent.asReadonly();

  async streamChat(messages: { role: string; content: string }[]): Promise<string> {
    this.streamingContent.set('');

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages,
        max_tokens: 4096,
        stream: true,
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    if (!reader) throw new Error('No response body');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'content_block_delta') {
              const content = data.delta?.text || '';
              fullContent += content;
              this.streamingContent.set(fullContent);
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }

    this.streamingContent.set('');
    return fullContent;
  }
}`;

  // Error handling
  readonly errorHandlingCode = `// chat.service.ts (with error handling)
import { Injectable, signal } from '@angular/core';

export interface ChatError {
  code: 'NETWORK' | 'RATE_LIMIT' | 'AUTH' | 'SERVER' | 'UNKNOWN';
  message: string;
  retryable: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private error = signal<ChatError | null>(null);
  readonly error$ = this.error.asReadonly();

  async sendMessage(content: string): Promise<string> {
    this.error.set(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content }] }),
      });

      if (!response.ok) {
        const error = await this.handleHttpError(response);
        this.error.set(error);
        throw new Error(error.message);
      }

      return await response.text();
    } catch (err) {
      if (err instanceof TypeError) {
        // Network error
        this.error.set({
          code: 'NETWORK',
          message: 'Unable to connect. Check your internet connection.',
          retryable: true,
        });
      }
      throw err;
    }
  }

  private async handleHttpError(response: Response): Promise<ChatError> {
    switch (response.status) {
      case 401:
        return {
          code: 'AUTH',
          message: 'Authentication failed. Please check your API key.',
          retryable: false,
        };
      case 429:
        return {
          code: 'RATE_LIMIT',
          message: 'Rate limit exceeded. Please wait a moment.',
          retryable: true,
        };
      case 500:
      case 502:
      case 503:
        return {
          code: 'SERVER',
          message: 'Server error. Please try again later.',
          retryable: true,
        };
      default:
        return {
          code: 'UNKNOWN',
          message: \`Error: \${response.statusText}\`,
          retryable: false,
        };
    }
  }
}

// Usage in component
@Component({
  template: \`
    @if (error(); as err) {
      <div class="rounded-lg bg-destructive/10 p-4 text-destructive">
        <p>{{ err.message }}</p>
        @if (err.retryable) {
          <button (click)="retry()">Retry</button>
        }
      </div>
    }
  \`,
})
export class ChatComponent {
  private chatService = inject(ChatService);
  error = this.chatService.error$;

  retry() {
    // Resend last message
  }
}`;

  // Rate limiting
  readonly rateLimitCode = `// rate-limiter.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RateLimiterService {
  private requestTimes: number[] = [];
  private readonly maxRequests = 10; // per minute
  private readonly windowMs = 60000;

  private isLimited = signal(false);
  readonly isLimited$ = this.isLimited.asReadonly();

  canMakeRequest(): boolean {
    const now = Date.now();

    // Remove old requests outside the window
    this.requestTimes = this.requestTimes.filter(
      time => now - time < this.windowMs
    );

    if (this.requestTimes.length >= this.maxRequests) {
      this.isLimited.set(true);

      // Calculate time until oldest request expires
      const oldestRequest = this.requestTimes[0];
      const resetTime = oldestRequest + this.windowMs - now;

      setTimeout(() => this.isLimited.set(false), resetTime);
      return false;
    }

    return true;
  }

  recordRequest() {
    this.requestTimes.push(Date.now());
  }

  getRemainingRequests(): number {
    const now = Date.now();
    const recentRequests = this.requestTimes.filter(
      time => now - time < this.windowMs
    );
    return Math.max(0, this.maxRequests - recentRequests.length);
  }
}

// Usage
async sendMessage(content: string) {
  if (!this.rateLimiter.canMakeRequest()) {
    this.error.set('Rate limited. Please wait.');
    return;
  }

  this.rateLimiter.recordRequest();
  // Make API call
}`;

  // Retry logic
  readonly retryCode = `// retry.util.ts
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    shouldRetry?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    shouldRetry = () => true,
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries || !shouldRetry(lastError)) {
        throw lastError;
      }

      // Exponential backoff with jitter
      const delay = Math.min(
        baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
        maxDelay
      );

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Usage
const response = await withRetry(
  () => this.chatService.sendMessage(content),
  {
    maxRetries: 3,
    shouldRetry: (error) => {
      // Only retry on network or 5xx errors
      return error.message.includes('network') ||
             error.message.includes('5');
    },
  }
);`;

  // Token counting
  readonly tokenCountCode = `// token-counter.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenCounterService {
  // Approximate token count (actual count requires tiktoken library)
  estimateTokens(text: string): number {
    // Rough estimate: ~4 characters per token for English
    return Math.ceil(text.length / 4);
  }

  // For accurate counting, use tiktoken
  // npm install @dqbd/tiktoken
  /*
  import { encoding_for_model } from '@dqbd/tiktoken';

  countTokensAccurate(text: string, model = 'gpt-4'): number {
    const enc = encoding_for_model(model);
    const tokens = enc.encode(text);
    enc.free();
    return tokens.length;
  }
  */

  // Check if within context limit
  isWithinLimit(
    messages: { content: string }[],
    maxTokens: number
  ): boolean {
    const totalTokens = messages.reduce(
      (sum, msg) => sum + this.estimateTokens(msg.content),
      0
    );
    return totalTokens < maxTokens;
  }

  // Truncate messages to fit context
  truncateMessages(
    messages: { content: string }[],
    maxTokens: number
  ): { content: string }[] {
    const result: { content: string }[] = [];
    let currentTokens = 0;

    // Keep most recent messages
    for (let i = messages.length - 1; i >= 0; i--) {
      const tokens = this.estimateTokens(messages[i].content);
      if (currentTokens + tokens > maxTokens) break;
      result.unshift(messages[i]);
      currentTokens += tokens;
    }

    return result;
  }
}`;
}
