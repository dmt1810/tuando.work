/* Optional motion only. Native radios/CSS retain all content with scripting off. */
(() => {
  const metro = document.querySelector('.metro');
  if (!metro) return;
  const radios = [...metro.querySelectorAll('[name=station]')],
    collapse = metro.querySelector('#collapse'),
    reduce = matchMedia('(prefers-reduced-motion:reduce)');
  const scenes = [...metro.querySelectorAll('[data-panorama]')].map((scene) => {
    const paths = [
        scene.querySelector('.motion-main'),
        scene.querySelector('.motion-branch'),
      ],
      sizes = paths.map((p) => p.getTotalLength()),
      mobile = scene.dataset.panorama === 'mobile',
      vehicle = scene.querySelector('.metro-vehicle');
    const junction = (Number(scene.dataset.junction) / 100) * sizes[0],
      targets = JSON.parse(scene.dataset.positions).map((percent, i) => ({
        rail: i === 5 ? 1 : 0,
        d: Math.max(
          0,
          (percent / 100) * sizes[i === 5 ? 1 : 0] - (mobile ? 6 : 12),
        ),
      }));
    let cursor = { ...targets[radios.findIndex((r) => r.checked)] },
      frame;
    function draw() {
      const path = paths[cursor.rail],
        p = path.getPointAtLength(cursor.d),
        a = path.getPointAtLength(Math.max(0, cursor.d - 0.2)),
        b = path.getPointAtLength(Math.min(sizes[cursor.rail], cursor.d + 0.2)),
        angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      if (mobile)
        vehicle.setAttribute(
          'transform',
          `translate(${p.x} ${p.y}) rotate(${angle})`,
        );
      else {
        vehicle.style.left = p.x + 'px';
        vehicle.style.top = p.y + 'px';
        vehicle.style.transform = `translate(-100%,-50%) rotate(${angle}deg)`;
      }
    }
    function select(index) {
      cancelAnimationFrame(frame);
      const target = targets[index],
        legs = [];
      if (cursor.rail === target.rail)
        legs.push([cursor.rail, cursor.d, target.d]);
      else if (!cursor.rail)
        legs.push([0, cursor.d, junction], [1, 0, target.d]);
      else legs.push([1, cursor.d, 0], [0, junction, target.d]);
      const total = legs.reduce((n, l) => n + Math.abs(l[2] - l[1]), 0),
        start = performance.now(),
        duration = reduce.matches ? 0 : 1050;
      function tick(now) {
        const t = duration ? Math.min(1, (now - start) / duration) : 1,
          e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        let distance = total * e,
          leg = legs[0];
        for (const l of legs) {
          leg = l;
          const size = Math.abs(l[2] - l[1]);
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
        draw();
        if (t < 1) frame = requestAnimationFrame(tick);
        else {
          cursor = { ...target };
          draw();
        }
      }
      frame = requestAnimationFrame(tick);
    }
    draw();
    return { select };
  });
  metro.dataset.motionReady = 'true';
  radios.forEach((radio, i) =>
    radio.addEventListener('change', () => {
      collapse.checked = false;
      scenes.forEach((s) => s.select(i));
    }),
  );
  metro.querySelectorAll('.st,.mobile-stop').forEach((label) =>
    label.addEventListener('click', (event) => {
      if (metro.querySelector('#' + label.htmlFor).checked) {
        event.preventDefault();
        collapse.checked = !collapse.checked;
      } else collapse.checked = false;
    }),
  );
})();
