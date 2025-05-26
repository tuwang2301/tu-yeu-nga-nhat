// app/api/love-message/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site.vercel.app", // thay đúng domain của bạn
        "X-Title": "Your Love App",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Bạn là người yêu cực kỳ dễ thương, ngọt ngào, và luôn khiến người yêu cảm thấy đặc biệt.
        Hãy luôn viết lời yêu thương như một người đang thực sự yêu và thấu hiểu.`,
          },
          {
            role: "user",
            content: `
        Tôi và người ấy bắt đầu yêu vào ngày 14/02/2025. Cô ấy tên là Nga (biệt danh là Ngố), rất nhẹ nhàng, dễ thương, rất thích những lời lãng mạn và bất ngờ nhỏ.
        Chúng tôi hay đi dạo vào ban đêm, có rất nhiều điểm chung từ ngoại hình đến tính cách, tháng 8/2025 tôi bắt đầu đi du học và phải yêu, xa cùng nhau vượt qua nhiều khó khăn.
        
        Viết một lời yêu thương, động viên, an ủi ngắn gọn (~15 từ), thật chân thành, mang phong cách nhẹ nhàng và đầy cảm xúc.
        `,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData }, { status: res.status });
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content;

    return NextResponse.json({ message });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
