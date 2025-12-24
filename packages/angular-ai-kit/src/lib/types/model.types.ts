/**
 * Angular AI Kit - Model Types
 */

/**
 * AI Model information
 */
export interface ModelInfo {
  /**
   * Unique model identifier
   */
  id: string;

  /**
   * Display name of the model
   */
  name: string;

  /**
   * Model provider (e.g., 'openai', 'anthropic', 'google')
   */
  provider?: string;

  /**
   * Context window size in tokens
   */
  contextWindow: number;

  /**
   * Maximum output tokens
   */
  maxTokens: number;

  /**
   * Whether the model supports streaming
   * @default false
   */
  supportsStreaming?: boolean;

  /**
   * Model version
   */
  version?: string;

  /**
   * Model description
   */
  description?: string;

  /**
   * Pricing information (cost per 1M tokens)
   */
  pricing?: {
    input: number;
    output: number;
  };
}

/**
 * Model configuration
 */
export interface ModelConfig {
  /**
   * The model to use
   */
  model: string;

  /**
   * Temperature (0-2)
   * @default 1
   */
  temperature?: number;

  /**
   * Top P (0-1)
   * @default 1
   */
  topP?: number;

  /**
   * Maximum tokens to generate
   */
  maxTokens?: number;

  /**
   * Stop sequences
   */
  stop?: string[];

  /**
   * Presence penalty (-2 to 2)
   * @default 0
   */
  presencePenalty?: number;

  /**
   * Frequency penalty (-2 to 2)
   * @default 0
   */
  frequencyPenalty?: number;

  /**
   * Whether to stream responses
   * @default false
   */
  stream?: boolean;
}

/**
 * Model capabilities
 */
export interface ModelCapabilities {
  /**
   * Supports function calling
   */
  functionCalling?: boolean;

  /**
   * Supports vision (image inputs)
   */
  vision?: boolean;

  /**
   * Supports audio
   */
  audio?: boolean;

  /**
   * Supports code generation
   */
  codeGeneration?: boolean;

  /**
   * Supports JSON mode
   */
  jsonMode?: boolean;
}

/**
 * Extended model info with capabilities
 */
export interface ExtendedModelInfo extends ModelInfo {
  capabilities?: ModelCapabilities;
}
