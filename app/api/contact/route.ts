import { NextResponse } from 'next/server';

const normalizePhone = (value: string) => {
  return value.replace(/[\s()-]/g, '');
};

const isValidPhone = (value: string) => {
  const normalized = normalizePhone(value);

  return /^\+?[1-9]\d{9,14}$/.test(normalized);
};

const isValidTelegram = (value: string) => {
  const trimmed = value.trim();

  return /^@[a-zA-Z0-9_]{5,32}$/.test(trimmed) || isValidPhone(trimmed);
};

const allowedContactMethods = ['telegram', 'viber', 'phone'] as const;

const allowedProjectTypes = [
  '',
  'landing',
  'business-site',
  'shop',
  'telegram-bot',
  'site-ads',
  'other',
] as const;

const campaignKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export async function POST(request: Request) {
  const origin = request.headers.get('origin');

  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json(
      {
        error: 'Недозволене джерело запиту.',
      },
      {
        status: 403,
      }
    );
  }

  let body: Record<string, unknown>;

  try {
    const raw = await request.text();

    if (raw.length > 6000) {
      return NextResponse.json(
        {
          error: 'Повідомлення надто довге.',
        },
        {
          status: 413,
        }
      );
    }

    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Invalid payload');
    }

    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {
        error: 'Перевірте дані форми.',
      },
      {
        status: 400,
      }
    );
  }

  if (body.website) {
    return NextResponse.json(
      {
        error: 'Не вдалося надіслати форму.',
      },
      {
        status: 400,
      }
    );
  }

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
              campaignKeys.includes(key as (typeof campaignKeys)[number]) &&
              typeof value === 'string'
          )
          .map(([key, value]) => `${key}: ${String(value).slice(0, 150)}`)
          .filter((line) => !line.endsWith(': '))
          .join('\n')
      : '';

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    name.trim().length < 2 ||
    name.length > 100 ||
    !/^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\-\s]+$/.test(name.trim()) ||
    typeof contact !== 'string' ||
    contact.trim().length < 3 ||
    contact.length > 120 ||
    typeof contactMethod !== 'string' ||
    !allowedContactMethods.includes(
      contactMethod as (typeof allowedContactMethods)[number]
    ) ||
    typeof projectType !== 'string' ||
    !allowedProjectTypes.includes(
      projectType as (typeof allowedProjectTypes)[number]
    ) ||
    typeof message !== 'string' ||
    message.length > 800
  ) {
    return NextResponse.json(
      {
        error: 'Перевірте ім’я, контакт і дані форми.',
      },
      {
        status: 400,
      }
    );
  }

  const safeName = name.trim();
  const safeContact = contact.trim();
  const safeContactMethod =
    contactMethod as (typeof allowedContactMethods)[number];
  const safeProjectType = projectType as (typeof allowedProjectTypes)[number];
  const safeMessage = message.trim();

  const validContact =
    safeContactMethod === 'telegram'
      ? isValidTelegram(safeContact)
      : isValidPhone(safeContact);

  if (!validContact) {
    return NextResponse.json(
      {
        error:
          safeContactMethod === 'telegram'
            ? 'Вкажіть коректний номер телефону або Telegram username у форматі @username.'
            : 'Вкажіть коректний номер телефону.',
      },
      {
        status: 400,
      }
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
      {
        status: 503,
      }
    );
  }

  const projectLabels: Record<string, string> = {
    landing: 'Лендінг',
    'business-site': 'Багатосторінковий сайт',
    shop: 'Інтернет-магазин',
    'telegram-bot': 'Telegram-бот',
    'site-ads': 'Сайт + реклама',
    other: 'Інше',
  };

  const contactLabels: Record<string, string> = {
    telegram: 'Telegram',
    viber: 'Viber',
    phone: 'Дзвінок',
  };

  const text = [
    '🔴 Нова заявка — Bridge Agency',
    '',
    ...(source ? [`Сторінка: ${source}`] : []),
    ...(campaign ? ['', 'Реклама:', campaign] : []),
    '',
    `Ім’я: ${safeName}`,
    `Спосіб зв’язку: ${contactLabels[safeContactMethod]}`,
    `Контакт: ${safeContact}`,
    `Послуга: ${projectLabels[safeProjectType] || 'Потрібна консультація'}`,
    '',
    `Повідомлення: ${safeMessage || '—'}`,
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
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10000),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error('Telegram delivery error:', {
        status: response.status,
        description: result.description,
      });

      return NextResponse.json(
        {
          error:
            'Не вдалося підтвердити надсилання. Спробуйте ще раз або напишіть у Telegram.',
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Telegram delivery error:', error);

    return NextResponse.json(
      {
        error:
          'Не вдалося підтвердити надсилання. Спробуйте ще раз або напишіть у Telegram.',
      },
      {
        status: 502,
      }
    );
  }
}
