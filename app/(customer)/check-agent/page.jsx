// app/(customer)/check-agent/page.jsx
import { headers } from "next/headers";

export default function CheckUA() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isFromApp = userAgent.includes("halalbazarapp");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>
        {isFromApp
          ? "✅ User is from HalalBazar App!"
          : "🌐 User is from Browser!"}
      </h2>
      <p>
        <strong>Your User-Agent is:</strong>
      </p>
      <p>{userAgent}</p>
    </div>
  );
}
