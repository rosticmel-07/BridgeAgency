import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);

const code = ts.transpileModule(
  readFileSync('app/api/contact/route.ts', 'utf8'),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }
).outputText;

function handler(
  env = {},
  fetch = () => {
    throw new Error('Unexpected network call');
  }
) {
  const sandbox = {
    exports: {},
    require,
    process: { env },
    fetch,
    URL,
    AbortSignal,
  };
  vm.runInNewContext(code, sandbox);
  return sandbox.exports.POST;
}
const valid = {
  name: 'Тест',
  contact: '@test',
  contactMethod: 'telegram',
  projectType: 'landing',
  message: '',
};
const request = (body, origin) =>
  new Request('https://bridge.example/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(origin ? { Origin: origin } : {}),
    },
    body: JSON.stringify(body),
  });

test('rejects invalid fields and unexpected origins', async () => {
  const post = handler();
  for (const body of [
    {},
    null,
    { ...valid, contactMethod: 'unknown' },
    { ...valid, message: 'a'.repeat(801) },
  ]) {
    assert.equal((await post(request(body))).status, 400);
  }
  assert.equal(
    (await post(request(valid, 'https://other.example'))).status,
    403
  );
});

test('missing configuration never reports a successful delivery', async () => {
  const response = await handler()(request(valid));
  assert.equal(response.status, 503);
  assert.ok((await response.json()).error);
});

test('success requires provider acknowledgement', async () => {
  let sent;
  const post = handler(
    { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: 'test-chat' },
    async (_url, options) => {
      sent = JSON.parse(options.body);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
  );
  assert.equal((await post(request(valid))).status, 200);
  assert.equal(sent.chat_id, 'test-chat');
  assert.ok(sent.text.includes('@test'));
  assert.equal(sent.parse_mode, undefined);
});

test('provider refusal or network failure never reports success', async () => {
  const env = {
    TELEGRAM_BOT_TOKEN: 'test-token',
    TELEGRAM_CHAT_ID: 'test-chat',
  };
  for (const fetch of [
    async () => new Response(JSON.stringify({ ok: false }), { status: 200 }),
    async () => {
      throw new Error('network');
    },
  ]) {
    assert.equal((await handler(env, fetch)(request(valid))).status, 502);
  }
});

test('blocks the honeypot without a network call', async () => {
  assert.equal(
    (await handler()(request({ ...valid, website: 'spam' }))).status,
    400
  );
});

test('accepts the business-site package and includes bounded campaign context', async () => {
  let sent;
  const post = handler(
    { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: 'test-chat' },
    async (_url, options) => {
      sent = JSON.parse(options.body);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
  );
  const response = await post(
    request({
      ...valid,
      projectType: 'business-site',
      source: '/services/business-site',
      campaign: {
        utm_source: 'facebook',
        utm_campaign: 'a'.repeat(300),
        unknown: 'ignore-me',
      },
    })
  );
  assert.equal(response.status, 200);
  assert.ok(sent.text.includes('facebook'));
  assert.ok(sent.text.includes('/services/business-site'));
  assert.ok(!sent.text.includes('a'.repeat(151)));
  assert.ok(!sent.text.includes('ignore-me'));
});
