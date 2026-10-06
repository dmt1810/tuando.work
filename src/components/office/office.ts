type Agent = {
  id: string;
  title: string;
  role: string;
  big: string;
  caption: string;
  link: string;
  external?: boolean;
};
type Connection = EventTarget & { saveData?: boolean };
const order = ['mgr', 'cre', 'per', 'crm', 'dat', 'aut', 'seo', 'ops', 'fd'];
export const positions = {
  desktop: [
    [18, 30],
    [39, 30],
    [61, 30],
    [82, 30],
    [18, 64],
    [39, 64],
    [61, 64],
    [82, 64],
    [50, 88],
  ],
  mobile: [
    [20, 28],
    [50, 28],
    [80, 28],
    [20, 53],
    [50, 53],
    [80, 53],
    [20, 78],
    [50, 78],
    [80, 78],
  ],
};
export function startOffice(root: HTMLElement) {
  const scene = root.querySelector<HTMLElement>('.office-scene')!;
  const config = root.querySelector<HTMLElement>('[data-office-config]')!;
  const agents: Agent[] = JSON.parse(config.dataset.officeConfig!);
  const bubble = root.querySelector<HTMLElement>('.office-bubble')!;
  const brief = root.querySelector<HTMLElement>('.brief')!;
  const big = bubble.querySelector<HTMLElement>('.bubble-big')!;
  const caption = bubble.querySelector<HTMLElement>('.bubble-caption')!;
  const detail = bubble.querySelector<HTMLElement>('.bubble-detail')!;
  const role = detail.querySelector<HTMLElement>('[data-role]')!;
  const link = detail.querySelector<HTMLAnchorElement>('a')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)'),
    mobile = matchMedia('(max-width:639px)');
  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  let current = -1,
    visible = false,
    timer: ReturnType<typeof setTimeout> | undefined,
    holdUntil = 0;
  let idle: number | undefined;
  const allowed = () =>
    visible && !document.hidden && !reduced.matches && !connection?.saveData;
  function stop() {
    clearTimeout(timer);
    timer = undefined;
    if (idle !== undefined) {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      idle = undefined;
    }
    root.classList.add('office-paused');
    root.dataset.officePlaying = 'false';
  }
  function point(index: number) {
    return (mobile.matches ? positions.mobile : positions.desktop)[index];
  }
  function positionBubble() {
    if (current < 0) return;
    const [x, y] = point(current),
      rect = scene.getBoundingClientRect();
    const half = bubble.offsetWidth / 2 + 12;
    const px = Math.max(
      half,
      Math.min(rect.width - half, (rect.width * x) / 100),
    );
    const py = Math.max(
      bubble.offsetHeight + 12,
      (rect.height * y) / 100 - (mobile.matches ? 54 : 68),
    );
    bubble.style.left = `${px}px`;
    bubble.style.top = `${py}px`;
  }
  function select(index: number, expanded = false) {
    const agent = agents.find((a) => a.id === order[index])!;
    const previous = current;
    current = index;
    root.querySelectorAll<HTMLElement>('.office-agent').forEach((el) => {
      const active = el.dataset.agent === agent.id;
      el.classList.toggle('active', active);
      if (el.tagName === 'BUTTON')
        el.setAttribute('aria-expanded', String(active && expanded));
    });
    big.textContent = agent.big;
    caption.textContent = agent.caption;
    role.textContent = agent.role;
    link.href = agent.link;
    if (agent.external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.removeAttribute('target');
      link.removeAttribute('rel');
    }
    detail.hidden = !expanded;
    bubble.hidden = false;
    bubble.classList.toggle('expanded', expanded);
    positionBubble();
    const rect = scene.getBoundingClientRect(),
      [x, y] = point(index);
    if (previous >= 0) {
      brief.hidden = false;
      // Establish the prior position before animating the first visible handoff.
      brief.getBoundingClientRect();
    }
    brief.style.transform = `translate(${(rect.width * x) / 100 - 15}px,${(rect.height * y) / 100 + 22}px)`;
    root.dataset.officeActive = agent.id;
  }
  function schedule(delay = 3500) {
    stop();
    if (!allowed()) return;
    root.classList.remove('office-paused');
    root.dataset.officePlaying = 'true';
    timer = setTimeout(() => {
      if (!allowed()) {
        stop();
        return;
      }
      const remaining = holdUntil - Date.now();
      if (remaining > 0) {
        schedule(remaining);
        return;
      }
      select((current + 1) % order.length);
      schedule();
    }, delay);
  }
  function resume() {
    if (!allowed()) {
      stop();
      return;
    }
    root.classList.add('office-running');
    if (timer !== undefined || idle !== undefined) return;
    const begin = () => {
      idle = undefined;
      schedule(
        current < 0 ? 1200 : Math.max(0, holdUntil - Date.now()) || 3500,
      );
    };
    if ('requestIdleCallback' in window)
      idle = window.requestIdleCallback(begin, { timeout: 1500 });
    else idle = globalThis.setTimeout(begin, 0) as unknown as number;
  }
  root.querySelectorAll<HTMLElement>('.office-agent').forEach((el) => {
    if (el.tagName === 'A') return;
    (el as HTMLButtonElement).disabled = false;
    el.addEventListener('click', () => {
      if (reduced.matches || connection?.saveData) return;
      holdUntil = Date.now() + 6000;
      select(order.indexOf(el.dataset.agent!), true);
      schedule(6000);
    });
  });
  // Hold the expanded link while it has keyboard focus, even beyond the tap pause.
  bubble.addEventListener('focusin', () => {
    holdUntil = Date.now() + 6000;
    stop();
  });
  bubble.addEventListener('focusout', () => {
    holdUntil = Date.now() + 6000;
    resume();
  });
  document.addEventListener('visibilitychange', () =>
    document.hidden ? stop() : resume(),
  );
  const observer = new IntersectionObserver(
    (items) => {
      visible = items[0].isIntersecting;
      visible ? resume() : stop();
    },
    { threshold: 0.15 },
  );
  observer.observe(scene);
  const preferenceChange = () => {
    if (reduced.matches || connection?.saveData) {
      stop();
      root.classList.remove('office-running');
      bubble.hidden = true;
      brief.hidden = true;
    } else resume();
  };
  reduced.addEventListener('change', preferenceChange);
  connection?.addEventListener('change', preferenceChange);
  new ResizeObserver(positionBubble).observe(scene);
  scene.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      detail.hidden = true;
      bubble.classList.remove('expanded');
      holdUntil = 0;
      schedule();
    }
  });
}
