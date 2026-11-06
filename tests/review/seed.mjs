// Made-up rows in every table The Current has, so that each access check has something
// to find. Run as the database owner (no row level security), after the files load.
export const ID = {
  f1: '10000000-0000-4000-8000-000000000001', f2: '10000000-0000-4000-8000-000000000002',
  s5a: '20000000-0000-4000-8000-000000000001', s5p: '20000000-0000-4000-8000-000000000002',
  s7: '20000000-0000-4000-8000-000000000003', sus: '20000000-0000-4000-8000-000000000004',
  skg: '20000000-0000-4000-8000-000000000005', sold: '20000000-0000-4000-8000-000000000006',
  inv: '30000000-0000-4000-8000-000000000001', pay: '30000000-0000-4000-8000-000000000002',
  r5: '40000000-0000-4000-8000-000000000001', r7: '40000000-0000-4000-8000-000000000002',
  l1: '50000000-0000-4000-8000-000000000001', l2: '50000000-0000-4000-8000-000000000002',
  e1: '60000000-0000-4000-8000-000000000001', todo: '70000000-0000-4000-8000-000000000001',
  todoK: '70000000-0000-4000-8000-000000000002',
  ev: '80000000-0000-4000-8000-000000000001', nl: '90000000-0000-4000-8000-000000000001',
  nlpClass: '90000000-0000-4000-8000-000000000002', nlpOpen: '90000000-0000-4000-8000-000000000003',
  term: 'a0000000-0000-4000-8000-000000000001', ecaK: 'a0000000-0000-4000-8000-000000000002',
  ecaOut: 'a0000000-0000-4000-8000-000000000003', mailFail: 'b0000000-0000-4000-8000-000000000001',
  inc: 'c0000000-0000-4000-8000-000000000001', incStaff: 'c0000000-0000-4000-8000-000000000002',
  req: 'd0000000-0000-4000-8000-000000000001', web: 'e0000000-0000-4000-8000-000000000001',
}

