import PostalMime from "postal-mime";

const MAX_MAILS = 50;
const STORAGE_KEY = "inbox";

// ─── 收信 Handler ────────────────────────────────────────────────
export async function email(message, env) {
  const parser = new PostalMime();
  const raw = await streamToArrayBuffer(message.raw);
  const parsed = await parser.parse(raw);

  const mail = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    from: message.from,
    to: message.to,
    subject: parsed.subject ?? "(no subject)",
    text: parsed.text ?? "",
    html: parsed.html ?? "",
    // 只保留附件 metadata，不存 base64 內容，避免撞 KV 25MB 限制
    attachments: (parsed.attachments ?? []).map((a) => ({
      filename: a.filename ?? "unknown",
      mimeType: a.mimeType ?? "application/octet-stream",
      size: a.content?.byteLength ?? 0,
    })),
  };

  const existing = await loadInbox(env);
  const updated = [mail, ...existing].slice(0, MAX_MAILS);
  await env.MAIL_KV.put(STORAGE_KEY, JSON.stringify(updated));
}

// ─── HTTP API Handler ─────────────────────────────────────────────
export default {
  email,

  async fetch(request, env) {
    if (request.headers.get("X-Auth-Key") !== env.AUTH_KEY) {
      return json({ error: "unauthorized" }, 401);
    }

    const url = new URL(request.url);
    const mails = await loadInbox(env);

    // GET /latest → 最新一封完整郵件
    if (url.pathname === "/latest") {
      return mails.length ? json(mails[0]) : json({ error: "no mail" }, 404);
    }

    // GET /mails?limit=10 → 最近 N 封列表（不含正文）
    if (url.pathname === "/mails" && request.method === "GET") {
      const limit = Math.min(
        parseInt(url.searchParams.get("limit") ?? "10"),
        MAX_MAILS
      );
      const list = mails
        .slice(0, limit)
        .map(({ id, receivedAt, from, to, subject, attachments }) => ({
          id,
          receivedAt,
          from,
          to,
          subject,
          attachments,
        }));
      return json(list);
    }

    // DELETE /mails → 清空收件匣
    if (url.pathname === "/mails" && request.method === "DELETE") {
      await env.MAIL_KV.delete(STORAGE_KEY);
      return json({ ok: true });
    }

    // GET /mail/:id → 單封完整內容
    const match = url.pathname.match(/^\/mail\/(.+)$/);
    if (match) {
      const found = mails.find((x) => x.id === match[1]);
      return found ? json(found) : json({ error: "not found" }, 404);
    }

    return json({ error: "unknown route" }, 404);
  },
};

// ─── 工具函數 ─────────────────────────────────────────────────────
async function loadInbox(env) {
  const raw = await env.MAIL_KV.get(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function streamToArrayBuffer(stream) {
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const total = chunks.reduce((n, c) => n + c.byteLength, 0);
  const buf = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    buf.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return buf.buffer;
}
