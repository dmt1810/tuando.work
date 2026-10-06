import { test, expect } from '@playwright/test';
import { profileSchema } from '../src/data/schema';
import seed from '../src/data/profile.json' with { type: 'json' };
test('rejects private contact details, duplicate identities and impossible periods', () => {
  const privateContact = structuredClone(seed);
  Object.assign(privateContact.person, { phone: 'PRIVATE_PLACEHOLDER' });
  expect(profileSchema.safeParse(privateContact).success).toBe(false);
  const email = structuredClone(seed);
  email.person.email = seed.person.email.replace('hello', 'private');
  expect(profileSchema.safeParse(email).success).toBe(false);
  const dates = structuredClone(seed);
  dates.experience[0].end = '2020-01';
  expect(profileSchema.safeParse(dates).success).toBe(false);
  const duplicate = structuredClone(seed);
  duplicate.officeAgents[1].id = duplicate.officeAgents[0].id;
  expect(profileSchema.safeParse(duplicate).success).toBe(false);
});
