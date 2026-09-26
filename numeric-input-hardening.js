(() => {
  const numericPattern = /^-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d*)?$/;

  document.addEventListener("input", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.type !== "number") return;
    if (input.id !== "part" && input.id !== "whole") return;

    const value = input.value;
    if (value === "" || numericPattern.test(value)) return;

    input.value = "";
  });
})();