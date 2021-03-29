// eslint-disable-next-line @typescript-eslint/no-var-requires
const browserEnv = require('browser-env');
import test from 'ava';
import { adze, defaults } from '../../src';

// Simulate the browser environment for testing
browserEnv();
// Our global context is the window not global
window.ADZE_ENV = 'dev';

// =========================
// WITH EMOJI
// =========================

test('renders a alert log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).alert('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'error');
    t.is(args[0], ' %c 🚨 Alert(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.alert.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a error log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).error('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'error');
    t.is(args[0], ' %c 🔥 Error(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.error.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a warn log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).warn('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'warn');
    t.is(args[0], ' %c 🔔 Warn(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.warn.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a info log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).info('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], ' %c 📬 Info(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.info.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a fail log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).fail('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], ' %c ❌ Fail(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.fail.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a success log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).success('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], ' %c 🎉 Success(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.success.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).log('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'log');
    t.is(args[0], ' %c 📌 Log(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.log.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a debug log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).debug('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'debug');
    t.is(args[0], ' %c 🐞 Debug(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.debug.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a verbose log with emoji', (t) => {
  const t_log = adze({
    use_emoji: true,
  }).verbose('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'debug');
    t.is(args[0], ' %c 💤 Verbose(1)');
    t.is(args[1], `${defaults.base_style}${defaults.log_levels.verbose.style}`);
    t.is(args[2], 'testing');
  } else {
    t.fail();
  }
});

test('renders a custom log with emoji', (t) => {
  const style =
    'padding-right: 26px; border-color: 1px solid red; color: white; border-color: blue;';
  const { log, render } = adze({
    use_emoji: true,
    custom_levels: {
      custom: {
        level: 1,
        emoji: '🤪',
        method: 'log',
        terminal: ['bgCyanBright', 'cyan'],
        style,
      },
    },
  }).custom('custom', 'This is a custom log.');
  t.truthy(log);

  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args[0], ' %c 🤪 Custom(1)');
    t.is(args[1], `${defaults.base_style}${style}`);
    t.is(args[2], 'This is a custom log.');
  } else {
    t.fail();
  }
});