export const SEED = (later) => `
insert into adm_families (id, name, email, contacts) values
  ('${ID.f1}', 'Nguyen family', 'parent1@example.com', '[{"name":"Mai","email":"mai@example.com"}]'),
  ('${ID.f2}', 'Tran family', 'parent2@example.com', '[]');
insert into adm_students (id, family_id, full_name, first_name, level, status, active, dob, parents_email, allergies, student_code) values
  ('${ID.s5a}', '${ID.f1}', 'Nguyễn Minh Anh', 'Minh Anh', 'Year 5', 'active', true, '2015-03-04', 'parent1@example.com', 'peanuts', 'S9001'),
  ('${ID.s7}', '${ID.f1}', 'Nguyễn Gia Huy', 'Gia Huy', 'Year 7', 'active', true, '2013-05-06', 'parent1@example.com', null, 'S9003'),
  ('${ID.sus}', '${ID.f2}', 'Trần Quốc Bảo', 'Quốc Bảo', 'Upper Secondary', 'active', true, '2010-01-02', 'parent2@example.com', null, 'S9004'),
  ('${ID.skg}', '${ID.f2}', 'Trần Thu Hà', 'Thu Hà', 'Kindergarten', 'active', true, '2021-02-03', 'parent2@example.com', null, 'S9005'),
  ('${ID.sold}', null, 'Old Learner', 'Old', 'Year 3', 'inactive', false, '2017-02-03', null, null, 'S9006');
insert into adm_leads (id, family, email, stage, archived) values
  ('${ID.l1}', 'Tran Bao Chau family', 'lead1@example.com', 'trial', false),
  ('${ID.l2}', 'Archived family', 'lead2@example.com', 'lost', true);
insert into adm_students (id, family_id, full_name, first_name, level, status, active, dob, parents_email, allergies, student_code, lead_id) values
  ('${ID.s5p}', '${ID.f2}', 'Trần Bảo Châu', 'Bảo Châu', 'Year 5', 'pending', false, '2015-06-07', null, null, 'S9002', '${ID.l1}');
insert into adm_invoices (id, number, family_id, total) values ('${ID.inv}', 'INV-9001', '${ID.f1}', 1000);
insert into adm_payments (id, invoice_id, amount) values ('${ID.pay}', '${ID.inv}', 500);
insert into adm_settings (key, value) values ('fees', '{"schoolYear":"2026-2027"}'), ('reports', '{"v":1}') on conflict (key) do nothing;
insert into adm_teachers (email, name, title, role, subjects, homeroom_groups, active) values
  ('no-login:chien', 'Chiến', 'Mr.', 'teacher', array['movement:Year 3'], array[]::text[], true),
  ('coach@gmail.com', 'Coach typed by mistake', 'Mr.', 'teacher', array['movement:Year 5'], array[]::text[], true),
  ('left@pra.edu.vn', 'Left', 'Ms.', 'teacher', array['english:Year 3'], array['Year 3'], false),
  ('mango41@learn.pra.edu.vn', 'A student address typed on Teachers', 'Mr.', 'teacher', array['math:Year 5'], array['Year 5'], true)
on conflict (email) do nothing;
insert into adm_reports (id, student_id, student_name, school_year, period_label, year_group, status) values
  ('${ID.r5}', '${ID.s5a}', 'Nguyễn Minh Anh', '2026-2027', 'Quarter 1', 'Year 5', 'draft'),
  ('${ID.r7}', '${ID.s7}', 'Nguyễn Gia Huy', '2026-2027', 'Quarter 1', 'Year 7', 'published');
insert into adm_report_sections (report_id, subject_key, name) values
  ('${ID.r5}', 'math', 'Mathematics'), ('${ID.r5}', 'english', 'English'), ('${ID.r7}', 'math', 'Mathematics');
insert into adm_course_notes (school_year, period_label, year_group, subject_key, description) values
  ('2026-2027', 'Quarter 1', 'Year 5', 'math', 'Fractions');
insert into adm_attendance (student_id, date, status, year_group) values ('${ID.s5a}', '2026-11-02', 'present', 'Year 5');
insert into adm_travel (student_id, from_date, to_date) values ('${ID.s5a}', '2026-12-01', '2026-12-05');
insert into adm_web_messages (id, want, name, email) values ('${ID.web}', 'question', 'A parent', 'lead1@example.com');
insert into adm_enrollments (id, submission_id, source, student_name, first_name, dob, parent_email, data) values
  ('${ID.e1}', '00000000-0000-4000-8000-0000000000e1', 'import', 'Lê Văn Nam', 'Văn Nam', '2016-04-04', 'nam.parent@example.com', '{}');
insert into adm_enrollment_private (enrollment_id) values ('${ID.e1}');
insert into adm_todos (id, title, created_by) values ('${ID.todo}', 'A task from Hien', 'hien.c@pra.edu.vn'), ('${ID.todoK}', 'Triage task', 'triage@pra.edu.vn');
insert into adm_photo_events (id, slug, name) values ('${ID.ev}', '2026-10-30-halloween', 'Halloween');
insert into adm_event_photos (event_id, code) values ('${ID.ev}', 'p0001');
insert into adm_event_posts (event_id, kind) values ('${ID.ev}', 'recap');
insert into adm_newsletters (id, edition, issue_date, school_year, slug, status, published) values
  ('${ID.nl}', 'post', '2026-10-30', '2026-2027', 'post-2026-10-30', 'published', '{"parts":[{"id":"x"}]}');
insert into adm_newsletter_parts (id, newsletter_id, type, data) values
  ('${ID.nlpClass}', '${ID.nl}', 'class', '{"teacher_email":"kiu@pra.edu.vn","year_groups":["Year 5"],"items":[{"t":"a"}]}'),
  ('${ID.nlpOpen}', '${ID.nl}', 'opening', '{"text":"Hello"}');
insert into adm_newsletter_views (slug, day, lang, source, count) values ('post-2026-10-30', '2026-10-30', 'en', 'email', 3);
insert into adm_drive_files (id, name) values ('drv1', 'Passport.pdf');
insert into adm_drive_doc_links (file_id, student_id) values ('drv1', '${ID.s5a}');
insert into adm_eca_terms (id, name, from_date, to_date) values ('${ID.term}', 'Q2', '2026-10-26', '2026-12-02');
insert into adm_eca_activities (id, term_id, name, weekday, teacher_email) values
  ('${ID.ecaK}', '${ID.term}', 'Study Hall', 2, 'kiu@pra.edu.vn'),
  ('${ID.ecaOut}', '${ID.term}', 'Football', 3, 'coach.eca@gmail.com');
insert into adm_eca_members (activity_id, student_id) values ('${ID.ecaK}', '${ID.s7}');
insert into adm_eca_attendance (activity_id, student_id, date) values ('${ID.ecaK}', '${ID.s7}', '2026-11-03');
insert into adm_mail_queue (id, kind, to_addr, subject, html, status, error) values
  ('${ID.mailFail}', 'enroll_family', 'x@example.com', 'Hi', '<p>Hi</p>', 'failed', 'Gmail refused it.');
insert into adm_report_send (report_id, lang) values ('${ID.r5}', 'en');
insert into adm_signatures (person, name, image) values ('kiu@pra.edu.vn', 'Kiu', 'data:image/png;base64,AAAA');
insert into adm_upper_secondary (student_id, school_year, period_label, homeroom_comment) values ('${ID.sus}', '2026-2027', 'Quarter 1', 'Good');
insert into storage.objects (bucket_id, name) values
  ('adm-photos', 'photos/minh-anh.jpg'), ('adm-receipts', 'receipts/1.jpg'), ('adm-event-photos', 'ev/1.jpg'),
  ('adm-enrollment', '00000000-0000-4000-8000-0000000000e1/1-passport.pdf'), ('adm-todo', '${ID.todo}/shot.png'),
  ('adm-newsletter', '${ID.nl}/a.jpg'), ('newsletter', 'post-2026-10-30/a.jpg'), ('adm-transcripts', '${ID.sus}/t.pdf');
${later ? `
insert into adm_incidents (id, kind, type, happened_on, student_ids, created_by) values
  ('${ID.inc}', 'student', 'injury', '2026-11-03', array['${ID.s5a}'::uuid], 'hien.c@pra.edu.vn'),
  ('${ID.incStaff}', 'staff', 'other', '2026-11-03', '{}', 'hien.c@pra.edu.vn');
select set_config('request.jwt.claims', '{"role":"authenticated","email":"bowen@pra.edu.vn","app_metadata":{"role":"super_admin"}}', false);
insert into adm_lesson_requests (id, number, class_key, teacher_email, source, created_by) values
  ('${ID.req}', 1, 'english:Year 5', 'kiu@pra.edu.vn', '{"topic":"Adverbs"}', 'kiu@pra.edu.vn');
select set_config('request.jwt.claims', '', false);
insert into adm_class_profiles (class_key, profile) values ('english:Year 5', '{}');
insert into adm_sources (id, title, kind) values ('wb-y5-eng', 'Year 5 English Workbook', 'workbook');
insert into storage.objects (bucket_id, name) values ('adm-incidents', '${ID.inc}/photo.jpg'), ('adm-lessons', '${ID.req}/page.jpg');
` : ''}
`
