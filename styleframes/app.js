const buttons = Array.from(document.querySelectorAll("[data-target]"));
const frames = Array.from(document.querySelectorAll("[data-frame]"));

const setFrame = (target) => {
  const showAll = target === "all";

  frames.forEach((frame) => {
    frame.hidden = !showAll && frame.dataset.frame !== target;
  });

  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.target === target);
  });

  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("frame", target);
  window.history.replaceState({}, "", nextUrl);
};

buttons.forEach((button) => {
  button.addEventListener("click", () => setFrame(button.dataset.target));
});

const initialFrame = new URL(window.location.href).searchParams.get("frame") || "all";
setFrame(["brand", "product", "event", "all"].includes(initialFrame) ? initialFrame : "all");

const isCapture = new URL(window.location.href).searchParams.get("capture") === "1";

if (isCapture) {
  document.body.classList.add("capture");

  const shouldFitViewport = new URL(window.location.href).searchParams.get("fit") === "1";

  if (shouldFitViewport) {
    const captureScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    document.documentElement.style.overflow = "hidden";

    frames.forEach((frame) => {
      frame.style.transform = `scale(${captureScale})`;
      frame.style.transformOrigin = "top left";
    });
  }
} else {
  document.querySelectorAll("video[data-src]").forEach((video) => {
    video.src = video.dataset.src;
  });
}
