// lib/jobsFromSheet.ts
import 'server-only';

export type SheetJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  employmentType: string;
  jobCategory: string;
  source: string;
  sourceUrl: string;
  isActive: boolean;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;

  const pushField = () => {
    current.push(field);
    field = '';
  };

  const pushRow = () => {
    if (current.length > 0) {
      rows.push(current);
      current = [];
    }
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      pushField();
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      pushField();
      pushRow();
      if (char === '\r' && text[i + 1] === '\n') i++;
    } else {
      field += char;
    }
  }

  pushField();
  pushRow();

  // filter out empty rows
  return rows.filter((r) => r.length > 1);
}

export async function getJobsFromSheet(): Promise<SheetJob[]> {
  const url = process.env.JOBS_SHEET_URL;
  if (!url) {
    throw new Error('JOBS_SHEET_URL is not set');
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch jobs sheet: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  const rows = parseCsv(text);
  if (rows.length <= 1) return [];

  const [header, ...dataRows] = rows;

  const idx = (name: string) => header.indexOf(name);

  const idIdx = idx('id');
  const titleIdx = idx('title');
  const companyIdx = idx('company');
  const locationIdx = idx('location');
  const descriptionIdx = idx('description');
  const employmentTypeIdx = idx('employmentType');
  const jobCategoryIdx = idx('jobCategory');
  const sourceIdx = idx('source');
  const sourceUrlIdx = idx('sourceUrl');
  const isActiveIdx = idx('isActive');

  const jobs: SheetJob[] = [];

  for (const row of dataRows) {
    const id = row[idIdx]?.trim();
    const title = row[titleIdx]?.trim();
    const company = row[companyIdx]?.trim();

    if (!id || !title || !company) continue;

    const isActiveRaw = (row[isActiveIdx] || '').trim().toLowerCase();
    const isActive =
      isActiveRaw === 'true' ||
      isActiveRaw === '1' ||
      isActiveRaw === 'yes' ||
      isActiveRaw === 'y';

    jobs.push({
      id,
      title,
      company,
      location: (row[locationIdx] || '').trim(),
      description: (row[descriptionIdx] || '').trim(),
      employmentType: (row[employmentTypeIdx] || '').trim(),
      jobCategory: (row[jobCategoryIdx] || '').trim(),
      source: (row[sourceIdx] || '').trim(),
      sourceUrl: (row[sourceUrlIdx] || '').trim(),
      isActive,
    });
  }

  return jobs;
}

export async function getJobById(id: string): Promise<SheetJob | null> {
  const jobs = await getJobsFromSheet();
  return jobs.find((job) => job.id === id) ?? null;
}

export type JobFilterOptions = {
  companies: string[];
  locations: string[];
  employmentTypes: string[];
  categories: string[];
};

export async function getJobFilterOptions(): Promise<JobFilterOptions> {
  const jobs = await getJobsFromSheet();
  const active = jobs.filter((j) => j.isActive);

  const uniq = (values: (string | undefined)[]) =>
    Array.from(
      new Set(
        values
          .map((v) => (v || '').trim())
          .filter((v) => v.length > 0)
      )
    ).sort((a, b) => a.localeCompare(b));

  return {
    companies: uniq(active.map((j) => j.company)),
    locations: uniq(active.map((j) => j.location)),
    employmentTypes: uniq(active.map((j) => j.employmentType)),
    categories: uniq(active.map((j) => j.jobCategory)),
  };
}
