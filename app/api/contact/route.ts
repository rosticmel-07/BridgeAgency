import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Browsers may only submit through this site's own form.
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json(
      { error: 'Недозволене джерело запиту.' },
      { status: 403 }
    );
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 6000)
      return NextResponse.json(
        { error: 'Повідомлення надто довге.' },
        { status: 413 }
      );
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
      throw new Error('Invalid payload');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: 'Перевірте дані форми.' },
      { status: 400 }
    );
  }

  if (body.website)
    return NextResponse.json(
      { error: 'Не вдалося надіслати форму.' },
      { status: 400 }
    );
  const { name, contact, contactMethod, projectType, message } = body;
  const source =
    typeof body.source === 'string' ? body.source.slice(0, 200) : '';
  const campaign =
    body.campaign &&
    typeof body.campaign === 'object' &&
    !Array.isArray(body.campaign)
      ? Object.entries(body.campaign)
          .filter(
            ([key, value]) =>
              [
                'utm_source',
                'utm_medium',
                'utm_campaign',
                'utm_content',
                'utm_term',
              ].includes(key) && typeof value === 'string'
          )
          .map(([key, value]) => `${key}: ${String(value).slice(0, 150)}`)
          .join('\n')
      : '';
  if (
    typeof name !== 'string' ||
    !name.trim() ||
    name.length > 100 ||
    typeof contact !== 'string' ||
    contact.trim().length < 3 ||
    contact.length > 120 ||
    typeof contactMethod !== 'string' ||
    !['telegram', 'viber', 'phone'].includes(contactMethod) ||
    typeof projectType !== 'string' ||
    ![
      '',
      'landing',
      'business-site',
      'shop',
      'telegram-bot',
      'site-ads',
      'other',
    ].includes(projectType) ||
    typeof message !== 'string' ||
    message.length > 800
  ) {
    return NextResponse.json(
      { error: 'Перевірте ім’я, контакт і довжину повідомлення.' },
      { status: 400 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json(
      {
        error:
          'Форма тимчасово недоступна. Напишіть напряму в Telegram за посиланням нижче.',
      },
      { status: 503 }
    );
  }

  const text = [
    'Нова заявка — Bridge Agency',
    ...(source ? [`Сторінка: ${source}`] : []),
    ...(campaign ? [campaign] : []),
    `Ім’я: ${name.trim()}`,
    `Спосіб зв’язку: ${contactMethod}`,
    `Контакт: ${contact.trim()}`,
    `Послуга: ${projectType || 'Потрібна консультація'}`,
    `Повідомлення: ${message.trim() || '—'}`,
  ].join('\n');
  try {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    const result = await response.json();

    console.log('Telegram response:', {
      status: response.status,
      ok: response.ok,
      telegramOk: result.ok,
      description: result.description,
    });

    if (!response.ok || !result.ok) {
      throw new Error(result.description || 'Telegram delivery failed');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram delivery error:', error);

    return NextResponse.json(
      {
        error:
          'Не вдалося підтвердити надсилання. Напишіть у Telegram — ваші дані залишилися у формі.',
      },
      { status: 502 }
    );
  }
}
