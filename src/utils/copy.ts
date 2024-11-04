export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => alert("copied"))
    .catch((err) => {
      alert("Could not copy to clipboard");
    });
}
