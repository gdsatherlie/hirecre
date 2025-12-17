'use client';

import { useMemo, useState } from 'react';
import { JobCard } from './JobCard';
import type { JobFilterOptions, SheetJob } from '@/lib/jobsFromSheet';

type JobsClientProps = {
  jobs: SheetJob[];
  filters: JobFilterOptions;
};

export function JobsClient({ jobs, filters }: JobsClientProps) {
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return jobs
      .filter((job) => job.isActive)
      .filter((job) => {
        if (company && job.company !== company) return false;
        if (location && job.location !== location) return false;
        if (employmentType && job.employmentType !== employmentType) return false;
        if (category && job.jobCategory !== category) return false;
        if (!term) return true;

        const haystack = `${job.title} ${job.company} ${job.location}`.toLowerCase();
        return haystack.includes(term);
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [category, company, employmentType, jobs, location, searchTerm]);

  const hasFilters = company || location || employmentType || category || searchTerm.trim().length > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search title, company, or location"
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-inner focus:border-accent"
          />
        </div>
        <FilterSelect
          label="Company"
          value={company}
          onChange={setCompany}
          options={filters.companies}
          placeholder="All companies"
        />
        <FilterSelect
          label="Location"
          value={location}
          onChange={setLocation}
          options={filters.locations}
          placeholder="All locations"
        />
        <FilterSelect
          label="Employment type"
          value={employmentType}
          onChange={setEmploymentType}
          options={filters.employmentTypes}
          placeholder="All types"
        />
        <FilterSelect
          label="Job category"
          value={category}
          onChange={setCategory}
          options={filters.categories}
          placeholder="All categories"
        />
        {hasFilters ? (
          <button
            type="button"
            className="h-fit rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-accent hover:text-primary"
            onClick={() => {
              setCompany('');
              setLocation('');
              setEmploymentType('');
              setCategory('');
              setSearchTerm('');
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-primary">{filteredJobs.length}</span>{' '}
            {filteredJobs.length === 1 ? 'role' : 'roles'}
          </p>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          No jobs match your filters just yet. Try clearing filters or check back soon.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
};

function FilterSelect({ label, value, onChange, options, placeholder }: FilterSelectProps) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-700">
      <span className="block">{label}</span>
      <select
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 shadow-inner focus:border-accent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
