import React, { createContext, useContext, useState } from "react";

const AppProvider = createContext();

export const useAppContext = () => useContext(AppProvider);

export default function AppContext({ children }) {
  const desa = "Desa Biringkanaya";
  const [loadingRoute, setLoadingRoute] = useState(false);

  const limitText = (html, maxLength) => {
    // Buat DOM parser
    const parser = new DOMParser();
    // Parse string HTML
    const doc = parser.parseFromString(html, "text/html");
    // Ambil teks murni tanpa tag
    const textContent = doc.body.textContent || "";

    // Jika teks murni lebih panjang dari batas yang ditentukan
    if (textContent.length > maxLength) {
      // Potong teks murni
      const truncatedText = textContent.substring(0, maxLength) + "...";
      let charCount = 0;

      // Fungsi untuk merangkai kembali teks dengan HTML
      const truncateHtml = (node) => {
        let newHtml = "";
        node.childNodes.forEach((child) => {
          if (charCount >= maxLength) return;

          if (child.nodeType === Node.TEXT_NODE) {
            const remainingChars = maxLength - charCount;
            if (child.textContent.length <= remainingChars) {
              newHtml += child.textContent;
              charCount += child.textContent.length;
            } else {
              newHtml += child.textContent.substring(0, remainingChars) + "...";
              charCount = maxLength;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const innerHtml = truncateHtml(child);
            if (innerHtml) {
              newHtml += `<${child.nodeName.toLowerCase()}${[
                ...child.attributes,
              ]
                .map((attr) => ` ${attr.name}="${attr.value}"`)
                .join("")}>${innerHtml}</${child.nodeName.toLowerCase()}>`;
            }
          }
        });
        return newHtml;
      };

      // Gunakan fungsi truncateHtml pada elemen body
      return truncateHtml(doc.body);
    }

    // Jika teks tidak terlalu panjang, kembalikan HTML asli
    return html;
  };

  return (
    <AppProvider.Provider
      value={{ loadingRoute, setLoadingRoute, limitText, desa }}
    >
      {children}
    </AppProvider.Provider>
  );
}
