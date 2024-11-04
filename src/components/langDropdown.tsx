import { useState } from "react";

export default function LangDropdown() {
  const [selectedLocale, setSelectedLocale] = useState(
    localStorage.getItem("frontegg-language") || "en"
  );

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;
    setSelectedLocale(locale);
    localStorage.setItem("frontegg-language", locale);
    window.location.reload();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <select
        value={selectedLocale}
        onChange={handleLocaleChange}
        style={{
          backgroundColor: "#4BA9F8",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        <option value="en">English</option>
        <option value="pt">Portugues</option>
      </select>
    </div>
  );
}
