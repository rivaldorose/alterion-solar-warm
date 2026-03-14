const trustItems = [
  { icon: "☀️", text: "100% Duurzame Energie" },
  { icon: "🔧", text: "Gecertificeerde Installateurs" },
  { icon: "📋", text: "Kosteloos Adviesgesprek" },
  { icon: "⚡", text: "Snelle Levering & Montage" },
  { icon: "🛡️", text: "25 Jaar Garantie" },
];

export default function TrustBar() {
  return (
    <div className="bg-[#264653] text-[#FEFAE0] py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 md:gap-10">
        {trustItems.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
            <span>{item.icon}</span>
            <span style={{ fontFamily: "'Lato', sans-serif" }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
