// Keep the legacy Work index and printable CV consistent with verified project data.
import { readFile, writeFile } from 'node:fs/promises';
const projects = JSON.parse(
  await readFile('scripts/metro/projects.json', 'utf8'),
);
const profile = JSON.parse(await readFile('src/data/profile.json', 'utf8'));
for (const language of ['en', 'vi']) {
  const content = JSON.parse(
    await readFile(`scripts/metro/content.${language}.json`, 'utf8'),
  );
  profile.person.headline[language] = content.hero.title;
  profile.person.subline[language] = content.hero.sub;
}
for (const project of projects) {
  const id = project.slug === 'hanoicc' ? 'hncc' : project.slug;
  const legacy = profile.consulting.find((p) => p.id === id);
  if (legacy) {
    legacy.scope = [project.summary.en, ...project.channels];
    legacy.impact = project.metrics.map((metric) => {
      let value = metric.value;
      if (metric.format === 'range-thousand')
        value = value.map((v) => v / 1000).join('–') + 'K';
      else if (metric.format === 'million')
        value = (value / 1e6).toFixed(metric.decimals) + 'M';
      else if (metric.format === 'percent')
        value = (value * 100).toFixed(metric.decimals) + '%';
      else value = Math.round(value).toLocaleString('en-US');
      return `${metric.label.en}: ${value} ${metric.unit.en}`;
    });
    delete legacy.todo;
  }
  for (const lang of ['en', 'vi']) {
    const file = `src/content/work/${lang}/${id}.mdx`;
    let source = await readFile(file, 'utf8');
    source = source
      .replace(/^title:.*$/m, 'title: ' + JSON.stringify(project.title[lang]))
      .replace(
        /^description:.*$/m,
        'description: ' + JSON.stringify(project.summary[lang]),
      )
      .replace(/^updated:.*$/m, "updated: '2026-10-21'")
      .replace(/^needsReview:.*$/m, 'needsReview: false')
      .replace(/^tools:.*$/m, 'tools: ' + JSON.stringify(project.channels));
    const boundary = source.indexOf('\n---', 4);
    source =
      source.slice(0, boundary + 4) + '\n\n' + project.summary[lang] + '\n';
    await writeFile(file, source);
  }
}
await writeFile(
  'src/data/profile.json',
  JSON.stringify(profile, null, 2) + '\n',
);
