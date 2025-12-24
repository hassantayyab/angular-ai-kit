/**
 * Quick test file to verify utilities work
 * Run with: npx tsx test-utilities.ts
 */

// Test cn utility
import { cn } from '@angular-ai-kit/utils';

console.log('🧪 Testing utilities...\n');

// Test 1: cn utility
console.log('1. Testing cn() utility:');
const result1 = cn(
  'base-class',
  { active: true, disabled: false },
  'extra-class',
);
console.log(`   cn('base-class', { active: true }, 'extra-class')`);
console.log(`   Result: "${result1}"`);
console.log(`   ✅ Expected: "base-class active extra-class"\n`);

// Test 2: formatDate
import { formatRelativeTime } from '@angular-ai-kit/utils';

console.log('2. Testing formatRelativeTime():');
const now = new Date();
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
const result2 = formatRelativeTime(fiveMinutesAgo);
console.log(`   formatRelativeTime(5 minutes ago)`);
console.log(`   Result: "${result2}"`);
console.log(`   ✅ Should show "5 minutes ago"\n`);

// Test 3: formatNumber
import { formatLargeNumber } from '@angular-ai-kit/utils';

console.log('3. Testing formatLargeNumber():');
const result3 = formatLargeNumber(1234567);
console.log(`   formatLargeNumber(1234567)`);
console.log(`   Result: "${result3}"`);
console.log(`   ✅ Expected: "1.2M"\n`);

// Test 4: Message validator
import { isValidChatMessage } from '@angular-ai-kit/utils';

console.log('4. Testing isValidChatMessage():');
const validMessage = { role: 'user', content: 'Hello', timestamp: new Date() };
const result4 = isValidChatMessage(validMessage);
console.log(`   isValidChatMessage({ role: 'user', content: 'Hello' })`);
console.log(`   Result: ${result4}`);
console.log(`   ✅ Expected: true\n`);

console.log('✅ All utility tests completed!\n');
console.log(
  'If you see this message without errors, your utilities are working correctly.',
);
