/* Optional enhancement: native radio controls and final metric values work without JS. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const language = document.documentElement.lang;
  const format = new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US');
  const stats = document.querySelector('.stats');
  if (stats && !reduced.matches) {
    const count = () => {
      stats.dataset.counting = 'true';
      stats.querySelectorAll('[data-count-to]').forEach((number, index) => {
        const target = Number(number.dataset.countTo),
          start = performance.now() + index * 80;
        const draw = (now) => {
          const t = reduced.matches
            ? 1
            : Math.max(0, Math.min(1, (now - start) / 1150));
          const value = Math.round(target * (1 - (1 - t) ** 3));
          number.textContent =
            number.dataset.prefix +
            format.format(value) +
            number.dataset.suffix;
          if (t < 1) requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
      });
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            count();
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(stats);
    } else count();
  }

  const metro = document.querySelector('.metro');
  if (!metro) return;
  const radios = [...metro.querySelectorAll('[name=station]')];
  const collapse = metro.querySelector('#collapse');
  const desktop = matchMedia('(min-width:900px)');
  const companies = JSON.parse(
    metro.querySelector('[data-company-intros]').textContent,
  );
  const tooltip = metro.querySelector('.station-tooltip');
  const allStops = [...metro.querySelectorAll('.st,.mobile-stop')];
  let current = radios.findIndex((radio) => radio.checked),
    moving = false,
    started = false,
    journey = 0,
    observer;

  function showCompany(index) {
    tooltip.querySelector('strong').textContent = companies[index].name;
    tooltip.querySelector('p').textContent = companies[index].description;
    tooltip.hidden = !desktop.matches;
  }
  function restoreCompany() {
    if (!moving) showCompany(current);
  }
  function arrived(index, token) {
    if (token !== journey) return;
    current = index;
    moving = false;
    delete metro.dataset.traveling;
    delete metro.dataset.intro;
    metro.dataset.motionState = 'arrived';
    allStops.forEach((stop) => {
      const active = stop.htmlFor === radios[index].id;
      stop.classList.toggle('at-station', active);
      stop.classList.toggle('arriving', active);
    });
    radios.forEach((radio, i) => {
      if (i === index && desktop.matches)
        radio.setAttribute('aria-describedby', 'station-tooltip');
      else radio.removeAttribute('aria-describedby');
    });
    showCompany(index);
  }

  const scenes = [...metro.querySelectorAll('[data-panorama]')].map((scene) => {
    const mobile = scene.dataset.panorama === 'mobile';
    const paths = [
      scene.querySelector('.motion-main'),
      scene.querySelector('.motion-branch'),
    ];
    const sizes = paths.map((path) => path.getTotalLength());
    const junction = (Number(scene.dataset.junction) / 100) * sizes[0];
    const targets = JSON.parse(scene.dataset.positions).map(
      (percent, index) => ({
        rail: index === 5 ? 1 : 0,
        d: Math.max(
          0,
          (percent / 100) * sizes[index === 5 ? 1 : 0] - (mobile ? 6 : 12),
        ),
      }),
    );
    const vehicle = scene.querySelector('.metro-vehicle');
    const art = scene.querySelector(mobile ? '.mobile-art' : 'svg');
    const ns = 'http://www.w3.org/2000/svg';
    const defs = document.createElementNS(ns, 'defs');
    const clip = document.createElementNS(ns, 'clipPath');
    const reveal = document.createElementNS(ns, 'rect');
    const id = 'metro-reveal-' + scene.dataset.panorama;
    clip.id = id;
    reveal.setAttribute('width', '0');
    reveal.setAttribute('height', mobile ? '290' : '450');
    clip.append(reveal);
    defs.append(clip);
    art.prepend(defs);
    art.querySelectorAll('path.l').forEach((line) => {
      const ghost = line.cloneNode();
      ghost.setAttribute('class', 'rail-ghost');
      ghost.removeAttribute('pathLength');
      line.before(ghost);
      line.setAttribute('clip-path', `url(#${id})`);
    });
    let cursor = { rail: 0, d: 0 },
      frame,
      pending;
    const draw = () => {
      const path = paths[cursor.rail];
      const point = path.getPointAtLength(cursor.d);
      const a = path.getPointAtLength(Math.max(0, cursor.d - 0.2));
      const b = path.getPointAtLength(
        Math.min(sizes[cursor.rail], cursor.d + 0.2),
      );
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      if (mobile)
        vehicle.setAttribute(
          'transform',
          `translate(${point.x} ${point.y}) rotate(${angle})`,
        );
      else {
        vehicle.style.left = point.x + 'px';
        vehicle.style.top = point.y + 'px';
        vehicle.style.transform = `translate(-100%,-50%) rotate(${angle}deg)`;
      }
      return point;
    };
    const select = (index, intro = false, immediate = false) => {
      cancelAnimationFrame(frame);
      if (pending) pending(false);
      return new Promise((resolve) => {
        pending = resolve;
        const target = targets[index],
          legs = [];
        if (intro) cursor = { rail: 0, d: 0 };
        if (cursor.rail === target.rail)
          legs.push([cursor.rail, cursor.d, target.d]);
        else if (!cursor.rail)
          legs.push([0, cursor.d, junction], [1, 0, target.d]);
        else legs.push([1, cursor.d, 0], [0, junction, target.d]);
        const total = legs.reduce(
          (sum, leg) => sum + Math.abs(leg[2] - leg[1]),
          0,
        );
        const start = performance.now(),
          duration = reduced.matches || immediate ? 0 : intro ? 3200 : 1050;
        const tick = (now) => {
          const t = duration ? Math.min(1, (now - start) / duration) : 1;
          const ease = t * t * (3 - 2 * t);
          let distance = total * ease,
            leg = legs[0];
          for (const next of legs) {
            leg = next;
            const size = Math.abs(leg[2] - leg[1]);
            if (distance <= size) break;
            distance -= size;
          }
          cursor = {
            rail: leg[0],
            d:
              leg[1] +
              Math.sign(leg[2] - leg[1]) *
                Math.min(distance, Math.abs(leg[2] - leg[1])),
          };
          const point = draw();
          reveal.setAttribute(
            'width',
            intro
              ? String(point.x + 4 + (mobile ? 27 : 44) * t ** 8)
              : mobile
                ? '330'
                : '1152',
          );
          if (t < 1) frame = requestAnimationFrame(tick);
          else {
            cursor = { ...target };
            draw();
            pending = null;
            resolve(true);
          }
        };
        if (duration) frame = requestAnimationFrame(tick);
        else tick(start);
      });
    };
    draw();
    return { select };
  });

  async function go(index, intro = false, immediate = false) {
    const token = ++journey;
    moving = true;
    current = index;
    metro.dataset.traveling = 'true';
    metro.dataset.motionState = intro ? 'intro' : 'moving';
    if (intro) metro.dataset.intro = 'true';
    else delete metro.dataset.intro;
    tooltip.hidden = true;
    allStops.forEach((stop) => stop.classList.remove('at-station', 'arriving'));
    metro
      .querySelectorAll('.company-info[open]')
      .forEach((info) => (info.open = false));
    await Promise.all(
      scenes.map((scene) => scene.select(index, intro, immediate)),
    );
    arrived(index, token);
  }
  metro.dataset.motionReady = 'true';
  metro.dataset.motionState = 'waiting';
  metro.dataset.traveling = 'true';
  metro.dataset.intro = 'true';
  function select(index) {
    started = true;
    observer?.disconnect();
    collapse.checked = false;
    go(index);
  }
  radios.forEach((radio, index) => {
    radio.addEventListener('change', () => select(index));
    radio.addEventListener('focus', () => {
      if (!moving && desktop.matches) showCompany(index);
    });
    radio.addEventListener('blur', restoreCompany);
  });
  allStops.forEach((stop) => {
    const index = radios.findIndex((radio) => radio.id === stop.htmlFor);
    stop.addEventListener('click', (event) => {
      if (radios[index].checked) {
        event.preventDefault();
        if (!started) select(index);
        else collapse.checked = !collapse.checked;
      } else collapse.checked = false;
    });
    stop.addEventListener('mouseenter', () => {
      if (!moving && desktop.matches) showCompany(index);
    });
    stop.addEventListener('mouseleave', restoreCompany);
  });
  metro.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      tooltip.hidden = true;
      metro
        .querySelectorAll('.company-info[open]')
        .forEach((info) => (info.open = false));
    }
  });
  desktop.addEventListener('change', restoreCompany);
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      started = true;
      observer?.disconnect();
      go(current, false, true);
    }
  });
  const begin = () => {
    if (started) return;
    started = true;
    observer?.disconnect();
    go(current, true);
  };
  if (reduced.matches) {
    started = true;
    go(current, false, true);
  } else if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) begin();
      },
      { threshold: 0.2 },
    );
    observer.observe(metro.querySelector('.map'));
    observer.observe(metro.querySelector('.mobile-panorama'));
  } else begin();
})();
