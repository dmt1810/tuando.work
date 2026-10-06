import type { Lang } from '../../i18n';

// An illustrative handoff, not a live feed or a claim about deployed agents.
export function workflow(lang: Lang) {
  const vi = lang === 'vi';
  return [
    {
      from: 'mgr',
      to: 'cre',
      partner: 'per',
      label: vi ? 'Định hướng' : 'Plan',
      title: vi
        ? 'Một mục tiêu. Một brief chung.'
        : 'One goal. One shared brief.',
      input: vi
        ? 'Bài toán: thu hút lead phù hợp cho một dịch vụ.'
        : 'The challenge: attract qualified leads for a service.',
      output: vi
        ? 'Đối tượng, thông điệp và tiêu chí lead phù hợp.'
        : 'An audience, a message, and a definition of a qualified lead.',
      next: vi
        ? 'Creative và Performance cùng triển khai brief.'
        : 'Creative and Performance turn the brief into a campaign.',
      artifact: vi ? 'Brief chiến dịch' : 'Campaign brief',
    },
    {
      from: 'per',
      to: 'crm',
      partner: 'seo',
      label: vi ? 'Thu hút' : 'Attract',
      title: vi
        ? 'Lượt nhấp có nguồn. Lead có bối cảnh.'
        : 'A click with a source. A lead with context.',
      input: vi
        ? 'Nội dung, landing page và kế hoạch kênh.'
        : 'Creative, a landing page, and a channel plan.',
      output: vi
        ? 'Lead từ biểu mẫu, kèm nguồn chiến dịch và nhu cầu.'
        : 'A form submission with its campaign source and stated need.',
      next: vi
        ? 'CRM nhận thông tin để bắt đầu chăm sóc.'
        : 'CRM receives the context needed for a useful follow-up.',
      artifact: vi ? 'Lead + nguồn' : 'Lead + source',
    },
    {
      from: 'crm',
      to: 'aut',
      partner: 'ops',
      label: vi ? 'Chăm sóc' : 'Nurture',
      title: vi
        ? 'Đúng thông điệp, đúng thời điểm.'
        : 'The right follow-up, at the right moment.',
      input: vi
        ? 'Nhu cầu của lead và các tương tác đã ghi nhận.'
        : 'The lead’s stated need and recorded interactions.',
      output: vi
        ? 'Phân nhóm, email phù hợp và trạng thái đủ điều kiện.'
        : 'A segment, a relevant email sequence, and qualification status.',
      next: vi
        ? 'Automation chuyển lead đủ điều kiện tới người phụ trách.'
        : 'Automation routes qualified leads to the right owner.',
      artifact: vi ? 'Lead đủ điều kiện' : 'Qualified lead',
    },
    {
      from: 'aut',
      to: 'dat',
      partner: 'ops',
      label: vi ? 'Chuyển giao' : 'Route',
      title: vi
        ? 'Mỗi lead có một người phụ trách.'
        : 'Every lead gets an owner.',
      input: vi
        ? 'Lead đủ điều kiện và quy tắc phân công.'
        : 'A qualified lead and assignment rules.',
      output: vi
        ? 'Người phụ trách, tác vụ tiếp theo và nhật ký chuyển giao.'
        : 'An owner, a next task, and a handoff recorded in CRM.',
      next: vi
        ? 'Data kết nối nguồn chiến dịch với kết quả chăm sóc.'
        : 'Data connects the campaign source to the follow-up outcome.',
      artifact: vi ? 'Tác vụ + trạng thái' : 'Task + status',
    },
    {
      from: 'dat',
      to: 'mgr',
      partner: 'per',
      label: vi ? 'Điều chỉnh' : 'Learn',
      title: vi
        ? 'Kết quả quay lại thay đổi kế hoạch.'
        : 'Results change the next decision.',
      input: vi
        ? 'Chi phí, chất lượng lead và kết quả chuyển đổi.'
        : 'Spend, lead quality, and conversion outcomes.',
      output: vi
        ? 'Nhận diện kênh có lead phù hợp và điểm rơi trong funnel.'
        : 'A view of which channels bring qualified leads and where the funnel loses them.',
      next: vi
        ? 'Manager điều chỉnh brief; Performance điều chỉnh ngân sách. Vòng tiếp theo bắt đầu.'
        : 'The Manager revises the brief; Performance adjusts spend. The next cycle begins.',
      artifact: vi ? 'Insight → brief mới' : 'Insight → new brief',
    },
  ];
}
