export default {
  "--animation-fade-in-@": `
@keyframes fade-in {
  from { opacity: 0 }
  to { opacity: 1 }
}`,
  "--animation-fade-out-@": `
@keyframes fade-out {
  from { opacity: 1 }
  to { opacity: 0 }
}`,
  "--animation-ping-pong": "ping-pong 5s var(--ease-3)",
  "--animation-ping-pong-@": `
@keyframes ping-pong {
  40%,
  50% {
    left: calc(var(--size-content-2)/2);
  }
  0%,
  90% {
    left: 0;
  }
}`,
  "--animation-appear": "appear auto linear",
  "--animation-appear-@": `
@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
};
