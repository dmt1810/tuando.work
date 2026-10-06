type Agent = {
  id: string;
  label: string;
  title: string;
  role: string;
  big: string;
  caption: string;
  link: string;
  external?: boolean;
};
type Step = {
  from: string;
  to: string;
  partner: string;
  label: string;
  title: string;
  input: string;
  output: string;
  next: string;
  artifact: string;
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
  const agents: Agent[] = JSON.parse(
    root.querySelector<HTMLElement>('[data-office-config]')!.dataset
      .officeConfig!,
  );
  const steps: Step[] = JSON.parse(
    root.querySelector<HTMLElement>('[data-workflow-config]')!.dataset
      .workflowConfig!,
  );
  const bubble = root.querySelector<HTMLElement>('.office-bubble')!;
  const brief = root.querySelector<HTMLElement>('.brief')!;
  const detail = bubble.querySelector<HTMLElement>('.bubble-detail')!;
  const toggle = root.querySelector<HTMLButtonElement>('[data-office-toggle]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width:639px)');
  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  const vi = root.dataset.lang === 'vi';
  let current = -1,
    stage = 0,
    visible = false,
    paused = false,
    holdUntil = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let journeys: Animation[] = [];
  const allowed = () =>
    visible &&
    !document.hidden &&
    !reduced.matches &&
    !connection?.saveData &&
    !paused;
  const actor = (id: string) =>
    root.querySelector<HTMLElement>(`[data-agent="${id}"]`)!;
  const point = (index: number) =>
    (mobile.matches ? positions.mobile : positions.desktop)[index];
  function cancelJourney() {
    journeys.forEach((animation) => animation.cancel());
    journeys = [];
    root
      .querySelectorAll('.walking, .meeting, .supporting')
      .forEach((el) => el.classList.remove('walking', 'meeting', 'supporting'));
    brief.hidden = true;
  }
  function stop() {
    clearTimeout(timer);
    timer = undefined;
    journeys.forEach((animation) => animation.pause());
    root.classList.add('office-paused');
    root.dataset.officePlaying = 'false';
  }
  function positionBubble() {
    if (current < 0 || bubble.hidden) return;
    const [x, y] = point(current),
      rect = scene.getBoundingClientRect();
    const half = bubble.offsetWidth / 2 + 12;
    bubble.style.left = `${Math.max(half, Math.min(rect.width - half, (rect.width * x) / 100))}px`;
    bubble.style.top = `${Math.max(bubble.offsetHeight + 12, (rect.height * y) / 100 - (mobile.matches ? 54 : 68))}px`;
  }
  function select(index: number, expanded = false) {
    const agent = agents.find((a) => a.id === order[index])!;
    current = index;
    root.querySelectorAll<HTMLElement>('.office-agent').forEach((el) => {
      const active = el.dataset.agent === agent.id;
      el.classList.toggle('active', active);
      if (el.tagName === 'BUTTON')
        el.setAttribute('aria-expanded', String(active && expanded));
    });
    bubble.querySelector<HTMLElement>('.bubble-big')!.textContent = agent.big;
    bubble.querySelector<HTMLElement>('.bubble-caption')!.textContent =
      agent.caption;
    detail.querySelector<HTMLElement>('[data-role]')!.textContent = agent.role;
    const link = detail.querySelector<HTMLAnchorElement>('a')!;
    link.href = agent.link;
    link.target = agent.external ? '_blank' : '';
    link.rel = agent.external ? 'noopener noreferrer' : '';
    detail.hidden = !expanded;
    bubble.hidden = !expanded;
    bubble.classList.toggle('expanded', expanded);
    positionBubble();
    root.dataset.officeActive = agent.id;
  }
  function renderStep(index: number) {
    stage = index;
    const step = steps[index];
    const fields = {
      title: step.title,
      input: step.input,
      output: step.output,
      next: step.next,
      handoff: `${agents.find((a) => a.id === step.from)!.label} → ${agents.find((a) => a.id === step.to)!.label} + ${agents.find((a) => a.id === step.partner)!.label}`,
    };
    Object.entries(fields).forEach(([key, value]) => {
      root.querySelector<HTMLElement>(`[data-workflow-${key}]`)!.textContent =
        value;
    });
    root
      .querySelectorAll<HTMLButtonElement>('[data-workflow-step]')
      .forEach((el, i) => el.setAttribute('aria-pressed', String(i === index)));
    root.dataset.workflowStage = String(index);
  }
  function travel(step: Step) {
    cancelJourney();
    if (!allowed()) return;
    const from = actor(step.from),
      to = actor(step.to);
    const sprite = from.querySelector<HTMLElement>('.sprite')!;
    const recipient = to.querySelector<HTMLElement>('.sprite')!;
    const a = sprite.getBoundingClientRect(),
      b = recipient.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();
    // Move characters through the open aisles; furniture stays anchored.
    const direction = b.x >= a.x ? -1 : 1;
    const meetingX = Math.max(
      sceneRect.x + 8,
      Math.min(sceneRect.right - a.width - 8, b.x + direction * (b.width + 6)),
    );
    const dx = meetingX - a.x;
    const dy = b.y - a.y;
    const aisle = sceneRect.height * (mobile.matches ? 0.11 : 0.14);
    const scale = a.width / sprite.offsetWidth;
    const route = [
      { x: 0, y: 0, offset: 0 },
      { x: 0, y: aisle, offset: 0.12 },
      { x: dx, y: aisle, offset: 0.32 },
      { x: dx, y: dy + aisle, offset: 0.44 },
      { x: dx, y: dy + aisle, offset: 0.6 },
      { x: dx, y: aisle, offset: 0.72 },
      { x: 0, y: aisle, offset: 0.9 },
      { x: 0, y: 0, offset: 1 },
    ];
    from.classList.add('walking');
    to.classList.add('meeting');
    to.classList.add('walking');
    actor(step.partner).classList.add('supporting');
    const journey = sprite.animate(
      route.map((p) => ({
        transform: `translate(${p.x / scale}px,${p.y / scale}px)`,
        offset: p.offset,
      })),
      { duration: 5600, easing: 'linear' },
    );
    brief.textContent = step.artifact;
    brief.hidden = false;
    const packet = brief.animate(
      route.map((p) => ({
        transform: `translate(${a.x - sceneRect.x + p.x + a.width / 2}px,${a.y - sceneRect.y + p.y - 22}px) translateX(-50%)`,
        offset: p.offset,
      })),
      { duration: 5600, easing: 'linear' },
    );
    const receiverScale = b.width / recipient.offsetWidth;
    const greeting = recipient.animate(
      [
        { transform: 'translateY(0)', offset: 0 },
        { transform: 'translateY(0)', offset: 0.12 },
        { transform: `translateY(${aisle / receiverScale}px)`, offset: 0.32 },
        { transform: `translateY(${aisle / receiverScale}px)`, offset: 0.65 },
        { transform: 'translateY(0)', offset: 0.9 },
        { transform: 'translateY(0)', offset: 1 },
      ],
      { duration: 5600, easing: 'linear' },
    );
    journeys = [journey, packet, greeting];
    journey.onfinish = () => {
      from.classList.remove('walking');
      to.classList.remove('meeting');
      to.classList.remove('walking');
      brief.hidden = true;
    };
  }
  function showStage(index: number) {
    renderStep(index);
    if (!reduced.matches && !connection?.saveData) {
      select(order.indexOf(steps[index].from));
      travel(steps[index]);
    }
  }
  function schedule(delay = 6500) {
    clearTimeout(timer);
    timer = undefined;
    if (!allowed()) {
      stop();
      return;
    }
    root.classList.remove('office-paused');
    root.dataset.officePlaying = 'true';
    timer = setTimeout(() => {
      if (!allowed()) {
        stop();
        return;
      }
      const remaining = holdUntil - Date.now();
      if (remaining > 0 || bubble.contains(document.activeElement)) {
        schedule(Math.max(remaining, 1000));
        return;
      }
      showStage((stage + 1) % steps.length);
      schedule();
    }, delay);
  }
  function resume() {
    if (!allowed()) {
      stop();
      return;
    }
    root.classList.add('office-running');
    root.classList.remove('office-paused');
    if (current < 0) showStage(stage);
    journeys.forEach((animation) => {
      if (animation.playState === 'paused') animation.play();
    });
    schedule(Math.max(holdUntil - Date.now(), 6500));
  }
  root
    .querySelectorAll<HTMLButtonElement>('[data-workflow-step]')
    .forEach((el, index) => {
      el.disabled = false;
      el.addEventListener('click', () => {
        cancelJourney();
        holdUntil = Date.now() + 10000;
        showStage(index);
        schedule(10000);
      });
    });
  root.querySelectorAll<HTMLButtonElement>('.office-agent').forEach((el) => {
    if (el.tagName === 'A') return;
    el.disabled = false;
    el.addEventListener('click', () => {
      if (reduced.matches || connection?.saveData) return;
      cancelJourney();
      holdUntil = Date.now() + 10000;
      select(order.indexOf(el.dataset.agent!), true);
      schedule(10000);
    });
  });
  toggle.hidden = reduced.matches || !!connection?.saveData;
  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused
      ? vi
        ? 'Tiếp tục'
        : 'Resume motion'
      : vi
        ? 'Tạm dừng'
        : 'Pause motion';
    paused ? stop() : resume();
  });
  bubble.addEventListener('focusin', stop);
  bubble.addEventListener('focusout', () => {
    holdUntil = Date.now() + 6000;
    resume();
  });
  document.addEventListener('visibilitychange', () =>
    document.hidden ? stop() : resume(),
  );
  new IntersectionObserver(
    (items) => {
      visible = items[0].isIntersecting;
      visible ? resume() : stop();
    },
    { threshold: 0.15 },
  ).observe(scene);
  const preferenceChange = () => {
    cancelJourney();
    toggle.hidden = reduced.matches || !!connection?.saveData;
    if (reduced.matches || connection?.saveData) {
      stop();
      root.classList.remove('office-running');
      bubble.hidden = true;
    } else resume();
  };
  reduced.addEventListener('change', preferenceChange);
  connection?.addEventListener('change', preferenceChange);
  let sceneWidth = scene.offsetWidth,
    sceneHeight = scene.offsetHeight;
  new ResizeObserver(() => {
    positionBubble();
    if (
      scene.offsetWidth !== sceneWidth ||
      scene.offsetHeight !== sceneHeight
    ) {
      cancelJourney();
      sceneWidth = scene.offsetWidth;
      sceneHeight = scene.offsetHeight;
    }
  }).observe(scene);
  scene.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      detail.hidden = true;
      bubble.hidden = true;
      root
        .querySelectorAll('[aria-expanded]')
        .forEach((el) => el.setAttribute('aria-expanded', 'false'));
      holdUntil = 0;
      schedule();
    }
  });
}
